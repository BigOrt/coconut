import React, { useState } from "react";
// import { ipcRenderer } from "electron";

export default function App() {
  const [text, setText] = useState("");
  const { ipcRenderer } = require("electron");
  const receiveMessage = () => {
    setText("MESSAGE_SEND");
    return ipcRenderer.sendSync("MESSAGE", ["Hello from ipcRenderer ..."]);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src="./logo.svg" className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text ? text : "INITIAL_MESSAGE"}
          </a>
          <br />
          <button
            onClick={() =>
              text === "INITIAL_MESSAGE" || text === ""
                ? console.log(receiveMessage())
                : setText("INITIAL_MESSAGE")
            }
          >
            {text === "INITIAL_MESSAGE" || text === "" ? "Send" : "Back"}
          </button>
        </header>
      </div>
    </>
  );
}
