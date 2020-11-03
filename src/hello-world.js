// src/hello-world.js

// in every component we have always import react from react
import React from "react";
import axios from "axios";
import Greetee from "./greetee";

// Class syntax
// class components can have "state"
// "state" is React word for "data" in Vue
// class components can do EVERYTHING a function component can do - plus more!
// "stateful" components - which means they can do logic!

export default class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Ibund",
        };
    }

    componentDidMount() {
        // it is the React equivalent of Vue's mounted
        console.log("component mounted!");
        axios
            .get("/some-url")
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(() => {
            // this.state.-first = "new name here"; -> this is not the correct way to update state
            // we have to use function below to update the State
            this.setState({
                first: "Ivana",
            });
        }, 1000);
    }

    handleClick() {
        // axios.post("/some-url").then(() => {
        console.log("clicked");
        this.setState({
            first: "Pimento",
        });
        // });
    }

    render() {
        // const { first } = this.state;
        return (
            <div>
                <p onClick={() => this.handleClick()}>Hello</p>
                <Greetee first={this.state.first} />
                {/* <p>{this.state.first}</p> */}
            </div>
        );
    }
}

// Function component
// function components CANNOT have state
// "presentational components" - they are good at just rendering stuff on screen
//  function components are also referred to as "dumb" components
// export function HelloWorld() {
// this is not HTML! It's JS that looks like HTML!
// JSX - JS that looks like HTML
// return (
// it can be <> , </> instead of div for styling reasons, then it will not render any div
//         <div>
//             <p>Hello</p>
//             <p>World</p>
//         </div>
//     );
// }
