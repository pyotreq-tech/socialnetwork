import React from "react";
import axios from "./axios";
// import Profile from "./profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.denied) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data.first,
                        last: response.data.last,
                        profileimage: response.data.profileimage,
                        bio: response.data.bio,
                    });
                }
            })
            .catch((err) => {
                console.log("error in obtaining individual user data: ", err);
            });
    }
    render() {
        return (
            <div className="section">
                <img src={this.state.profileimage || "/empty-image.jpg"} />

                <h3>
                    {this.state.first} {this.state.last}
                </h3>
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
