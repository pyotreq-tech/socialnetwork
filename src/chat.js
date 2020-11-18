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
            <div className="section" style={{ height: "600px" }}>
                <h1>Welcome to Chat</h1>
                <div
                    ref={elemRef}
                    className="chatMessages"
                    style={{ height: "415px", overflowY: "auto" }}
                >
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <>
                                <div
                                    style={{
                                        backgroundColor: "#808184",
                                        padding: "2px 4px",
                                        marginBottom: "3px",
                                    }}
                                >
                                    <p style={{ margin: "0" }}>
                                        {each.author_id}
                                        {each.timestamp}
                                    </p>
                                    <p
                                        style={{
                                            margin: "0",
                                        }}
                                    >
                                        {each.message}
                                    </p>
                                </div>
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
