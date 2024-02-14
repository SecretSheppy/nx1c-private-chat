const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');
const logger = require('./resources/modules/logger');
const fileTools = require('./resources/modules/fileTools');
const room = require('./resources/modules/room');
const colorTools = require('./resources/modules/colorTools');
const ip = require('./resources/modules/getip');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

const configJSON = fileTools.loadJson("./configuration/server-config.json");
const log = new logger.Logger(configJSON.name, configJSON.version, configJSON.port);
const serverRoom = new room.Room(log, configJSON, io);

function newUserJoined (socket) {
    let passwordData = { password: true };
    if (configJSON.password === null) {
        passwordData.password = false;
    }
    socket.emit("joined-server-queue", passwordData);
    serverRoom.addUserToQueue(socket.id);
}

io.on("connection", (socket) => {

    // when a new user joins the server
    newUserJoined(socket);

    // user attempts to advance through the queue by submitting the correct password
    socket.on("advance-through-queue", (userSubmittedData) => {
        if (configJSON.password === userSubmittedData.password) {
            let returnData = {};
            if (userSubmittedData.color === "") {
                returnData = { color: colorTools.generateRandomHexColor() };
            }
            socket.emit("advance-client-ui", returnData);
            serverRoom.advanceUserToActive(socket.id, userSubmittedData.username);
            serverRoom.broadcastToActiveUsersExcludeThisSocket("user-advanced-to-active", { username: userSubmittedData.username }, socket.id);
        } else if (serverRoom.incrementUserPasswordAttempts(socket.id) === "kicked") {
            socket.emit("user-kicked-from-queue", { reason: "Failed to present correct password" });
        }
    });

    // broadcast message sent message to all users in the active queue
    socket.on("new message", (messageData) => {
        log.generic("User sent a message");
        serverRoom.broadcastToActiveUsers("message", messageData);
    });

    // loading messages from backlog
    socket.on("load-messages-from-backlog", (requestData) => {
        log.generic(`User requested ${requestData.quantity} messages`);
        let messageTreeLength = serverRoom.messageTree.messageTree.length;
        for (let i = 0; i < requestData.quantity; i++) {
            socket.emit("backlogged-message", serverRoom.messageTree.messageTree[messageTreeLength - i]);
        }
    });

    // broadcast user disconnected to all users
    socket.on("disconnect", () => {
        serverRoom.handleUserQuit(socket.id);
        log.generic("User left the server");
    });

});

server.listen(process.env.port || 3000, () => log.success("server started: listening on port 3000 (local address: http://" + ip.address() + ":3000/)"));