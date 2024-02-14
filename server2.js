"use strict";

const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');

const logger = require('./resources/modules/logger');
const ft = require('./resources/modules/fileTools');
const ct = require('./resources/modules/colorTools');
const room = require('./resources/modules/room');
const ip = require('./resources/modules/getip');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

const config = ft.loadJson("./configuration/server-config.json");
const log = new logger.Logger(config);
const serverRoom = new room.Room(log, config, io);

io.on("connection", (socket) => {

    serverRoom.newUserJoined(socket);

    socket.on("advance-through-queue", (data) => {
        if (config.password === data.password) {
            let userData = {};
            if (data.color === "") userData = { color: ct.generateRandomHexColor() };
            socket.emit("advance-client-ui", userData);
            serverRoom.advanceUserToActive(socket.id, data.username);
            serverRoom.broadcastToActiveUsersExcludeThisSocket(
                "user-advanced-to-active",
                { username: data.username },
                socket.id
            );
        } else {
            serverRoom.passwordAttemptHandler(socket);
        }
    });

    socket.on("new message", (data) => {
        serverRoom.broadcastToActiveUsers("message", data);
    });

    socket.on("load-messages-from-backlog", (data) => {
        serverRoom.loadMessageBacklog(socket, data.quantity);
    });

    socket.on("disconnect", () => {
        serverRoom.handleUserQuit(socket.id);
    })

});

server.listen(
    process.env.port || config.port,
    () => {
        log.success(`server started`);
        log.success(`listening on port ${config.port}`);
        log.success(`local address: http://${ip.address()}:${config.port}/`);
    }
);
