import React from "react";
import Logo from "./logo";
import Uploader from "./Uploader";
import ProfilePicture from "./profilepic";
import Profile from "./profile";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import { Link } from "react-router-dom";
import FindPeople from "./FindPeople";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            uploaderIsVisible: false,
            // profileComponent: false,
        };
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        axios
            .get("/users", this.state)
            .then(({ data }) => {
                const { email, first, id, last, profileimage, bio } = data;
                this.setState({
                    email: email,
                    first: first,
                    id: id,
                    last: last,
                    profileImage: profileimage,
                    bio: bio,
                });
            })
            .catch((e) => {
                console.log("error in axios: ", e);
            });
    }

    toggleComponent(arg) {
        this.setState({
            uploaderIsVisible: false,
            profileComponent: false,
            [arg]: !this.state[arg],
        });
    }

    methodInApp(arg) {
        this.setState({ profileImage: arg });
    }
    updateBio(arg) {
        this.setState({ bio: arg });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <div className="app-navbar">
                        <Logo />

                        <Link to="/">
                            <div
                                className="navbar-icon"
                                // onClick={() => this.toggleComponent("profileComponent")}
                            >
                                <i className="fas fa-user"></i>
                            </div>
                        </Link>

                        <Link to="/uploader">
                            <ProfilePicture
                                profileImage={this.state.profileImage}
                                first={this.state.first}
                                last={this.state.last}
                                classValue={"mini-logo"}
                                toggleComponent={(arg) =>
                                    this.toggleComponent(arg)
                                }
                            />
                        </Link>

                        <a
                            href="/logout"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <div className="navbar-icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </a>
                    </div>
                    <div className="app-body">
                        <div className="app-left">
                            <FindPeople />
                        </div>
                        <div className="app-right">
                            {/* {this.state.profileComponent && ( */}
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        profileImage={this.state.profileImage}
                                        first={this.state.first}
                                        last={this.state.last}
                                        bio={this.state.bio}
                                        id={this.state.id}
                                        updateBio={(arg) => this.updateBio(arg)}
                                    />
                                )}
                            />

                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />

                            <Route
                                path="/uploader"
                                render={() => (
                                    <Uploader
                                        methodInApp={this.methodInApp}
                                        profileImage={this.state.profileImage}
                                        first={this.state.first}
                                        last={this.state.last}
                                        id={this.state.id}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
