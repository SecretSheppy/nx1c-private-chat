"use strict";

const fileTools = require('./fileTools');
const mTree = require('./mTree');

exports.Room = class {

    queue = [];
    active = [];
    messageTreePath = "./logs/message.tree";

    constructor (logger, config, io) {
        this.logger = logger;
        this.config = config;
        this.io = io;
        this.messageTree = fileTools.loadMessageTree(this.messageTreePath);
    }

    logServerUsers () {
        this.logger.generic("Users in server queue: " + this.queue.length);
        this.logger.generic("Users in server: " + this.active.length);
    }

    addUserToQueue (socketId) {
        this.queue.push({
            socket: socketId,
            failedLoginAttemptCounter: 0
        });
        this.logger.generic("User joined the server queue");
        this.logServerUsers();
    }

    getIndexOfUserBySocket (socketId, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].socket === socketId) {
                return i;
            }
        }
        return null;
    }

    incrementUserPasswordAttempts (socketId) {
        this.queue[this.getIndexOfUserBySocket(socketId, this.queue)].failedLoginAttemptCounter += 1;
        if (this.queue[this.getIndexOfUserBySocket(socketId, this.queue)].failedLoginAttemptCounter === this.config.passwordAttempts) {
            this.kickUserFromQueue(socketId);
            this.logger.warning("User kicked from queue (Failed to present correct password)");
            return "kicked";
        } else {
            this.logger.generic("User attempted to access server with an invalid password");
        }
        return null;
    }

    kickUserFromQueue (socketId) {
        this.queue.splice(this.getIndexOfUserBySocket(socketId, this.queue), 1);
    }

    kickUserFromActive (socketId) {
        let index = this.getIndexOfUserBySocket(socketId, this.active);
        this.broadcastToActiveUsers("user-left-server", { username: this.active[index].username });
        this.active.splice(index, 1);
    }

    advanceUserToActive (socketId, username) {
        this.kickUserFromQueue(socketId);
        this.active.push({
            socket: socketId,
            username: username
        });
        this.logger.generic("User advanced to active");
        this.logServerUsers();
    }

    broadcastToActiveUsers (subjectToBroadcast, dataToBroadcast) {
        this.addToMessageTree({ subjectToBroadcast, dataToBroadcast });
        // TODO - rewrite with map for optimisation with large userbase
        for (let i = 0; i < this.active.length; i++) {
            this.io.to(this.active[i].socket).emit(subjectToBroadcast, dataToBroadcast);
        }
    }

    broadcastToActiveUsersExcludeThisSocket (subjectToBroadcast, dataToBroadcast, socketToExclude) {
        this.addToMessageTree({ subjectToBroadcast, dataToBroadcast });
        // TODO - rewrite with map for optimisation with large userbase
        for (let i = 0; i < this.active.length; i++) {
            if (this.active[i].socket !== socketToExclude) {
                this.io.to(this.active[i].socket).emit(subjectToBroadcast, dataToBroadcast);
            }
        }
    }

    addToMessageTree (data) {
        this.messageTree.pushMessage(data);
        fileTools.appendToRawMessageTree(this.messageTreePath, data);
    }

    handleUserQuit (socketId) {
        let userInQueue = this.getIndexOfUserBySocket(socketId, this.queue);
        if (userInQueue !== null) {
            this.kickUserFromQueue(socketId);
        } else {
            this.kickUserFromActive(socketId);
        }
        this.logServerUsers();
    }

    newUserJoined (socket) {
        let passwordData = { password: true };
        if (this.config.password === null) {
            passwordData.password = false;
        }
        socket.emit("joined-server-queue", passwordData);
        this.addUserToQueue(socket.id);
    }

    get messageTreeLength () {
        return this.messageTree.messageTree.length;
    }

    loadMessageBacklog (socket, quantity) {
        for (let i = 0; i < quantity; i++) {
            socket.emit(
                "backlogged-message",
                this.messageTree.messageTree[this.messageTreeLength - i]
            );
        }
    }

    passwordAttemptHandler (socket) {
        if (this.incrementUserPasswordAttempts(socket.id) === "kicked") {
            socket.emit(
                "user-kicked-from-queue",
                { reason: "Failed to enter correct password" }
            );
        }
    }
}