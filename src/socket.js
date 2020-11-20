// src/socket.js

import * as io from "socket.io-client";
import {
    chatMessages,
    newMessage,
    privateMessages,
    privateMessage,
    onlineUsers,
} from "./actions";

export let socket;
export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        // console.log(privateMessages);
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

    socket.on("sendPrivateMessages", (privateMsgs) => {
        store.dispatch(privateMessages(privateMsgs));
    });
    socket.on("sendPrivateMessage", (privateMsg) => {
        store.dispatch(privateMessage(privateMsg));
    });

    socket.on("chatHistory", (chatMsgs) => {
        console.log("last ten chat msgs: ", chatMsgs);
        store.dispatch(chatMessages(chatMsgs));
    });

    socket.on("addedNewMessage", (chatMsgs) => {
        console.log("New message had been added: ", chatMsgs);
        store.dispatch(newMessage(chatMsgs));
    });

    socket.on("onlineUsers", (users) => {
        console.log({ users });
        store.dispatch(onlineUsers(users));
    });
};
