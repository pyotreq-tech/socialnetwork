import axios from "./axios";
import React, { useState, useEffect } from "react";

export default function FriendButton({ id }) {
    const [buttonMessage, setButtonMessage] = useState();

    const handleClick = () => {
        (async () => {
            let { data } = await axios.post(`/FriendStatus/${buttonMessage}`, {
                id: id,
            });
        })();
    };

    useEffect(() => {
        (async () => {
            let { data } = await axios.get(`/checkFriendStatus/${id}`);
            setButtonMessage(data.button);
        })();
    });

    return (
        <>
            <button
                style={{
                    backgroundColor: "teal",
                    color: "white",
                }}
                className="input-registration"
                onClick={handleClick}
            >
                {buttonMessage}
            </button>
        </>
    );
}
