import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

// ReactDom.render is only called once per project
// you will never call ReactDOM.render again!
// ReactDOM.render takes your React code and appends it to the DOM

ReactDOM.render(elem, document.querySelector("main"));

// node .
// node bundle-server.js -> in other window, we run it once and don't need to stop it
