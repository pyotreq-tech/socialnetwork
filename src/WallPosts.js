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
        if (id) {
            (async () => {
                let { data } = await axios.get(`/getWall/${id}`);
                await setPosts(data);
            })();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            (async () => {
                let { data } = await axios.get(`/checkFriendStatus/${id}`);
                if (data.button == "End Friendship" || id == data.id) {
                    setIsFriend(true);
                    setAuthorId(data.id);
                }
            })();
        }
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
        await setPosts([...data, ...posts]);
        console.log("posts: ", posts);
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
                            <h3>
                                {each.author_id} to {each.user_id} &nbsp;
                                {each.timestamp.slice(0, 10)}{" "}
                                {each.timestamp.slice(11, 16)}
                            </h3>
                            <h4>{each.content}</h4>
                            <img src={each.image_url}></img>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
