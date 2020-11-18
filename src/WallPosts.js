import React, { useState, useEffect } from "react";
import axios from "./axios";
import Comments from "./Comments";
import { Link } from "react-router-dom";

export default function WallPosts({ id, first }) {
    const [isFriend, setIsFriend] = useState(false);
    const [content, setContent] = useState();
    const [url, setUrl] = useState();
    const [authorId, setAuthorId] = useState();
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState();

    useEffect(() => {
        setUpdate(false);
        if (id) {
            (async () => {
                let { data } = await axios.get(`/getWall/${id}`);
                await setPosts(data);
            })();
        }
        console.log("infinite?");
    }, [id, update]);

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
        setUpdate(true);
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
                                    />
                                </Link>

                                <h3 style={{ marginLeft: "15px" }}>
                                    {each.first} &nbsp;
                                    {each.last} &nbsp;
                                    {each.timestamp.slice(0, 10)}{" "}
                                    {each.timestamp.slice(11, 16)}
                                </h3>
                            </div>
                            <h4>{each.content}</h4>
                            <img src={each.image_url}></img>

                            <Comments post_id={each.id} author_id={authorId} />
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
