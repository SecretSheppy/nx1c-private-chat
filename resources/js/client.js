class ClientEnvironment {

    socket;
    privateKey;
    clientColor = "";
    clientConfigPath = './configuration/client-config.json';
    previousConnectionsPath = './configuration/previous-connections.json';

    constructor () {
        this.clientConfig = fileTools.loadJson(this.clientConfigPath);
        this.privateKey = encKey.random(this.clientConfig.publicKeyLength);
        this.previousConnections = fileTools.loadJson(this.previousConnectionsPath);
    }

    async slowOrNoConnection () {
        setTimeout(() => {
            document.getElementById("alert-text").innerText = this.localisationJSON.runtimeData.alerts.connPossibleFailure + this.serverProtocol + this.serverHost;
        }, 10000)
    }

    connectToServer () {
        this.serverProtocol = document.getElementById("protocol").value;
        this.serverHost = document.getElementById("server-host").value;
        this.username = document.getElementById("username").value;
        if (this.serverHost !== null && this.username !== null) {
            this.socket = io.connect(this.serverProtocol + this.serverHost);
            document.getElementById("alert-text").innerText = this.localisationJSON.runtimeData.alerts.waitingForConn;
            $("#alert").fadeIn(500);
            this.appendSocketScript();
            this.slowOrNoConnection();
        }
    }

    appendSocketScript () {
        let socketScript = document.createElement("script");
        socketScript.setAttribute("type", "text/javascript");
        socketScript.setAttribute("src", "resources/js/clientSocket.js");
        document.head.appendChild(socketScript);
    }

    submitServerPassword () {
        this.socket.emit("advance-through-queue", {
            password: document.getElementById("password-text").value,
            username: encrypter.encrypt(this.privateKey, this.username),
            color: this.clientColor
        })
    }

    sendMessage () {
        let messageComposerElement = document.getElementById("message-box")
        if (messageComposerElement.value !== "") {
            this.socket.emit("new message", {
                username: encrypter.encrypt(this.privateKey, this.username),
                message: encrypter.encrypt(this.privateKey, messageComposerElement.value),
                color: encrypter.encrypt(this.privateKey, this.clientColor)
            });
            messageComposerElement.value = "";
        };
    }

    transitionBetweenPages (currentPages, targetPages) {
        currentPages.forEach(page => {
            $(page).fadeOut(500);
        });
        setTimeout(() => {
            targetPages.forEach(page => {
                $(page).fadeIn(500);
            });
        }, 500);
    }

    showHome () {
        this.transitionBetweenPages(["#kicked"], ["#login", "#recent-connections"]);
    }

    loadRecentConnections () {
        // TODO - localise this section
        for (let address in this.previousConnections) {
            let connectionElement = document.createElement("div");
            connectionElement.classList.add("connection");
            connectionElement.setAttribute("onclick", "loadPreviousConnection(this);");
            let addressElement = document.createElement("p");
            addressElement.innerText = "Address: " + this.previousConnections[address].protocol + address;
            connectionElement.appendChild(addressElement);
            let usernameElement = document.createElement("p");
            usernameElement.innerText = "Username: " + this.previousConnections[address]["username"];
            connectionElement.appendChild(usernameElement);
            let colorElement = document.createElement("p");
            colorElement.innerText = "Color: " + this.previousConnections[address]["color"];
            connectionElement.appendChild(colorElement);
            document.getElementById("connections").appendChild(connectionElement);
        }
    }

    updatePrivateKey () {
        let privateKeyElement = document.getElementById("private-key-field");
        this.previousConnections[this.serverHost].privateKey = this.privateKey = privateKeyElement.value;
        fileTools.saveJson(this.previousConnectionsPath, this.previousConnections);
        $("#key-modifier").fadeOut(200);
        setTimeout(() => {
            privateKeyElement.value = "";
        }, 200);
    }

    createMessageElement (messageData, position = "post") {
        let decryptedUsername = encrypter.decrypt(client.privateKey, messageData.username);
        let decryptedMessage = encrypter.decrypt(client.privateKey, messageData.message);
        let decryptedColor = encrypter.decrypt(client.privateKey, messageData.color);
        let newMessageElement = document.createElement("div");
        newMessageElement.classList.add("message");
        let userIconElement = document.createElement("div");
        userIconElement.classList.add("user-icon");
        userIconElement.style.backgroundColor = decryptedColor;
        userIconElement.innerText = decryptedUsername[0].toUpperCase();
        newMessageElement.appendChild(userIconElement);
        let messageWrapperElement = document.createElement("div");
        messageWrapperElement.classList.add("message-wrapper");
        messageWrapperElement.style.backgroundColor = decryptedColor;
        let usernameElement = document.createElement("h4");
        usernameElement.innerText = decryptedUsername;
        messageWrapperElement.appendChild(usernameElement);
        let messageTextElement = document.createElement("p");
        messageTextElement.innerText = decryptedMessage;
        messageWrapperElement.appendChild(messageTextElement);
        newMessageElement.appendChild(messageWrapperElement);
        if (position !== "pre") {
            document.getElementById("message-list").appendChild(newMessageElement);
        } else {
            document.getElementById("message-list").prepend(newMessageElement);
        }
        this.scrollToBottom();
        document.getElementById("message-characters").innerText = `${this.localisationJSON.runtimeData.messageCharacters}0/500`;
    }

    createUserActiveElement (userData, position = "post", type = "joined") {
        let decryptedUsername = encrypter.decrypt(client.privateKey, userData.username);
        let userJoinedWrapper = document.createElement("div");
        userJoinedWrapper.classList.add("user-joined-wrapper");
        let usernameWrapper = document.createElement("div");
        usernameWrapper.classList.add("username-wrapper");
        if (type !== "quit") {
            usernameWrapper.innerText = `${decryptedUsername} ${this.localisationJSON.runtimeData.userAlerts.joined}`;
        } else {
            usernameWrapper.innerText = `${decryptedUsername} ${this.localisationJSON.runtimeData.userAlerts.quit}`;
        }
        userJoinedWrapper.appendChild(usernameWrapper);
        if (position !== "pre") {
            document.getElementById("message-list").appendChild(userJoinedWrapper);
        } else {
            document.getElementById("message-list").prepend(userJoinedWrapper);
        }
        this.scrollToBottom();
    }

    scrollToBottom () {
        document.getElementById("message-list").scrollTop = document.getElementById("message-list").scrollHeight;
    }

    localise () {
        this.localisationJSON = fileTools.loadJson(`./localisation/${this.clientConfig.language}.json`);
        let localisationKeys = Object.keys(this.localisationJSON.launchData);
        localisationKeys.forEach(key => {
            let currentFocusElements = document.getElementsByName(key);
            if (this.localisationJSON.launchData[key].type === "innerText") {
                currentFocusElements.forEach(element => {
                    element.innerText = this.localisationJSON.launchData[key].text;
                });
            } else {
                currentFocusElements.forEach(element => {
                    element.setAttribute(this.localisationJSON.launchData[key].type, this.localisationJSON.launchData[key].text);
                });
            }
        });
    }

}