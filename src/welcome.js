import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <div className="welcome-logo">
                <h1 className="welcome-title">
                    Plenty of Catfish
                    <br />
                    <p style={{ fontSize: "2rem" }}>
                        Social network like every other
                    </p>
                </h1>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
