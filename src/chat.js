import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("addNewMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div
                className="section"
                style={{
                    height: "620px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "0",
                        backgroundColor: "#424446",
                        borderRadius: "5px",
                    }}
                >
                    Shoutbox
                </h1>
                <div
                    ref={elemRef}
                    className="chatMessages"
                    style={{ height: "415px", overflowY: "auto" }}
                >
                    {chatMessages &&
                        chatMessages.map((each) => (
                            <>
                                <div
                                    class="Magda"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        marginTop: "15px",
                                    }}
                                    key={each.id}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <div
                                            className="content chatMessage"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    textAlign: "left",
                                                    margin: "3px 4px",
                                                }}
                                            >
                                                <strong>
                                                    {each.first} {each.last}
                                                </strong>
                                                &nbsp;
                                                {/* {each.timestamp.slice(0, 10)} */}
                                                <span
                                                    style={{
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    {each.timestamp.slice(
                                                        11,
                                                        16
                                                    )}
                                                </span>
                                            </p>
                                            <p style={{ margin: "3px 6px" }}>
                                                {each.message}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/user/${each.author_id}`}
                                            style={{ alignSelf: "center" }}
                                        >
                                            <img
                                                src={
                                                    each.profileimage ||
                                                    "/empty-image.jpg"
                                                }
                                                alt={
                                                    each.first + " " + each.last
                                                }
                                                className={"mini-logo"}
                                                style={{
                                                    margin: "5px",
                                                    marginRight: "15px",
                                                    width: "35px",
                                                    height: "35px",
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
                <div>
                    <textarea
                        style={{
                            backgroundColor: "#323436",
                            color: "rgba(255, 255, 255, 0.8)",
                            outline: "none",
                            fontFamily: "Lato",
                            marginLeft: "20px",
                            marginTop: "15px",
                            width: "230px",
                            overflow: "hidden",
                        }}
                        onKeyDown={keyCheck}
                        placeholder="type your message"
                    ></textarea>
                </div>
            </div>
        </>
    );
}
