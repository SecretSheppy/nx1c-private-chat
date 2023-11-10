"use strict";

exports.MessageTree = class {

    constructor (rawMessageTree) {
        try {
            let splitRawMessageTree = rawMessageTree.split("\n");
            splitRawMessageTree = splitRawMessageTree.slice(0, -1);
            this.messageTree = splitRawMessageTree.map(JSON.parse);
        } catch (e) {
            this.messageTree = []
        }
    }

    pushMessage (data) {
        this.messageTree.push(data);
    }

}