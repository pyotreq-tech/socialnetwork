import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            resetPassword: 0,
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    getCurrentState() {
        if (this.state.resetPassword == 0) {
            return (
                <>
                    <h2>
                        Please enter the email address used for registration:
                    </h2>
                    <input
                        name="email"
                        placeholder="email..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                    ></input>
                    <button
                        style={{
                            "background-color": "teal",
                            color: "white",
                        }}
                        className="input-registration"
                        onClick={() => this.submit()}
                    >
                        Submit
                    </button>
                </>
            );
        } else if (this.state.resetPassword == 1) {
            return (
                <>
                    <h2>Please enter the code you received:</h2>
                    <input
                        name="code"
                        placeholder="code..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                        style={{
                            "margin-bottom": "0",
                        }}
                    ></input>

                    <h2>Please enter the code you received:</h2>
                    <input
                        name="password"
                        placeholder="password..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                    ></input>

                    <button
                        style={{
                            "background-color": "teal",
                            color: "white",
                        }}
                        className="input-registration"
                        onClick={() => this.submit()}
                    >
                        Submit
                    </button>
                </>
            );
        } else if (this.state.resetPassword == 2) {
            return (
                <>
                    <h2>Success!</h2>
                    <p>
                        You can now <Link to="/login">sign in</Link> with your
                        new password.
                    </p>
                </>
            );
        }
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    // submit() {
    //     console.log("about to submit!!!");
    //     axios
    //         .post("/login", this.state)
    //         .then((response) => {
    //             console.log(response);
    //             if (response.data.success) {
    //                 //then we want to redirect the user to our social network
    //                 location.replace("/");
    //             } else {
    //                 this.setState({
    //                     error: true,
    //                 });
    //             }
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // }

    render() {
        console.log("this.state.error: ", this.state.error);
        return (
            <div className="flex-col registration-div">
                <h1>Reset your password:</h1>
                {this.state.error && (
                    <div className="error">Oops, something went wrong</div>
                )}
                {this.getCurrentState()}
                {/* <input
                    name="email"
                    placeholder="email..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <input
                    name="password"
                    type="password"
                    placeholder="password..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <button
                    style={{
                        "background-color": "teal",
                        color: "white",
                    }}
                    className="input-registration"
                    onClick={() => this.submit()}
                >
                    Sign In
                </button> */}
                <p>
                    Do not have an account yet? <Link to="/">Register</Link>
                </p>
            </div>
        );
    }
}
