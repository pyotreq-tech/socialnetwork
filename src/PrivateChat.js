import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import PrivateMessage from "./PrivateMessage";

export default function PrivateChat({ receiverId }) {
    const privateMessages = useSelector(
        (state) => state && state.privateMessages
    );

    useEffect(() => {
        socket.emit("getPrivateMessages", receiverId);
    }, []);

    return (
        <>
            <div class="section">
                <h1>Welcome to the chat:</h1>
                <div
                    class="content"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {privateMessages &&
                        privateMessages.map((each) => (
                            <PrivateMessage
                                each={each}
                                receiverId={receiverId}
                            />
                        ))}
                </div>
                <input placeholder="tyle your message here"></input>
            </div>
        </>
    );
}
