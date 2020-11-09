import React from "react";
import axios from "./axios";
import Profile from "./profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                console.log("response:", response);
                if (response.data.denied) {
                    console.log("false");
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data.first,
                        last: response.data.last,
                        profileimage: response.data.profileimage,
                        bio: response.data.bio,
                    });
                    console.log("this state otherprofile: ", this.state);
                }
            })
            .catch((err) => {
                console.log("id: ", this.props);
                console.log("error in obtaining individual user data: ", err);
            });
    }
    render() {
        return (
            <>
                <h1>Hi, I am another profile</h1>
                <h2>Coming up next</h2>
            </>
        );
    }
}
