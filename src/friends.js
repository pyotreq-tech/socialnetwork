import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getList, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    let friends = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((each) => each.accepted)
    );
    let wannabes = useSelector(
        (state) =>
            state.receivedRequests &&
            state.receivedRequests.filter((each) => each.accepted == false)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <>
            <h1>Hi, I am a friends component</h1>
            {friends && <div> Your friends: </div>}
            {friends &&
                friends.map((each) => (
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
                                src={each.profileimage || "/empty-image.jpg"}
                            />
                            <br />
                            {each.first} {each.last}
                        </Link>
                    </div>
                ))}
            {wannabes && <div> Your wannabees: </div>}
            {wannabes &&
                wannabes.map((each) => (
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
                                src={each.profileimage || "/empty-image.jpg"}
                            />
                            <br />
                            {each.first} {each.last}
                        </Link>
                    </div>
                ))}
        </>
    );
}
