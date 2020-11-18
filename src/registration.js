import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
            .post("/register", this.state)
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
                <h1>Join us now!</h1>
                {this.state.error && (
                    <div className="error">Oops, something went wrong</div>
                )}

                <input
                    name="first"
                    placeholder="first name..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                    // onChange={this.handleChange}
                ></input>
                <input
                    name="last"
                    placeholder="last name..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <input
                    name="email"
                    placeholder="email..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <input
                    name="password"
                    placeholder="password..."
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <button
                    style={{
                        fontSize: "0.8rem",
                        border: "none",
                        backgroundColor: "teal",
                        color: "white",
                        width: "120px",
                        height: "20px",
                        margin: "0",
                        backgroundImage:
                            "linear-gradient(to top, teal, lightsteelblue)",
                    }}
                    className="input-registration"
                    onClick={() => this.submit()}
                >
                    Register
                </button>
                <p>
                    Already a member? <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
