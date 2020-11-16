import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function WallPosts({ id, first }) {
    const [isFriend, setIsFriend] = useState(false);
    const [content, setContent] = useState();
    const [url, setUrl] = useState();
    const [authorId, setAuthorId] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            let { data } = await axios.get(`/getWall/${id}`);
            await setPosts(data);
        })();
    }, [url]);

    useEffect(() => {
        (async () => {
            let { data } = await axios.get(`/checkFriendStatus/${id}`);
            if (data.button == "End Friendship" || id == data.id) {
                setIsFriend(true);
                setAuthorId(data.id);
            }
        })();
    });

    function onChange(e) {
        setContent(e.target.value);
    }
    function onChangeUrl(e) {
        setUrl(e.target.value);
    }

    async function handleClick() {
        const { data } = await axios.post("/postWall", {
            user_id: id,
            author_id: authorId,
            content,
            image_url: url,
        });
    }

    return (
        <>
            {isFriend && (
                <>
                    <div className="section">
                        <h2>Write on {first} wall </h2>
                        <textarea
                            onChange={onChange}
                            name="content"
                            className={"bio-textarea"}
                        />
                        <input
                            type="text"
                            onChange={onChangeUrl}
                            name="image_url"
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

                    {posts.map((each) => (
                        <div className="section" key={each.id}>
                            <img src={each.image_url}></img>

                            <h3>
                                Posted by {each.author_id} at{" "}
                                {each.timestamp.slice(0, 10)}{" "}
                                {each.timestamp.slice(11, 16)}
                            </h3>
                            <h4>{each.content}</h4>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
