import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props: ", this.props);
    }

    methodInUploader() {
        this.props.methodInApp(this.state.url);
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.files[0],
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    submit() {
        console.log("about to submit!!!", this.state);
        var formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("id", this.props.id);
        console.log("formData: ", formData);

        axios
            .post("/images", formData)
            .then((response) => {
                console.log(response);
                if (response.data.profileimage) {
                    //then we want to redirect the user to our social network
                    console.log(response.data.profileimage);
                    this.setState({
                        url: response.data.profileimage,
                    });
                    this.methodInUploader();
                } else {
                    console.log("error");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <>
                <h1>Uploader</h1>
                <img
                    src={this.props.profileImage || "/empty-image.jpg"}
                    alt={this.props.first + " " + this.props.last}
                />

                <input
                    name="file"
                    type="file"
                    placeholder="file..."
                    onChange={(e) => this.handleChange(e)}
                    className="input-registration"
                ></input>
                <button
                    style={{
                        backgroundColor: "teal",
                        color: "white",
                    }}
                    className="input-registration"
                    onClick={() => this.submit()}
                >
                    Upload
                </button>
            </>
        );
    }
}
