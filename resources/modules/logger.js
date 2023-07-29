const fs = require('fs');

exports.Logger = class {

    textFormatting = {
        modifiers: {
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m"
        },
        colours: {
            foreground: {
                black: "\x1b[30m",
                red: "\x1b[31m",
                green: "\x1b[32m",
                yellow: "\x1b[33m",
                blue: "\x1b[34m",
                magenta: "\x1b[35m",
                cyan: "\x1b[36m",
                white: "\x1b[37m"
            },
            background: {
                black: "\x1b[40m",
                red: "\x1b[41m",
                green: "\x1b[42m",
                yellow: "\x1b[43m",
                blue: "\x1b[44m",
                magenta: "\x1b[45m",
                cyan: "\x1b[46m",
                white: "\x1b[47m"
            }
        }
    }

    /**
     * retrieves and formats the current data and time
     * @returns {string} - date and time in format "[dd-mm-yy hh-mm-ss] msg"
     */
    getDateTime() {
        let dateTime = "[" + new Date().toLocaleString() + "] ";
        dateTime = dateTime.replaceAll("/", "-");
        dateTime = dateTime.replaceAll(":", "-");
        return dateTime;
    }
    
    constructor(startupMessage, version, port) {
        console.log(this.getDateTime() + "-----------------------------------------------------");
        console.log(this.getDateTime() + startupMessage);
        console.log(this.getDateTime() + "Version: " + version);
        console.log(this.getDateTime() + "Port: " + port);
        console.log(this.getDateTime() + "-----------------------------------------------------");
        console.log(this.getDateTime());
        console.log(this.getDateTime() + "Log message classifications can be seen below");
        console.log(this.getDateTime());
    }

    generic(msg) {
        console.log(this.getDateTime() + msg)
    }

    success(msg) {
        console.log(this.textFormatting.colours.background.green + this.getDateTime() + msg + this.textFormatting.modifiers.reset);
    }

    warning(msg) {
        console.log(this.textFormatting.colours.background.yellow + this.getDateTime() + "Warning: " + msg + this.textFormatting.modifiers.reset);
    }

    error(msg) {
        console.log(this.textFormatting.colours.background.red + this.getDateTime() + "Error: " + msg + this.textFormatting.modifiers.reset);
    }

    criticalError(msg) {
        console.log(this.textFormatting.colours.background.red + this.textFormatting.colours.foreground.yellow + this.getDateTime() + "Critical Error: " + msg + this.textFormatting.modifiers.reset);
    }
}