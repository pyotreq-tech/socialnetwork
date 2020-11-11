import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [noResult, setNoResult] = useState();
    const [user, setUser] = useState();
    const [threeUsers, setThreeUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("user: ", user);

        (async () => {
            let { data } = await axios.get("/api/users");
            await setThreeUsers(data);
        })();

        let abort;

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
                                <div>
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
                                </div>
                                <span style={{ marginLeft: "30px" }}>
                                    {eachUser.first} {eachUser.last}
                                </span>
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
                    <div className="section">
                        <h1>Joined recently:</h1>
                    </div>
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
