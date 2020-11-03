import React from "react";
import Registration from "./registration";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <div className="welcome-logo">
                <h1 className="welcome-title">
                    Plenty of Catfish
                    <br />
                    <p style={{ "font-size": "2rem" }}>
                        Social network like every other
                    </p>
                </h1>
            </div>
            <Registration />
        </div>
    );
}
