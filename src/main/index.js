const wt = require("./maintorrent.js");
const main = require("./main.js");
const parallel = require("run-parallel");
const ipc = require("./ipcmain");
const menu = require("./menu");
const { app } = require("electron");

init();

function init() {
  parallel(
    {
      appRun: (cb) => app.on("ready", () => cb(null, "Running ---->")),
    },
    ready
  );

  function ready(err, result) {
    if (result) {
      console.log("Parallel: " + result.appRun);
      main.init();
      wt.init();
      menu.init();
      // wt.win.webContents.send("MESSAGE", "HELLO");
    } else {
      console.log(err);
    }
  }
}

ipc.init();
