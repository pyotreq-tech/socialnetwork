import React from "react";
import BioEditor from "./BioEditor";
import ProfilePicture from "./profilepic";

export default function Profile(props) {
    console.log("props.bio: ", props.bio);

    return (
        <div
            className="section"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>
                {props.first} {props.last}
            </h1>
            <ProfilePicture
                profileImage={props.profileImage}
                first={props.first}
                last={props.last}
                classValue={"maxi-logo"}
            />
            <br />
            <p>{props.bio}</p>
            <br />
            <BioEditor
                bio={props.bio}
                id={props.id}
                updateBio={(arg) => props.updateBio(arg)}
            />
        </div>
    );
}
