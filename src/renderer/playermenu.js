import videojs from 'video.js'

export function anotationMenu() {
  const SettingOnOffItem = videojs.getComponent('SettingOnOffItem')

  class ToggleAnnotation extends SettingOnOffItem {
    constructor(player, options) {
      super(player, {
        ...options, // you must assgin the options
        name: 'ToggleAnnotation', // component name, optional
        label: 'Annotation',
        icon: 'vjs-icon-circle' // videojs icon classname, optional, for small screen
      })

      this.addClass('vjs-setting-annotation')

      // enable by default
      this.update(true)
    }

    update(active) {
      super.update(active)

      // console.log(this.active)
    }
  }

  videojs
    .getComponent('SettingMenuButton')
    .prototype.options_.entries.splice(0, 0, 'ToggleAnnotation')
  videojs.registerComponent('ToggleAnnotation', ToggleAnnotation)
}

export function SubtitlesMenu() {
  const SettingCaptionItem = videojs.getComponent('SettingCaptionItem')

  class SubtitleMenuItem extends SettingCaptionItem {
    constructor(player, options) {
      super(player, {
        ...options, // you must assgin the options
        name: 'SubtitleMenuItem', // component name, optionsal
        label: 'Subtitles',
        icon: 'vjs-icon-subtitles', // videojs icon classname, optional, for small screen
        entries: [
          {
            default: true,
            kind: 'subtitles',
            scrlang: 'eng',
            label: 'english',
            src:
              'E:/VSProject/coconut/tmp/73c53390711ee8e70ff09f0431662893fcb4d142//The.Expanse.S05E04.WEBRip.x264-ION10/The.Expanse.S05E04.WEBRip.x264-ION10.vtt'
          }
        ]
      })

      this.addClass('vjs-setting-subtitles')
    }

    onChange(...args) {
      super.onChange(...args)
      console.log(this.selected)
    }
  }

  videojs
    .getComponent('SettingMenuButton')
    .prototype.options_.entries.push('SubtitleMenuItem')
  videojs.registerComponent('SubtitleMenuItem', SubtitleMenuItem)
}
