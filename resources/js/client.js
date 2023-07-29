class ClientEnvironment {

    socket;
    privateKey;

    constructor (configPath) {
        this.privateKey = generateRandomPrivateKey(16);
    }

    connectToServer () {
        let serverHostElement = document.getElementById("server-host");
        let usernameElement = document.getElementById("username");
        if (serverHostElement.value !== null && usernameElement.value !== null) {
            this.socket = io.connect(document.getElementById("protocol").value + serverHostElement.value);
            this.appendSocketScript();
            this.username = usernameElement.value;
            // TODO - build a better loading connection indicator
            // document.getElementById("alert").style.display = "block";
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
            username: encrypt(this.privateKey, this.username)
        })
    }

    sendMessage () {
        let messageComposerElement = document.getElementById("message-box")
        this.socket.emit("new message", {
            "username": encrypt(this.privateKey, this.username),
            "message": encrypt(this.privateKey, messageComposerElement.value)
        });
        messageComposerElement.value = "";
    }

}