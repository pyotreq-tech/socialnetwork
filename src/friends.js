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

    let sentRequests = useSelector(
        (state) =>
            state.sentRequests && state.sentRequests.filter((each) => each)
    );

    useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center" }}> Friends requests: </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {wannabes &&
                    wannabes.map((each) => (
                        <div
                            key={each.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "110px",
                                // height: "190px",
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
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    src={
                                        each.profileimage || "/empty-image.jpg"
                                    }
                                />
                                <br />
                                <p style={{ marginTop: "5px" }}>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    // marginTop: "5px",
                                    fontSize: "0.8rem",
                                    border: "none",
                                    backgroundColor: "teal",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",

                                    backgroundImage:
                                        "linear-gradient(to top, teal, lightsteelblue)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(acceptFriend(each.id))}
                            >
                                Accept
                            </button>
                            <br></br>
                            <button
                                style={{
                                    // marginTop: "15px",
                                    fontSize: "0.8rem",
                                    border: "none",
                                    backgroundColor: "teal",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, teal, lightsteelblue)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                Reject
                            </button>
                        </div>
                    ))}
            </div>

            <h1 style={{ textAlign: "center" }}> Sent requests: </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {sentRequests &&
                    sentRequests.map((each) => (
                        <div
                            key={each.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "110px",
                                // minHeight: "220px",
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
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    src={
                                        each.profileimage || "/empty-image.jpg"
                                    }
                                />
                                <br />
                                <p style={{ marginTop: "5px" }}>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    // marginTop: "5px",
                                    fontSize: "0.8rem",
                                    border: "none",
                                    backgroundColor: "teal",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, teal, lightsteelblue)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
            </div>

            {friends && <h1 style={{ textAlign: "center" }}> Friends: </h1>}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {friends &&
                    friends.map((each) => (
                        <div
                            key={each.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                // alignSelf: "center",
                                width: "110px",
                                // height: "190px",
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
                                    style={{
                                        maxWidth: "110px",
                                    }}
                                    src={
                                        each.profileimage || "/empty-image.jpg"
                                    }
                                />
                                <br />
                                <p style={{ marginTop: "5px" }}>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    // marginTop: "5px",
                                    fontSize: "0.8rem",
                                    border: "none",
                                    backgroundColor: "teal",
                                    color: "white",
                                    width: "100px",
                                    margin: "0",
                                    height: "20px",
                                    backgroundImage:
                                        "linear-gradient(to top, teal, lightsteelblue)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
}
