const { app, BrowserWindow } = require("electron");
const path = require("path");
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
//     electron: path.join(
//       __dirname,
//       "..",
//       "node_modules",
//       ".bin",
//       "electron"
//     ),
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

//ipcMain setup
const { ipcMain } = require("electron");

ipcMain.on("MESSAGE", (e, args) => {
  console.log(args);
  // e.reply("MESSAGE", "return MESSAGE here ... {}");
  e.returnValue = ["return MESSAGE from ipcMain ... {}"];
});
