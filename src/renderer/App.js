import React, { useState } from "react";
import { ipcMain, ipcRenderer } from "electron";
import parseTorrent from "parse-torrent";

export default function App() {
  const [text, setText] = useState("STOPING");
  const [message, setMessage] = useState([]);
  const magnetURI =
    "magnet:?xt=urn:btih:992E0FBEEAE3B458203EA00DA18CF6CB0450CF8D&dn=The+Expanse+S05E03+720p+WEB+x265&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2740%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fipv6.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.si%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Fdenis.stalker.upeer.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce";
  //function sending message to ipcmain
  const sendMessage = (args) => {
    const torrentId = parseTorrent(args);
    ipcRenderer.send("MESSAGE", "Hello from ipcRenderer", torrentId);
  };

  //listens to channel from ipcMain
  const listens = () => {
    ipcRenderer.on("MESSAGE", (e, ...args) => {
      console.log(args);
      if (args) {
        setMessage(args);
      }
    });
  };

  //resume torrent
  const resume = () => {
    ipcRenderer.send("RESUME", true);
  };

  //pause torrent
  const pause = () => {
    ipcRenderer.send("PAUSE", true);
  };

  //destroy torrent
  const destroyClient = () => {
    ipcRenderer.send("DESTROY", true);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src="./logo.svg" className="App-logo" alt="logo" />
          <p>
            infoHash:{" "}
            <code style={{ fontSize: "14px" }}>
              {magnetURI ? parseTorrent(magnetURI).infoHash : "none"}
              <br />
            </code>
            <code style={{ fontSize: "16px" }}>
              {magnetURI ? parseTorrent(magnetURI).dn : "none"}
            </code>
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text} ...
          </a>
          <p style={{ fontSize: "14px" }}>
            download:
            <code style={{ color: "#ff7b72" }}>
              {" "}
              {message ? message[1] : []}
            </code>{" "}
            speed:
            <code style={{ color: "#ff7b72" }}>
              {" "}
              {message ? message[2] : []}/sec
            </code>{" "}
            progress:{" "}
            <code style={{ color: "#ff7b72" }}>
              {" "}
              {message ? message[3] : []}
            </code>
          </p>
          <br />
          <div>
            {" "}
            <button
              onClick={() => {
                if (text === "STOPING") {
                  listens();
                  sendMessage(magnetURI);
                  setText("STARTING");
                } else {
                  setText("STOPING");
                }
              }}
            >
              {text === "STOPING" ? "Send" : "Back"}
            </button>{" "}
            <button onClick={() => pause()}>pause</button>{" "}
            <button onClick={() => resume()}>resume</button>{" "}
            <button onClick={() => destroyClient()}>destroy</button>
          </div>
        </header>
      </div>
    </>
  );
}
