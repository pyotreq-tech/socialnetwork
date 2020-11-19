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
            </div>
        </>
    );
}
