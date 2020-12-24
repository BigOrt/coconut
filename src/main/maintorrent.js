const MainTorrent = (module.exports = {
  openDevTool,
  init,
  send,
  show,
  win: null,
});

const { BrowserWindow, Main } = require("electron");
const path = require("path");

function init() {
  const win = (MainTorrent.win = new BrowserWindow({
    backgroundColor: "#282c34",
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 150,
    width: 150,
    show: false,
    skipTaskbar: false,
    title: "webtorrent-proccess",
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  }));

  win.loadURL(
    "file://" + path.join(__dirname, "..", "..", "static", "indexTorrent.html")
  );
}

//show app
function show() {
  if (!MainTorrent.win) return MainTorrent.win.show();
}

//function send
function send(name, ...args) {
  MainTorrent.win.webContents.send(name, args);
}
//close app

//opendevtool
function openDevTool() {
  MainTorrent.win.webContents.openDevTools({ mode: "detach" });
}
