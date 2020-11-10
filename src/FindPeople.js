import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [threeUsers, setThreeUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get("/api/users");
            setThreeUsers(data);
        }
        getData();
    });

    return (
        <>
            <div className="section">
                <h1>Joined recently:</h1>
            </div>
            {threeUsers.map((each) => (
                <div
                    className="section"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                >
                    <Link
                        to={`/user/${each.id}`}
                        style={{
                            textDecoration: "none",
                            textAlign: "center",
                        }}
                    >
                        <img src={each.profileimage} />
                        <br />
                        {each.first} {each.last}
                    </Link>
                </div>
            ))}
        </>
    );
}
