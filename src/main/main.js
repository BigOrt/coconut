const Main = (module.exports = {
  openDevtool,
  init,
  win: null,
});

const { app, BrowserWindow } = require("electron");
const path = require("path");
// const isDev = !app.isPackaged;

function init() {
  const win = (Main.win = new BrowserWindow({
    backgroundColor: "#010409",
    // backgroundColor: "white",
    width: 400,
    height: 500,
    title: "coconut",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
    },
  }));
  // win.webContents.openDevTools();
  win.loadURL(
    "file://" + path.join(__dirname, "..", "..", "static", "index.html")
  );

  win.on("close", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

function openDevtool() {
  if (!Main.win) {
    return Main.win.webContents.openDevTools({ mode: "detach" });
  }
}

// //function maintorrent close
// function closeWt (window){
//   return window.hide();
// }

// if (isDev) {
//   require("electron-reload")(__dirname, {
//     electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
//   });
// }
