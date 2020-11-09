import React from "react";

export default function Logo() {
    return (
        <div
            className="navbar-icon"
            style={{
                backgroundImage:
                    "linear-gradient(to top, teal, lightsteelblue)",
                color: "white",
            }}
        >
            <i className="fas fa-fish logo"></i>
        </div>
    );
}
