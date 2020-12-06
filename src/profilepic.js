import React from "react";

export default function ProfilePicture({
    profileImage,
    first,
    last,
    toggleComponent,
    classValue,
}) {
    // console.log("props from App:", first);
    return (
        <>
            <img
                src={profileImage || "/empty-image.JPG"}
                alt={first + " " + last}
                onClick={() => toggleComponent("uploaderIsVisible")}
                className={classValue}
            />
        </>
    );
}
