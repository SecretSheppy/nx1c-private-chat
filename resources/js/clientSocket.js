client.socket.on("joined-server-queue", (passwordData) => {
    if (!passwordData.password) {
        client.socket.emit("advance-through-queue", {
            username: encrypt(client.privateKey, client.username),
            password: null
        });
    } else {
        document.getElementById("recent-connections").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("password").style.display = "flex";
    }
});

client.socket.on("advance-client-ui", () => {
    document.getElementById("password").style.display = "none";
    document.getElementById("chat").style.display = "block";
});

client.socket.on("message", (messageData) => {
    let decryptedUsername = decrypt(client.privateKey, messageData["username"]);
    let decryptedMessage = decrypt(client.privateKey, messageData["message"]);
    let newMessageElement = document.createElement("div");
    newMessageElement.classList.add("message");
    let userIconElement = document.createElement("div");
    userIconElement.classList.add("user-icon");
    userIconElement.innerText = decryptedUsername.at(0);
    newMessageElement.appendChild(userIconElement);
    let messageWrapperElement = document.createElement("div");
    messageWrapperElement.classList.add("message-wrapper");
    let usernameElement = document.createElement("h4");
    usernameElement.innerText = decryptedUsername;
    messageWrapperElement.appendChild(usernameElement);
    let messageTextElement = document.createElement("p");
    messageTextElement.innerText = decryptedMessage;
    messageWrapperElement.appendChild(messageTextElement);
    newMessageElement.appendChild(messageWrapperElement);
    document.getElementById("message-list").appendChild(newMessageElement);
});

client.socket.on("user-advanced-to-active", (userData) => {
    let decryptedUsername = decrypt(client.privateKey, userData.username);
    let userJoinedWrapper = document.createElement("div");
    userJoinedWrapper.classList.add("user-joined-wrapper");
    let usernameWrapper = document.createElement("div");
    usernameWrapper.classList.add("username-wrapper");
    usernameWrapper.innerText = decryptedUsername + " joined the server";
    userJoinedWrapper.appendChild(usernameWrapper);
    document.getElementById("message-list").appendChild(userJoinedWrapper);
})

client.socket.on("user-kicked-from-queue", (reason) => {
    client.socket.disconnect();
    document.getElementById("alert").innerText = "You have been kicked from the server!";
    document.getElementById("alert").style.display = "block";
    // TODO - finish the kick procedure.
})