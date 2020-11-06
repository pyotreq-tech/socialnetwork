import React from "react";
import BioEditor from "./BioEditor";
import ProfilePicture from "./profilepic";

export default function Profile(props) {
    console.log("props: ", props);

    return (
        <div className="section">
            <h1>Profile component</h1>
            <span>
                Hello there {props.first} {props.last}
                <ProfilePicture
                    profileImage={props.profileImage}
                    first={props.first}
                    last={props.last}
                />
                <BioEditor />
            </span>
        </div>
    );
}
