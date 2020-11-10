import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
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
            if (!abort) {
                setUsers(data);
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
            <input
                name="user"
                placeholder="user name..."
                onChange={onChange}
                className="input-registration"
                style={{ margin: "0 auto", marginTop: "10px" }}
            ></input>

            {users.length >= 0 && (
                <div>
                    {users.map((eachUser) => (
                        <Link
                            key={eachUser.id}
                            to={`/user/${eachUser.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                className="section"
                                style={{
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <img
                                        src={eachUser.profileimage}
                                        alt={"Profile Picture"}
                                        style={{ width: "50px" }}
                                    />
                                </div>
                                <span style={{ marginLeft: "30px" }}>
                                    {eachUser.first} {eachUser.last}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
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
