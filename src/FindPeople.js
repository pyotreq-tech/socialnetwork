import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [user, setUser] = useState("");
    const [threeUsers, setThreeUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/users");
            setThreeUsers(data);
        })();
        console.log(user);
        // let abort;
        // (async () => {
        //     const { data } = await axios.get(`/api/users/${user}`);
        //     if (!abort) {
        //         setUsers(data);
        //     }
        // })();
        // return () => {
        //     abort = true;
        // };
    }, [user]);

    function onChange(e) {
        setUser(e.target.value);
        // console.log(value);
        // setUser(value);
        // console.log(user);
        let abort;
        (async () => {
            await setUser(e.target.value);
            const { data } = await axios.get(`/api/users/${user}`);
            if (!abort) {
                setUsers(data);
            }
        })();
        return () => {
            abort = true;
        };
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
            {users.map((user) => (
                <Link
                    to={`/user/${user.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <div
                        key={user.id}
                        className="section"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <img
                                src={user.profileimage}
                                style={{ width: "50px" }}
                            />
                        </div>
                        <span style={{ marginLeft: "30px" }}>
                            {user.first} {user.last}
                        </span>
                    </div>
                </Link>
            ))}
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
