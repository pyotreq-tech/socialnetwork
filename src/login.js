import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleChange = this.handleChange.bind(this);
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

    submit() {
        console.log("about to submit!!!");
        axios
            .post("/login", this.state)
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    //then we want to redirect the user to our social network
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        console.log("this.state.error: ", this.state.error);
        return (
            <div className="flex-col registration-div">
                <h1>Sign in:</h1>
                {this.state.error && (
                    <div className="error">Oops, something went wrong</div>
                )}

                <input
                    name="email"
                    placeholder="email..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                    // onChange={this.handleChange}
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
                </button>
                <p>
                    Do not have an account yet? <Link to="/">Register</Link>
                </p>
            </div>
        );
    }
}
