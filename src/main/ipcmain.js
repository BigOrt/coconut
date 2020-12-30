module.exports = {
  init
}

const { ipcMain, ipcRenderer } = require('electron')
const prettyBytes = require('pretty-bytes')
const numeral = require('numeral')
const path = require('path')
const Webtorrent = require('webtorrent')
const client = new Webtorrent()
const wt = require('./maintorrent.js')

let pause = false
let resume = false
let destroy = false

// webtorrent

// add torrent
function addtorrent (e, torrentId) {
  client.add(
    torrentId,
    { path: path.join(__dirname, '..', '..', 'tmp', torrentId.infoHash) },
    function (torrent) {
      console.log('Torrent Ready : ' + torrent.ready)
      console.log('Infohas: ' + torrent.infoHash)
      console.log('Peer: ' + torrent.numPeers)
      console.log('Downloading --->')
      getmetadata(e, torrent)
      const server = torrent.createServer()
      try {
        const host = 'localhost'
        const port = 5000
        server.listen(port, host, () =>
          console.log('server: http://' + host + ':' + port)
        )
      } catch (error) {
        console.log(error)
      }

      // emit torrent download
      torrent.on('download', function (bytes) {
        if (pause) {
          torrent.pause()
          console.log('PAUSE --->')
        }
        if (resume) {
          torrent.resume()
          console.log('RESUME --->')
        }
        if (destroy) {
          torrent.destroy()
          console.log('connection killed!')
          e.sender.send('MESSAGE', 'Download Stop --->')
        }

        console.log(numeral(torrent.progress).format('0.0%'))

        e.sender.send('MESSAGE', numeral(torrent.progress).format('0%'))
      })

      torrent.on('done', () => {
        // client.destroy();
        server.close()
        console.log('Torrent finished downloading --->')
        console.log('server closed..>')
      })
    }
  )
}
// starting torrent
const startingTorrent = (e, torrentId) => {
  addtorrent(e, torrentId)
}

// get metadata torrent
function getmetadata (e, torrent) {
  if (torrent) {
    const meta = [
      {
        name: torrent.name,
        magneturi: torrent.magnetURI,
        infohash: torrent.infoHash,
        peer: torrent.numPeers,
        path: torrent.path,
        file: torrent.files.map((file) => {
          return {
            name: file.name,
            filelength: prettyBytes(file.length),
            path: file.path
          }
        })
      }
    ]

    e.sender.send('send_metadata', meta)
  }
}

function init () {
  // ipcMain
  ipcMain.on('MESSAGE', (e, args, torrentId) => {
    destroy = false
    startingTorrent(e, torrentId)
  })

  ipcMain.on('PAUSE', (e, args) => {
    if (args) {
      console.log('<-- PAUSE TRUE --!>')
      pause = true
      resume = false
    }
  })

  ipcMain.on('RESUME', (e, args) => {
    if (args) {
      console.log('<-- RESUME TRUE --!>')
      resume = true
      pause = false
    }
  })

  ipcMain.on('DESTROY', (e, args) => {
    if (args) {
      console.log('<-- Kill all connection --!>')
      destroy = true
    }
  })

  ipcMain.on('STREAM_FILE', (e, args) => {
    console.log(args)
  })

  ipcMain.on('send_metadata_to_main', (e, args) => {
    console.log(args)
    e.sender.send('get_metadata', args)
  })
}
