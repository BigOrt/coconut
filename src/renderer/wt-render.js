const { ipcRenderer } = require("electron");


go();

function go() {
  console.log("Go ...>");
  // ipcRenderer.send("GET_METADATA", true);

  ipcRenderer.on("send_metadata_to_wt", (e, args) => {
    out_meta(args);
  });
}

function out_meta(values) {
  if (values.length > 0) {
    for (const el of values[0].values()) {
      console.log(el.name);
      console.log(el.infohash);
      console.log(el.magneturi);
      console.log(el.peer);
      console.log(el.path);
      for(const x of el.file.values()){
        console.log("name: "+x.name);
        console.log("path: "+x.path);
        console.log("size: "+x.filelength);
      }
    }
  }
}
