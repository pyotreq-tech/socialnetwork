import axios from "./axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OtherFriends({ id }) {
    const [otherFriends, setOtherFriends] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/getOtherFriends/${id}`);
            setOtherFriends(data);
        })();
    });

    return (
        <>
            {otherFriends && <p>Friends:</p>}
            <div className="friends-section">
                {otherFriends &&
                    otherFriends.map((each) => (
                        <div
                            key={each.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                // alignSelf: "center",
                                width: "80px",
                                boxShadow: "none",
                            }}
                        >
                            <Link
                                to={`/user/${each.id}`}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    style={{ width: "80px" }}
                                    src={
                                        each.profileimage || "/empty-image.jpg"
                                    }
                                />
                                <br />
                                {each.first} {each.last}
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}
