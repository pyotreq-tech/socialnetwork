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
        document.getElementsByTagName("textarea")[0].value = "";
        document.getElementById("wallUrl").value = "";
        setUpdate(true);
    }

    return (
        <>
            {isFriend && (
                <>
                    <div className="section">
                        <div className="content">
                            <h2 style={{ margin: "3px 6px" }}>
                                Write on {first} wall{" "}
                            </h2>
                        </div>
                        <textarea
                            placeholder="Your post goes here"
                            onChange={onChange}
                            name="content"
                            style={{
                                backgroundColor: "#323436",
                                color: "rgba(255, 255, 255, 0.8)",
                                outline: "none",
                                fontFamily: "Lato",
                                // marginLeft: "20px",
                                marginTop: "15px",
                                width: "350px",
                                height: "100px",
                                overflow: "hidden",
                            }}
                        />
                        <input
                            id="wallUrl"
                            type="text"
                            onChange={onChangeUrl}
                            name="image_url"
                            placeholder="Type url here"
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
                            // className={"bio-textarea"}
                        />
                        <button
                            onClick={handleClick}
                            className="input-registration"
                            style={{
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
                            <div class="content">
                                <p style={{ margin: "5px 5px" }}>
                                    {each.content}
                                </p>
                            </div>
                            <img
                                style={{ marginTop: "15px", maxWidth: "450px" }}
                                src={each.image_url}
                            ></img>

                            <Comments post_id={each.id} author_id={authorId} />
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
