# NX1C Private Chat

# Installation

## Prerequisites

* node.js (v16.18.0+)
  * [Get the latest version here](https://nodejs.org/en/download)
* nw.js (v0.72.0+)
  * [Get the latest version here](https://nwjs.io/downloads/)
* jquery (v3.6.0+)
  * [Get the latest version here](https://jquery.com/download/)

# Usage

## Using the client

## Client side settings

```json
{
    "language": "en",
    "messagesToLoadFromBacklog": "10",
    "publicKeyLength": "16"
}
```

```json
{
    "127.0.0.1:3000": {
        "protocol": "http://",
        "username": "test user",
        "color": "#2266FF",
        "privateKey": "lJDnds921SjdsOJdanLDAn"
    }
}
```

## Client side localisation

## Using the server

## Server side settings

```json
{
    "name": "NX1C Private Chat Server",
    "version": "1.0.0",
    "port": "3000",
    "password": "1234",
    "passwordAttempts": "10"
}
```

# Technical documentation

## Encryption
The default NX1C Private Chat encryption module `resources/modules/encrypter/`
provides a ...

## Message Tree

```
{"subjectToBroadcast":"user-advanced-to-active","dataToBroadcast":{"username":"lb4p6vYgBo8NqJR|<x!\u0010t{\u0000\tY\tQK"}}
{"subjectToBroadcast":"message","dataToBroadcast":{"username":"XV8FE2c5cDfz3PfH0NRTN)!\"\u0007=\u0013Q","message":"uG9pTqlTe8Pn6o2lKsuu5HVG9h57wahAmYoUqLKc6GA1NLOC23ZI52XSXMFWa1KpW2lAhCNpk6m6yELtYBfUtAhQsupomS1O486MdlW\fcPS6\f\u0001vSh\u0015_H\u0015%M\"\u001b>\\j]u#_wThyPn\u0010cJ\u0005b7Zhfv\u000f\u000fj)`<\u0015n\u0000\u000bqgK[Rc2Q>S$y'\"|\u00160F={\u0019#Q}os8~^cWo_x>`mN\u000fZ\u001eo\u001c<","color":"hsEx0J4;\u0004=r2@K"}}
{"subjectToBroadcast":"user-left-server","dataToBroadcast":{"username":"lb4p6vYgBo8NqJR|<x!\u0010t{\u0000\tY\tQK"}}
```

## Localisation