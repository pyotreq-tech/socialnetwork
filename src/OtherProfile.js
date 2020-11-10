import React from "react";
import axios from "./axios";
// import Profile from "./profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("other profile mounting");
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
                        id: response.data.id,
                    });
                }
            })
            .catch((err) => {
                console.log("error in obtaining individual user data: ", err);
            });
    }
    render() {
        console.log("props: ", this.props);
        return (
            <>
                <div className="section" key={this.state.id}>
                    <img src={this.state.profileimage || "/empty-image.jpg"} />

                    <h3>
                        {this.state.first} {this.state.last}
                    </h3>
                    <p>{this.state.bio}</p>
                </div>
            </>
        );
    }
}
