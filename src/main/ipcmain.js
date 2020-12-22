module.exports = {
  init,
};

const { ipcMain } = require("electron");
const prettyBytes = require("pretty-bytes");
const numeral = require("numeral");
const path = require("path");

//webtorrent function
const Webtorrent = require("webtorrent");
const client = new Webtorrent();
//starting torrent
const startingTorrent = (e, torrentId) => {
  client.add(
    torrentId,
    { path: path.join(__dirname, "..", "..", "tmp", torrentId.infoHash) },
    function (torrent) {
      console.log("Torrent Ready : " + torrent.ready);
      console.log("Infohas: " + torrent.infoHash);
      console.log("Peer: " + torrent.numPeers);
      console.log("Downloading --------------------->");

      //getfile path
      // function targetFile(torrent) {
      //   const path = torrent.files.map((file) => file.path);
      //   const pathName = torrent.files.map((file) => file.name);
      //   return [{ path: path, filename: pathName }];
      // }

      //buffer
      // torrent.files.find((file) =>
      //   file.getBuffer((err, buffer) => {
      //     if (err) {
      //       throw err;
      //     }
      //     console.log(buffer);

      //     e.sender.send("STREAM_FILE", buffer);
      //   })
      // );
      // e.sender.send("STREAM_FILE", targetFile(torrent));

      //selectfiletodownload
      // const sizefile = torrent.files.find((file) => console.log(prettyBytes(file.length)));

      //emit torrent download
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
          e.sender.send(
            "MESSAGE",
            "Client destroy ---------->",
            "Download Stop ---------->"
          );
        }
        console.log(numeral(torrent.progress).format("0.00%"));

        e.sender.send(
          "MESSAGE",
          // prettyBytes(torrent.downloaded),
          numeral(torrent.progress).format("0%")
        );
      });

      torrent.on("done", () => {
        console.log("Torrent finished downloading ----->");
      });
    }
  );
};

let pause = false;
let resume = false;
let destroy = false;

function init() {
  //ipcMain
  ipcMain.on("MESSAGE", (e, args, torrentId) => {
    console.log(torrentId.infoHash);
    destroy = false;
    startingTorrent(e, torrentId);
  });

  ipcMain.on("PAUSE", (e, args) => {
    if (args) {
      console.log("<-- PAUSE TRUE --!>");
      pause = true;
      resume = false;
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

  ipcMain.on("STREAM_FILE", (e, args) => {
    console.log(args);
  });
}
