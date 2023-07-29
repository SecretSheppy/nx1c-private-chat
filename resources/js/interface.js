function loadPreviousConnection (previousConnectionElement) {
    let previousConnectionSubElements = previousConnectionElement.getElementsByTagName("p");
    document.getElementById("server-host").value = previousConnectionSubElements[0].innerText.slice(9, previousConnectionSubElements[0].innerText.length);
    document.getElementById("username").value = previousConnectionSubElements[1].innerText.slice(10, previousConnectionSubElements[1].innerText.length);
    client.connectToServer();
}