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
import Friends from "./Friends";
import Chat from "./Chat";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            uploaderIsVisible: false,
            // profileComponent: false,
            chatIsOn: false,
            findPeopleIsOn: false,
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
                        <div
                            onClick={() =>
                                this.toggleComponent("findPeopleIsOn")
                            }
                        >
                            <Logo />
                        </div>

                        <Link to="/friends" style={{ textDecoration: "none" }}>
                            <div
                                className="navbar-icon"
                                // onClick={() => this.toggleComponent("profileComponent")}
                            >
                                <i class="fas fa-users"></i>
                            </div>
                        </Link>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <div
                                className="navbar-icon"
                                // onClick={() => this.toggleComponent("profileComponent")}
                            >
                                <i className="fas fa-user"></i>
                            </div>
                        </Link>

                        <div
                            className="navbar-icon"
                            onClick={() => this.toggleComponent("chatIsOn")}
                        >
                            <i class="fab fa-speakap"></i>
                        </div>

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
                        <div
                            className="app-left"
                            onMouseEnter={() => console.log("LOL1")}
                            onMouseLeave={() => console.log("LOL2")}
                        >
                            {this.state.findPeopleIsOn && <FindPeople />}
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
                            <Route path="/friends" component={Friends} />
                        </div>
                        {this.state.chatIsOn && (
                            <div className="app-chat">
                                <Chat />
                            </div>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
