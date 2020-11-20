import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function FindPeople() {
    const [noResult, setNoResult] = useState();
    const [user, setUser] = useState();
    const [threeUsers, setThreeUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/api/users");
            await setThreeUsers(data);
            console.log({ onlineUsers });
        })();
    }, []);

    useEffect(() => {
        let abort;

        if (user) {
            (async () => {
                let path = `/api/moreusers/${user}`;
                const { data } = await axios.get(path);
                console.log("axios data: ", data);
                if (!abort) {
                    if (data[0]) {
                        setUsers(data);
                        setNoResult(false);
                    } else {
                        setUsers(data);
                        setNoResult(true);
                    }
                }
            })();
            return () => {
                abort = true;
            };
        } else {
            setUsers([]);
        }
    }, [user]);

    function onChange(e) {
        setUser(e.target.value);
    }

    return (
        <>
            <div
                className="section"
                style={{
                    backgroundColor: "#f0f2f5",
                    boxShadow: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0",
                }}
            >
                <input
                    name="user"
                    placeholder="Search on Plenty of Catfish..."
                    onChange={onChange}
                    className="input-registration"
                    style={{
                        marginBottom: "0",
                        width: "320px",
                        height: "40px",
                        boxShadow: "0 0.1rem 0 rgba(0, 0, 0, 0.1)",
                        border: "none",
                    }}
                ></input>
            </div>

            {Array.isArray(users) && (
                <>
                    {users.map((eachUser) => (
                        <Link
                            key={eachUser.id}
                            to={`/user/${eachUser.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                className="section hover"
                                style={{
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    transitionDuration: "0.6s",
                                }}
                                // onClick={() => {
                                //     setUser(null);
                                //     const input = document.getElementsByTagName(
                                //         "input"
                                //     )[0];
                                //     input.value = "";
                                //     console.log("input select: ", input);
                                // }}
                            >
                                <div class="content">
                                    <img
                                        src={
                                            eachUser.profileimage ||
                                            "/empty-image.jpg"
                                        }
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/empty-image.jpg";
                                        }}
                                        // alt={"Profile Picture"}
                                        style={{ width: "50px" }}
                                    />

                                    <span style={{ marginLeft: "30px" }}>
                                        {eachUser.first} {eachUser.last}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </>
            )}

            {noResult && user && (
                <div className="section">
                    <h3>No results for: {user}</h3>
                </div>
            )}
            {!user && (
                <>
                    <h1 style={{ textAlign: "center" }}>Currently Online:</h1>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {onlineUsers &&
                            onlineUsers.map((each) => (
                                <Link to={`/user/${each.id}`}>
                                    <img
                                        src={
                                            each.profileimage ||
                                            "/empty-image.jpg"
                                        }
                                        alt={each.first + " " + each.last}
                                        className={"mini-logo"}
                                        style={{ marginRight: "15px" }}
                                    />
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "8px",
                                            height: "8px",
                                            backgroundColor: "green",
                                            borderRadius: "250%",
                                            top: "-12px",
                                            left: "35px",
                                            border: "1px solid white",
                                        }}
                                    ></div>
                                </Link>
                            ))}
                    </div>
                    <h1 style={{ textAlign: "center" }}>Joined recently:</h1>

                    {threeUsers.map((each) => (
                        <div
                            key={each.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                width: "150px",
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
                                    style={{ maxWidth: "160px" }}
                                    src={
                                        each.profileimage || "/empty-image.jpg"
                                    }
                                />
                                <br />
                                {each.first} {each.last}
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
