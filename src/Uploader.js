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
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsText(e.target.files[0]);
            this.setState({
                [e.target.name]: e.target.files[0],
            });
        })
            .then((res) => {
                console.log("result of my promise: ", res);
                this.setState({ url: res });
            })
            .catch((err) => {
                console.log(err);
            });
        // reader.onload = function () {
        //     var dataURL = reader.result;
        //     console.log(dataURL);
        // };
        // reader.readAsDataURL(e.target.files[0]);
        // this.setState({
        //     [e.target.name]: e.target.files[0],
        //     // url: output.src,
        // });
        // reader.onload = function () {
        //     var dataURL = reader.result;
        //     var output = document.getElementById("output");
        //     output.src = dataURL;
        //     console.log("cos tam", output.src);
        // };
        // reader.readAsDataURL(e.target.files[0], (err, res) => {
        //     console.log("odpowiedz z funkcji:", res);
        // });
        // this.setState({
        //     [e.target.name]: e.target.files[0],
        //     url: output.src,
        // });
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
            <div className="section">
                <h1>Uploader</h1>
                <img
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
                        backgroundColor: "teal",
                        color: "white",
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
