import { text } from "express";
import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorIsVisible: false,
        };
    }

    textareaToggle() {
        console.log("works toggle");
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
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

    submitBio() {
        console.log("about to submit!!!", this.state);
        axios
            .post("/bio", { bio: this.state.bioDraft, id: this.props.id })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        bioDraft: response.data.bio,
                    });
                    updateBioInApp();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateBioInApp() {
        this.props.updateBio("lol");
    }

    render() {
        return (
            <>
                <h1>Bio editor</h1>

                {this.state.editorIsVisible && (
                    <div>
                        <textarea
                            name="bio"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.bio && !this.state.editorIsVisible && (
                    <button onClick={() => this.textareaToggle()}>
                        Edit bio!
                    </button>
                )}
                {!this.props.bio && !this.state.editorIsVisible && (
                    <button onClick={() => this.textareaToggle()}>
                        Add bio!
                    </button>
                )}
                {this.state.editorIsVisible && (
                    <button onClick={() => this.submitBio()}>
                        Submit bio!
                    </button>
                )}
            </>
        );
    }
}
