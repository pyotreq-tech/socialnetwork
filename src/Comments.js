import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function Comments({ post_id, author_id }) {
    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]);
    const [commentsOn, setCommentsOn] = useState(false);
    const [update, setUpdate] = useState();

    useEffect(() => {
        setUpdate(false);
        if (post_id) {
            (async () => {
                let { data } = await axios.get(`/getComments/${post_id}`);
                await setComments(data);
            })();
        }
        console.log("infinite?");
    }, [update]);

    function onChange(e) {
        setComment(e.target.value);
    }

    function toggleComment() {
        setCommentsOn(!commentsOn);
    }

    async function handleClick(e) {
        const { data } = await axios.post("/postComment", {
            post_id: post_id,
            author_id: author_id,
            comment: comment,
        });
        setUpdate(true);
        document.getElementById("commentText").value = "";
    }

    return (
        <>
            <div style={{ textAlign: "center" }} onClick={toggleComment}>
                <h3>
                    Comments <i class="fas fa-comment-dots"></i>
                </h3>
            </div>
            {commentsOn && (
                <>
                    <p>Write a comment:</p>
                    <input
                        id="commentText"
                        onChange={onChange}
                        type="text"
                        name="comment"
                        placeholder="write your comment"
                        style={{
                            display: "block",
                            backgroundColor: "#323436",
                            color: "rgba(255, 255, 255, 0.8)",
                            outline: "none",
                            fontFamily: "Lato",
                            // marginLeft: "20px",
                            marginTop: "15px",
                            width: "230px",
                            overflow: "hidden",
                        }}
                    ></input>
                    <button
                        onClick={handleClick}
                        style={{
                            // marginTop: "5px",
                            fontSize: "0.8rem",
                            border: "none",
                            backgroundColor: "teal",
                            color: "white",
                            width: "120px",
                            height: "20px",
                            margin: "0",
                            marginTop: "15px",
                            backgroundImage:
                                "linear-gradient(to top, teal, lightsteelblue)",
                        }}
                        className="input-registration"
                        // onClick={() => dispatch(unfriend(each.id))}
                    >
                        Add comment
                    </button>
                    {comments.map((each) => (
                        <div
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
                                <Link to={`/user/${each.author_id}`}>
                                    <img
                                        src={
                                            each.profileimage ||
                                            "/empty-image.jpg"
                                        }
                                        alt={each.first + " " + each.last}
                                        className={"mini-logo"}
                                        style={{
                                            margin: "5px",
                                            marginRight: "15px",
                                            width: "35px",
                                            height: "35px",
                                        }}
                                    />
                                </Link>
                                <div
                                    className="content"
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
                                        {/* &nbsp;
                                        {each.timestamp.slice(0, 10)}{" "}
                                        {each.timestamp.slice(11, 16)} */}
                                    </p>
                                    <p style={{ margin: "3px 6px" }}>
                                        {each.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
