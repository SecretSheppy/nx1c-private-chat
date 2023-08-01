$("#message-box").on("keyup", function () {
    $("#message-characters")
        .text(`${client.localisationJSON.runtimeData.messageCharacters}${$(this).val().length}/500`)
        .css("color", function () {
            if ($(this).val().length > 500) return "red";
            return "var(--footer-bgcolor)";
        })
    })
    .on("keydown", function (event) {
        if (event.key === "Enter") client.sendMessage();
    });

$("#password-text").on("keypress", function (event) {
    if (event.key === "Enter") client.submitServerPassword();
});

$("#key-button").on("click", function () {
    $('#key-modifier').fadeToggle(200);
});

$("#minimize-button").on("click", function () {
    nw.Window.get().minimize();
});

$("#exit-button, #quit-button, #password-screen-quit-button, #kicked-screen-quit-button")
    .on("click", function () {
        nw.Window.get().close();
    });

$("#private-key-submit-button").on("click", function () {
    client.updatePrivateKey();
});

$("#connect-to-server-button").on("click", function () {
    client.connectToServer();
});

$("#submit-password-button").on("click", function () {
    client.submitServerPassword();
});

$("#show-home-button").on("click", function () {
    client.showHome();
});

$("#send-message-button").on("click", function () {
    client.sendMessage();
});