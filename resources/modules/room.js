exports.Room = class {

    queue = [];
    active = [];

    constructor (logger, config, io) {
        this.logger = logger;
        this.config = config;
        this.io = io;
    }

    addUserToQueue (socketId) {
        this.queue.push({
            socket: socketId,
            failedLoginAttemptCounter: 0
        });
        this.logger.generic("User joined the server queue");
        this.logger.generic("Users in server queue: " + this.queue.length);
        this.logger.generic("Users in server: " + this.active.length);
    }

    getIndexOfUserInQueue (socketId) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].socket === socketId) {
                return i;
            }
        }
        return null;
    }

    incrementUserPasswordAttempts (socketId) {
        this.queue[this.getIndexOfUserInQueue(socketId)].failedLoginAttemptCounter += 1;
        if (this.queue[this.getIndexOfUserInQueue(socketId)].failedLoginAttemptCounter == this.config.passwordAttempts) {
            this.kickUserFromQueue(socketId);
            this.logger.warning("User kicked from queue (Failed to present correct password)");
            return "kicked";
        } else {
            this.logger.generic("User attempted to access server with an invalid password");
        }
        return null;
    }

    kickUserFromQueue (socketId) {
        this.queue.splice(this.getIndexOfUserInQueue(socketId), 1);
    }

    advanceUserToActive (socketId) {
        this.kickUserFromQueue(socketId);
        this.active.push(socketId);
        this.logger.generic("User advanced to active");
        this.logger.generic("Users in server queue: " + this.queue.length);
        this.logger.generic("Users in server: " + this.active.length);
    }

    broadcastToActiveUsers (subjectToBroadcast, dataToBroadcast) {
        for (let i = 0; i < this.active.length; i++) {
            this.io.to(this.active[i]).emit(subjectToBroadcast, dataToBroadcast);
        }
    }
}