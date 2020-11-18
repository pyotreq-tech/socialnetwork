import React, { Component } from "react";
import { $CombinedState } from "redux";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorIsVisible: false,
        };
    }

    // now check how to make it so the textarea is prepopulated

    textareaToggle(e) {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
            bioDraft: this.props.bio,
        });
    }

    handleChange(e) {
        console.log("bioDraft: ", this.state.bioDraft);
        this.setState(
            {
                bioDraft: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    updateBioInApp(arg) {
        console.log("console.log in updateBio", arg);
        this.props.updateBio(arg);
    }

    submitBio() {
        console.log("about to submit!!!", this.state);
        axios
            .post("/bio", { bio: this.state.bioDraft, id: this.props.id })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    bioDraft: response.data.bio,
                });
                this.updateBioInApp(response.data.bio);
                this.textareaToggle();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <>
                {this.state.editorIsVisible && (
                    <div>
                        <textarea
                            id="textarea"
                            name="bio"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.bioDraft}
                            className={"bio-textarea"}
                        />
                    </div>
                )}
                {this.props.bio && !this.state.editorIsVisible && (
                    <button
                        onClick={() => this.textareaToggle()}
                        className="input-registration"
                        style={{
                            fontSize: "0.8rem",
                            border: "none",
                            backgroundColor: "teal",
                            color: "white",
                            width: "120px",
                            height: "20px",
                            margin: "0",
                            backgroundImage:
                                "linear-gradient(to top, teal, lightsteelblue)",
                        }}
                    >
                        Edit bio!
                    </button>
                )}
                {!this.props.bio && !this.state.editorIsVisible && (
                    <button
                        onClick={() => this.textareaToggle()}
                        className="input-registration"
                        style={{
                            backgroundColor: "teal",
                            color: "white",
                            width: "130px",
                            margin: "10px auto",
                        }}
                    >
                        Add bio!
                    </button>
                )}
                {this.state.editorIsVisible && (
                    <button
                        onClick={() => this.submitBio()}
                        className="input-registration"
                        style={{
                            backgroundColor: "teal",
                            color: "white",
                            width: "130px",
                            margin: "10px auto",
                        }}
                    >
                        Submit bio!
                    </button>
                )}
            </>
        );
    }
}
