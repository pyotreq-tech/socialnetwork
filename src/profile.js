import React from "react";
import BioEditor from "./BioEditor";
import ProfilePicture from "./profilepic";
import WallPosts from "./WallPosts";

export default function Profile(props) {
    console.log("props.bio: ", props.bio);

    return (
        <>
            <div
                className="section"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div class="content" style={{ marginBottom: "30px" }}>
                    <h1
                        style={{
                            margin: "2px",
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        {props.first} {props.last}
                    </h1>
                </div>
                <ProfilePicture
                    profileImage={props.profileImage}
                    first={props.first}
                    last={props.last}
                    classValue={"maxi-logo"}
                />
                <br />

                {props.bio && (
                    <div class="content" style={{ marginTop: "15px" }}>
                        <p style={{ marginLeft: "15px" }}>{props.bio}</p>
                    </div>
                )}

                <br />
                <BioEditor
                    bio={props.bio}
                    id={props.id}
                    updateBio={(arg) => props.updateBio(arg)}
                />
            </div>
            <WallPosts id={props.id} first="your" />
        </>
    );
}
