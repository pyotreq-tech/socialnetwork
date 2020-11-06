import React from "react";
import Logo from "./logo";
import Uploader from "./Uploader";
import ProfilePicture from "./profilepic";
import Profile from "./profile";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        // this we will pass from axios:
        this.state = {
            uploaderIsVisible: false,
            profileComponent: true,
        };

        // bind functions here
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        // console.log(this.state);
        console.log("App just mounted");
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
                console.log(this.state);
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
        console.log(arg);
        this.setState({ profileImage: arg });
        console.log("toggleComponent: ");
        this.toggleComponent("uploaderIsVisible");
    }
    updateBio(arg) {
        console.log(arg);
        this.setState({ bio: arg });
        // console.log("toggleComponent: ");
        // this.toggleComponent("uploaderIsVisible");
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-navbar">
                    <Logo />
                    <h2>
                        {this.state.uploaderIsVisible &&
                            "Upload your profile picture"}
                        {!this.state.uploaderIsVisible &&
                            "Welcome to our network"}
                    </h2>
                    <div
                        className="navbar-icon"
                        onClick={() => this.toggleComponent("profileComponent")}
                    >
                        <i className="fas fa-user"></i>
                    </div>

                    <ProfilePicture
                        profileImage={this.state.profileImage}
                        first={this.state.first}
                        last={this.state.last}
                        toggleComponent={(arg) => this.toggleComponent(arg)}
                    />
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
                        <div className="section">
                            sd fdsdfs2sdf dsf bsdfjkdsh kjhsdgg djh jkgsh ldfjhg
                            lsdjfhgk hsdfkjhg dsfjkgh lkkfdj hlsfdgf jkshdhf jhd
                            342v342 234v4
                        </div>
                        <div className="section">
                            sd fdsdfs2sdf fgo sdfogiu fdoiiugdfsoiug oisdfugoi
                            dufsoigiu sdfoigu ofdiug ofdiug dsf bsdfjkdsh kjhsdf
                            jkshdhf jhd 342v342 234v4
                        </div>
                        <div className="section">
                            sd fdsdfs2sdf dsf bsdfjkdsh kjhsdf jkshdhf jhd
                            342v342 234v4
                        </div>
                    </div>
                    <div className="app-right">
                        {this.state.profileComponent && (
                            <Profile
                                profileImage={this.state.profileImage}
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                id={this.state.id}
                                updateBio={(arg) => this.updateBio(arg)}
                            />
                        )}

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp}
                                profileImage={this.state.profileImage}
                                first={this.state.first}
                                last={this.state.last}
                                id={this.state.id}
                            />
                            // binding is more performant
                            // <Uploader
                            //     methodInApp={() => {
                            //         this.methodInApp();
                            //     }}
                            // />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
