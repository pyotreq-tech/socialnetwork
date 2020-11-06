import React, { Component } from "react";

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

    render() {
        return (
            <>
                <h1>Bio editor</h1>
                {this.state.editorIsVisible && (
                    <div>
                        <textarea />
                    </div>
                )}
                <button onClick={() => this.textareaToggle()}>Click me!</button>
            </>
        );
    }
}
