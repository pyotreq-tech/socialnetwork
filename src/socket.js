// src/socket.js

import * as io from "socket.io-client";

export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // receiving a message from server
        // socket.on("welcome", (msg) => {
        //     console.log("hopefully we see this:)", msg.name);
        // });

        // socket.on("messageSentWithIoEmit", (msg) =>
        //     console.log("payload from messageSentWithIo: ", msg)
        // );

        // socket.on("broadcastEmitFun", (msg) =>
        //     console.log("payload from broadcastEmitFun: ", msg)
        // );

        // sending message from client to server
        // socket.emit("messageFromClient", [1, 2, 3]);
    }

    socket.on("chatHistory", (chatMsgs) => {
        console.log("last ten chat msgs: ", chatMsgs);
    });
};
