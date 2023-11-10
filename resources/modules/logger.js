"use strict";

const fs = require('fs');
const ft = require('./fileTools');

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
     * # Logger
     *
     * Allows stylised and standardised console logging. Is very useful for large scale applications where a large
     * amount of detail is needed in the console. The Logger module offers a variety of configuration options. These
     * include date/time customisation and color customisation. It also offers a variety of optional features for
     * convenience. These include storing the log in non-volatile memory and email notifications for errors.
     *
     * Initialisation can be performed with any number of the following variables (including none of them. If this is
     * the case, the default values for all variables)
     *
     * @param {string} config.name the name of the program
     * @param {string} config.message the startup message for the program
     * @param {string} config.version the program version
     * @param {string | number} config.port the operational port of the program (if using a module like express)
     * @param {string} config.dateTimeFormat the date time format (default: [dd-mm-yy hh-mm-ss])
     * @param {boolean} config.storeLogs
     * @param {string} config.storeLogsInPath the path to store the logs into
     * @param {boolean} config.storeNewLogOnRestart
     * @param {boolean} config.sendEmailOnError
     *
     * @version 1.3.0
     * @author SecretSheppy
     */
    constructor(config) {
        this.config = config;
        console.log(this.getDateTime() + "-".repeat(50));
        if (ft.isDefined(config.name)) console.log(this.getDateTime() + config.name.toUpperCase());
        if (ft.isDefined(config.message)) console.log(this.getDateTime() + config.message);
        if (ft.isDefined(config.version)) console.log(this.getDateTime() + "VERSION: " + config.version);
        if (ft.isDefined(config.port)) console.log(this.getDateTime() + "PORT: " + config.port);
        console.log(this.getDateTime() + "-".repeat(50));
        console.log(this.getDateTime());
    }

    /**
     * retrieves and formats the current data and time
     * @returns {string}
     */
    getDateTime() {
        let dateTime = "[" + new Date().toLocaleString() + "] ";
        dateTime = dateTime.replaceAll("/", "-");
        dateTime = dateTime.replaceAll(":", "-");
        return dateTime;
    }

    /**
     * displays a plain message in the console
     * @param {string} msg
     */
    generic(msg) {
        console.log(this.getDateTime() + msg);
    }

    /**
     * displays a message highlighted in green in the console
     * @param {string} msg
     */
    success(msg) {
        console.log(this.textFormatting.colours.background.green + this.getDateTime()
            + msg + this.textFormatting.modifiers.reset);
    }

    /**
     * displays a message highlighted in orange in the console
     * @param {string} msg
     */
    warning(msg) {
        console.log(this.textFormatting.colours.background.yellow + this.getDateTime()
            + "Warning: " + msg + this.textFormatting.modifiers.reset);
    }

    /**
     * displays a message highlighted in red in the console
     * @param {string} msg
     */
    error(msg) {
        console.log(this.textFormatting.colours.background.red + this.getDateTime()
            + "Error: " + msg + this.textFormatting.modifiers.reset);
    }

    /**
     * displays a message highlighted in red with orange text in the console
     * @param {string} msg
     */
    criticalError(msg) {
        console.log(this.textFormatting.colours.background.red + this.textFormatting.colours.foreground.yellow
            + this.getDateTime() + "Critical Error: " + msg + this.textFormatting.modifiers.reset);
    }
}