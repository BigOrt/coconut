"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = App;

var _react = _interopRequireWildcard(require("react"));

var _electron = require("electron");

var _parseTorrent = _interopRequireDefault(require("parse-torrent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function App() {
  var _useState = (0, _react.useState)("STOPING"),
      _useState2 = _slicedToArray(_useState, 2),
      text = _useState2[0],
      setText = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      message = _useState4[0],
      setMessage = _useState4[1];

  var magnetURI = "magnet:?xt=urn:btih:992E0FBEEAE3B458203EA00DA18CF6CB0450CF8D&dn=The+Expanse+S05E03+720p+WEB+x265&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2740%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fipv6.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.si%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Fdenis.stalker.upeer.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce"; //function sending message to ipcmain

  var sendMessage = function sendMessage(args) {
    var torrentId = (0, _parseTorrent["default"])(args);

    _electron.ipcRenderer.send("MESSAGE", "Hello from ipcRenderer", torrentId);
  }; //listens to channel from ipcMain


  var listens = function listens() {
    _electron.ipcRenderer.on("MESSAGE", function (e) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      console.log(args);

      if (args) {
        setMessage(args);
      }
    });
  }; //resume torrent


  var resume = function resume() {
    _electron.ipcRenderer.send("RESUME", true);
  }; //pause torrent


  var pause = function pause() {
    _electron.ipcRenderer.send("PAUSE", true);
  }; //destroy torrent


  var destroyClient = function destroyClient() {
    _electron.ipcRenderer.send("DESTROY", true);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react["default"].createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "./logo.svg",
    className: "App-logo",
    alt: "logo"
  }), /*#__PURE__*/_react["default"].createElement("p", null, "infoHash:", " ", /*#__PURE__*/_react["default"].createElement("code", {
    style: {
      fontSize: "14px"
    }
  }, magnetURI ? (0, _parseTorrent["default"])(magnetURI).infoHash : "none", /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("code", {
    style: {
      fontSize: "16px"
    }
  }, magnetURI ? (0, _parseTorrent["default"])(magnetURI).dn : "none")), /*#__PURE__*/_react["default"].createElement("a", {
    className: "App-link",
    href: "https://reactjs.org",
    target: "_blank",
    rel: "noopener noreferrer"
  }, text, " ..."), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: "14px"
    }
  }, "download:", /*#__PURE__*/_react["default"].createElement("code", {
    style: {
      color: "#ff7b72"
    }
  }, " ", message ? message[1] : []), " ", "speed:", /*#__PURE__*/_react["default"].createElement("code", {
    style: {
      color: "#ff7b72"
    }
  }, " ", message ? message[2] : [], "/sec"), " ", "progress:", " ", /*#__PURE__*/_react["default"].createElement("code", {
    style: {
      color: "#ff7b72"
    }
  }, " ", message ? message[3] : [])), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, " ", /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      if (text === "STOPING") {
        listens();
        sendMessage(magnetURI);
        setText("STARTING");
      } else {
        setText("STOPING");
      }
    }
  }, text === "STOPING" ? "Send" : "Back"), " ", /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return pause();
    }
  }, "pause"), " ", /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return resume();
    }
  }, "resume"), " ", /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return destroyClient();
    }
  }, "destroy")))));
}