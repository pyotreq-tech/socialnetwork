import React from "react";
import Logo from "./logo";
import Uploader from "./Uploader";
import ProfilePicture from "./profilepic";
import axios from "./axios";

export default class App extends React.Component {
    constructor() {
        super();
        // this we will pass from axios:
        this.state = {
            uploaderIsVisible: false,
        };

        // bind functions here
        this.methodInApp = this.methodInApp.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        axios
            .get("/users", this.state)
            .then(({ data }) => {
                const { email, first, id, last, profileimage } = data;
                this.setState({
                    email: email,
                    first: first,
                    id: id,
                    last: last,
                    profileImage: profileimage,
                });
                console.log(this.state);
            })
            .catch((e) => {
                console.log("error in axios: ", e);
            });
        // here axios request about logged in user
        // later setState to store the data in component state
    }

    toggleUploader() {
        console.log("you want to uploader appear");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log(arg);
        this.setState({ profileImage: arg });
        this.toggleUploader();
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
                    <ProfilePicture
                        profileImage={this.state.profileImage}
                        first={this.state.first}
                        last={this.state.last}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </div>
                <div className="app-body">
                    <div className="app-left">sd fdsdfs2342v342 234v4</div>
                    <div className="app-right">
                        <h1>Hey I am your App :D</h1>

                        {this.state.uploaderIsVisible && (
                            // we can also write this without binding:
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
