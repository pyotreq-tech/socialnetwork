import axios from "./axios";
import React, { useState, useEffect } from "react";

export default function FriendButton({ id }) {
    const [buttonMessage, setButtonMessage] = useState();

    useEffect(() => {
        console.log("runs always");
        (async () => {
            let { data } = await axios.get(`/checkFriendStatus/${id}`);
            setButtonMessage(data.button);
        })();
    }, [buttonMessage]);

    const handleClick = () => {
        (async () => {
            let { data } = await axios.post(`/FriendStatus/${buttonMessage}`, {
                id: id,
            });
            setButtonMessage();
        })();
    };

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
