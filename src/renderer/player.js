import React, { useEffect, useRef } from 'react'
import { anotationMenu, subtitlesMenu } from './playermenu'
import videojs from 'video.js'
import 'videojs-plus'

const defaultOptions = {
  autoplay: false,
  muted: true,
  aspectRatio: '16:9',
  mobileView: false
}

const subtitles = [
  {
    default: true,
    kind: 'subtitles',
    scrlang: 'eng',
    label: 'english',
    src:
      'E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.vtt'
  }
]

const Player = ({ options, children }) => {
  const playerRef = useRef(null)

  useEffect(
    () => {
      if (playerRef.current) {
        const videoEl = playerRef.current.querySelector('video')

        // anotationMenu()
        // subtitlesMenu()

        const player = videojs(videoEl, {
          ...defaultOptions,
          ...options
        })

        // console.log(player.findChild('SettingMenu')[0])

        // const playerEl = player.el();
        // const flag = player.getChild("PlayToggleLayer").el();

        // for (const child of playerRef.current.children) {
        //   if (child !== playerEl) playerEl.insertBefore(child, flag);
        // }

        // for debug purpose
        window.player = player

        return () => {
          player.dispose()
        }
      }
    },
    [options]
  )

  return (
    <div className="player" ref={playerRef}>
      <video>
        {children}
      </video>
    </div>
  )
}

export default Player
