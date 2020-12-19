const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const prettyBytes = require("pretty-bytes");
const numeral = require("numeral");
// const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    backgroundColor: "#010409",
    // backgroundColor: "white",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      worldSafeExecuteJavaScript: true,
    },
  });
  win.webContents.openDevTools();
  win.loadURL(
    "file://" + path.join(__dirname, "..", "..", "static", "index.html")
  );
}

// if (isDev) {
//   require("electron-reload")(__dirname, {
//     electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
//   });
// }

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//webtorrent function
const Webtorrent = require("webtorrent");
let client = new Webtorrent();
const startingTorrent = (e, torrentId) => {
  client.add(
    torrentId,
    { path: path.join(__dirname, "..", "..", "tmp") },
    function (torrent) {
      console.log("Torrent Status : " + torrent.ready);

      torrent.on("download", function (bytes) {
        if (pause) {
          torrent.pause();
          console.log("PAUSE --------------->");
        }
        if (resume) {
          torrent.resume();
          console.log("RESUME --------------->");
        }
        if (destroy) {
          torrent.destroy();
          console.log("Client destroy ---------->");
        }
        console.log(
          "just downloaded: " +
            prettyBytes(bytes) +
            " total downloaded: " +
            prettyBytes(torrent.downloaded) +
            " download speed: " +
            prettyBytes(torrent.downloadSpeed) + "/sec" +
            " progress: " +
            numeral(torrent.progress).format("0.00%")
        );

        e.sender.send(
          "MESSAGE",
          prettyBytes(bytes),
          prettyBytes(torrent.downloaded),
          prettyBytes(torrent.downloadSpeed),
          numeral(torrent.progress).format("0.00%")
        );
      });
    }
  );
};

let pause = false;
let resume = false;
let destroy = false;

//ipcMain
ipcMain.on("MESSAGE", (e, args, torrentId) => {
  console.log(torrentId.xt);
  destroy = false;
  startingTorrent(e, torrentId);
  e.reply("MESSAGE", true);
});

ipcMain.on("PAUSE", (e, args) => {
  if (args) {
    console.log("<-- PAUSE TRUE --!>");
    pause = true;
    resume= false;
  }
});

ipcMain.on("RESUME", (e, args) => {
  if (args) {
    console.log("<-- RESUME TRUE --!>");
    resume = true;
    pause = false;
  }
});

ipcMain.on("DESTROY", (e, args) => {
  if (args) {
    console.log("<-- DESTROY TRUE --!>");
    destroy = true;
  }
});
