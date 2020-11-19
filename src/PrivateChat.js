import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";

export default function PrivateChat({ receiverId }) {
    useEffect(() => {
        socket.emit("getPrivateMessages", receiverId);
    });

    return (
        <>
            <div class="section">
                <h1>Welcome to the chat:</h1>
                <div class="content">messages will be diplayed here:</div>
                <input placeholder="tyle your message here"></input>
            </div>
        </>
    );
}
