import React, { useState } from 'react'
import { ipcRenderer, remote } from 'electron'
import parseTorrent from 'parse-torrent'
import Player from './player'
// import ReactPlayer from 'react-player'

const wt = remote.require('./src/main/maintorrent.js')

export default function App() {
  const [text, setText] = useState('STOPING')
  const [message, setMessage] = useState([])
  const [buffer, setBuffer] = useState([])
  console.log('torrent-progress: ' + message)

  const magnetURI =
    'magnet:?xt=urn:btih:7E7CD8568652E5BBB6C8CE4E8783D3ED3306E586&dn=His+Dark+Materials+S02E07+720p+HDTV+x265&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2730%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fipv6.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.si%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Fdenis.stalker.upeer.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce'

  // IPC-RENDERER
  // function sending message to ipcmain
  const sendMessage = args => {
    const torrentId = parseTorrent(args)
    ipcRenderer.send('MESSAGE', 'Hello from ipcRenderer', torrentId)
  }

  // listens to channel from ipcMain
  const listens = () => {
    ipcRenderer.on('MESSAGE', (e, ...args) => {
      if (args.length > 0) {
        let oldargs = ''
        if (args[0] !== oldargs) {
          setMessage(args)
        } else {
          oldargs = args[0]
        }
      }
    })
  }

  const metadata = () => {
    ipcRenderer.on('send_metadata', (e, args) => {
      if (args.length > 0) {
        wt.send('send_metadata_to_wt', args)
      }
    })
  }

  // resume torrent
  const resume = () => {
    ipcRenderer.send('RESUME', true)
  }

  // pause torrent
  const pause = () => {
    ipcRenderer.send('PAUSE', true)
  }

  // destroy torrent
  const destroyClient = () => {
    ipcRenderer.send('DESTROY', true)
  }

  // stream file
  const streamTorrent = () => {
    ipcRenderer.on('STREAM_FILE', (e, args) => {
      if (args) {
        setBuffer(args)
      }
    })
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="./logo.svg" className="App-logo" alt="logo" />
        <p>
          infoHash:{' '}
          <code style={{ fontSize: '14px' }}>
            {magnetURI ? parseTorrent(magnetURI).infoHash : 'none'}
            <br />
          </code>
          <code style={{ fontSize: '16px' }}>
            {magnetURI ? parseTorrent(magnetURI).dn : 'none'}
          </code>
        </p>

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer">
          {text}{' '}
          <code style={{ color: '#ff7b72', fontSize: '14px' }}>
            {' '}{message ? message[0] : []}
          </code>
        </a>
        <br />
        <div>
          {' '}<button
            onClick={() => {
              if (text === 'STOPING') {
                listens()
                streamTorrent()
                metadata()
                sendMessage(magnetURI)
                setText('STARTING')
              } else {
                setText('STOPING')
              }
            }}>
            {text === 'STOPING' ? 'Send' : 'Back'}
          </button>{' '}
          <button onClick={() => pause()}>Pause</button>{' '}
          <button onClick={() => resume()}>Resume</button>{' '}
          <button onClick={() => destroyClient()}>Stop</button>{' '}
          <button
            onClick={() => {
              wt.openDevTool()
            }}>
            Torrent Info
          </button>{' '}
        </div>
        <br />
      </header> */}
      {/* <ReactPlayer
        playing
        controls
        url="E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.mp4"
        width="95%"
        height="95%"
        config={{
          file: {
            tracks: [
              {
                kind: 'subtitles',
                src:
                  'E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.vtt',
                srcLang: 'en',
                default: true
              }
            ]
          }
        }}
      /> */}
      <Player
        options={{
          sources: [
            {
              src:
                'E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.mp4',
              type: 'video/webm'
            }
          ]
        }}>
        <track
          kind="subtitles"
          src="E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.vtt"
          srcLang="en"
          label="English"
          default
        />
        <track
          kind="subtitles"
          src="E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.vtt"
          srcLang="en"
          label="English2"
        />
      </Player>
    </div>
  )
}
