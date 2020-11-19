import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import PrivateMessage from "./PrivateMessage";

export default function PrivateChat({ receiverId }) {
    const privateMessages = useSelector(
        (state) => state && state.privateMessages
    );

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [privateMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("addNewPrivateMessage", {
                message: e.target.value,
                receiverId: receiverId,
            });
            console.log(e.target.value);
            e.target.value = "";
        }
    };

    useEffect(() => {
        socket.emit("getPrivateMessages", receiverId);
    }, []);

    return (
        <>
            <div class="section">
                <div ref={elemRef} className="private-chat-messages">
                    {privateMessages &&
                        privateMessages.map((each) => (
                            <PrivateMessage
                                each={each}
                                receiverId={receiverId}
                            />
                        ))}
                </div>
                <textarea
                    style={{
                        backgroundColor: "#323436",
                        color: "rgba(255, 255, 255, 0.8)",
                        outline: "none",
                        fontFamily: "Lato",
                        marginLeft: "20px",
                        marginTop: "15px",
                        width: "230px",
                        overflow: "hidden",
                    }}
                    onKeyDown={keyCheck}
                    placeholder="type your message"
                ></textarea>
            </div>
        </>
    );
}
