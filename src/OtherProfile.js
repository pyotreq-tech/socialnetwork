import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";
import WallPosts from "./WallPosts";

// import Profile from "./profile";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isFriend = this.isFriend.bind(this);
    }

    isFriend(message) {
        this.setState({ message: message });
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
                <div
                    className="section"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    key={this.state.id}
                >
                    <img
                        src={this.state.profileimage || "/empty-image.jpg"}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/empty-image.jpg";
                        }}
                        style={{
                            border: "4px teal solid",
                            borderRadius: "50%",
                        }}
                    />

                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                    <FriendButton
                        id={this.state.id}
                        key={this.state.id}
                        isFriend={this.isFriend}
                    />
                    {this.state.bio && (
                        <div className="content" style={{ padding: "5px" }}>
                            {this.state.bio}
                        </div>
                    )}
                </div>

                {this.state.message == "End Friendship" && (
                    <WallPosts id={this.state.id} first={this.state.first} />
                )}
            </>
        );
    }
}
