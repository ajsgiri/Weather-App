import React from "react";
import ReactDOM from "react-dom";
import Example2 from "./Example2";
import Example1 from "./Example1";
import './style.css';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="App">
                <Example1 />
                <Example2 />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);