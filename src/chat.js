import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat just mounted");
        console.log("elemRef", elemRef);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            console.log("user want to send message");
            e.preventDefault();
            socket.emit("My amazing new message", e.target.value);
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
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                    <p>single chat msg</p>
                </div>
                <textarea
                    onChange={keyCheck}
                    placeholder="type your message"
                ></textarea>
            </div>
        </>
    );
}
