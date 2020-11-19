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
                className={
                    (receiverId !== each.receiver_id && "me") ||
                    (receiverId == each.receiver_id && "you")
                }
            >
                {each.message}
            </div>
        </>
    );
}
