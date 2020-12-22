const MainTorrent = (module.exports = {
  openDevTool,
  init,
  win: null,
});

const { BrowserWindow } = require("electron");
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

  // Prevent killing the WebTorrent process
  // win.on("close", function (e) {
  //   if (app.isQuitting) {
  //     return;
  //   }
  //   e.preventDefault();
  //   win.hide();
  // });
}

//show app
function show() {
  if (!MainTorrent.win) return MainTorrent.win.show();
}

//function send
function send(...args) {
  if (!MainTorrent.win) return MainTorrent.win.send(...args);
}
//close app

//opendevtool
function openDevTool() {
  if (!MainTorrent.win) return;
  MainTorrent.win.webContents.openDevTools({ mode: "detach" });
}
