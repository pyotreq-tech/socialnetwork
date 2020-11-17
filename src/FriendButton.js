import axios from "./axios";
import React, { useState, useEffect } from "react";
import OtherFriends from "./OtherFriends";

export default function FriendButton({ id, isFriend }) {
    const [buttonMessage, setButtonMessage] = useState("");

    useEffect(() => {
        if (id) {
            async function checkstatus() {
                let { data } = await axios.get(`/checkFriendStatus/${id}`);
                setButtonMessage(data.button);
                functionInChild();
            }
            checkstatus();
        }
    }, [buttonMessage]);

    const functionInChild = () => {
        isFriend(buttonMessage);
    };

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
            {buttonMessage == "End Friendship" && <OtherFriends id={id} />}
        </>
    );
}
