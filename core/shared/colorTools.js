"use strict";

exports.generateRandomHexColor = function () {
    let hexValues = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexValues[Math.floor(Math.random() * hexValues.length)]
    }
    return color;
}

exports.generateRandomHSLColor = function () {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 26%)`;
}