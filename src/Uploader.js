import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            url: props.profileImage,
        };
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props: ", this.props);
    }

    methodInUploader() {
        this.props.methodInApp(this.state.url);
    }

    handleChange(e) {
        var reader = new FileReader();

        reader.onload = function () {
            var dataURL = reader.result;
            var output = document.getElementById("output");
            output.src = dataURL;
        };

        reader.readAsDataURL(e.target.files[0]);

        this.setState({
            [e.target.name]: e.target.files[0],
        });
    }

    submit() {
        console.log("about to submit!!!", this.state);
        var formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("id", this.props.id);
        console.log("file: ", this.state.file);
        console.log("id: ", this.props.id);
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
            <div
                className="section"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>Change Profile Picture</h1>
                <img
                    id="output"
                    className={"uploader-logo"}
                    src={this.state.url || "/empty-image.jpg"}
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
                        // marginTop: "5px",
                        fontSize: "0.8rem",
                        border: "none",
                        backgroundColor: "teal",
                        color: "white",
                        width: "120px",
                        height: "20px",
                        margin: "0",
                        marginTop: "15px",
                        backgroundImage:
                            "linear-gradient(to top, teal, lightsteelblue)",
                    }}
                    className="input-registration"
                    onClick={() => this.submit()}
                >
                    Upload
                </button>
            </div>
        );
    }
}
