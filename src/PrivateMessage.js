import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";

export default function PrivateMessage({ each, receiverId }) {
    useEffect(() => {
        console.log(each, receiverId);
    }, []);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px 0",
                    alignItems: "center",
                }}
                className={
                    (receiverId == each.receiver_id && "flex-end") ||
                    (receiverId !== each.receiver_id && "flex-start")
                }
            >
                <span
                    className={
                        (receiverId == each.receiver_id && "me") ||
                        (receiverId !== each.receiver_id && "you")
                    }
                >
                    {each.message}
                </span>
                <span
                    style={{ fontSize: "0.8rem", margin: "0 4px" }}
                    // className={
                    //     (receiverId == each.receiver_id && "me") ||
                    //     (receiverId !== each.receiver_id && "you")
                    // }
                >
                    {each.timestamp.slice(11, 16)}
                </span>
            </div>
        </>
    );
}
