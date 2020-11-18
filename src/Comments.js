import React, { useState, useEffect } from "react";
import axios from "./axios";

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
                        onChange={onChange}
                        type="text"
                        name="comment"
                        placeholder="write your comment"
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
                            className="content"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginTop: "15px",
                            }}
                            key={each.id}
                        >
                            <div>
                                <p style={{ margin: "3px 6px" }}>
                                    Post id: {each.post_id} by: {each.author_id}{" "}
                                    &nbsp;
                                    {each.timestamp.slice(0, 10)}{" "}
                                    {each.timestamp.slice(11, 16)}
                                </p>
                            </div>
                            <p style={{ margin: "3px 6px" }}>{each.comment}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
