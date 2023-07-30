function loadPreviousConnection (previousConnectionElement) {
    let previousConnectionSubElements = previousConnectionElement.getElementsByTagName("p");
    let fullConnectionAddress = previousConnectionSubElements[0].innerText.slice(9, previousConnectionSubElements[0].innerText.length);
    if (fullConnectionAddress.includes("https")) {
        document.getElementById("protocol").value = "https://";
        document.getElementById("server-host").value = fullConnectionAddress.slice(8, fullConnectionAddress.length);
    } else {
        document.getElementById("protocol").value = "http://";
        document.getElementById("server-host").value = fullConnectionAddress.slice(7, fullConnectionAddress.length);
    }
    document.getElementById("username").value = previousConnectionSubElements[1].innerText.slice(10, previousConnectionSubElements[1].innerText.length);
    client.clientColor = previousConnectionSubElements[2].innerText.slice(7, previousConnectionSubElements[2].innerText.length);
    client.privateKey = client.previousConnections[document.getElementById("server-host").value].privateKey;
    client.connectToServer();
}