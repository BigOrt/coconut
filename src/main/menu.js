module.exports = {
  init,
};

const { Menu } = require("electron");
const wt = require("./maintorrent.js");
const main = require("./main.js");

console.log(wt);

const template = [
  {
    label: "File",
    submenu: [
      {
        role: "quit",
      },
    ],
  },
  {
    label: "Inspect",
    submenu: [
      {
        role: "toggleDevTools",
        // label: "DeveloperTools-Main",
        // click: () => main.openDevtool()
      },
      {
        label: "DeveloperTools-Webtorrent",
        click: () => wt.openDevTool(),
      },
    ],
  },
  {
    label: "Refresh",
    submenu: [{ role: "reload" }, { role: "forceReload" }],
  },
];

function init() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
