import React from "react";
import BioEditor from "./BioEditor";
import ProfilePicture from "./profilepic";

export default function Profile(props) {
    console.log("props.bio: ", props.bio);

    return (
        <div className="section">
            <h1>Profile component</h1>
            <span>
                Hello there {props.first} {props.last}
                <br />
                {props.bio}
                <br />
                <ProfilePicture
                    profileImage={props.profileImage}
                    first={props.first}
                    last={props.last}
                />
                <BioEditor
                    bio={props.bio}
                    id={props.id}
                    updateBio={(arg) => props.updateBio(arg)}
                />
            </span>
        </div>
    );
}
