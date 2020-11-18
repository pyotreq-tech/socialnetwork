import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("addNewMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="section">
                <h1>Welcome to Chat</h1>
                <div
                    ref={elemRef}
                    className="chatMessages"
                    style={{ height: "415px", overflow: "scroll" }}
                >
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <>
                                <p>
                                    {each.author_id}
                                    {each.timestamp}
                                </p>
                                <p>{each.message}</p>
                            </>
                        ))}
                </div>
                <textarea
                    onKeyDown={keyCheck}
                    placeholder="type your message"
                ></textarea>
            </div>
        </>
    );
}
