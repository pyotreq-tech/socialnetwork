import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function WallPosts({ id, first }) {
    const [isFriend, setIsFriend] = useState(false);
    const [postContent, setPostContent] = useState();
    const [url, setUrl] = useState();
    const [authorId, setAuthorId] = useState();

    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/checkFriendStatus/${id}`);
            if (data.button == "End Friendship" || id == data.id) {
                setIsFriend(true);
                setAuthorId(data.id);
            }
        })();
    });

    function onChange(e) {
        setPostContent({ [e.target.name]: e.target.value });
    }
    function onChangeUrl(e) {
        setUrl({ [e.target.name]: e.target.value });
    }

    async function handleClick() {
        const { data } = await axios.post("/postWall", {
            user_id: id,
            author_id: authorId,
            content: postContent,
            image_url: url,
        });
    }

    console.log(postContent, url);

    return (
        <>
            {isFriend && (
                <>
                    <div className="section">
                        <h2>Write on {first} wall </h2>
                        <textarea
                            onChange={onChange}
                            name="wallpost"
                            className={"bio-textarea"}
                        />
                        <input
                            type="text"
                            onChange={onChangeUrl}
                            name="url"
                            // className={"bio-textarea"}
                        />
                        <button
                            onClick={handleClick}
                            className="input-registration"
                            style={{
                                backgroundColor: "teal",
                                color: "white",
                                width: "130px",
                                margin: "10px auto",
                            }}
                        >
                            Post
                        </button>
                    </div>
                    <div className="section">
                        <h1>Post itself</h1>
                    </div>
                </>
            )}
        </>
    );
}
