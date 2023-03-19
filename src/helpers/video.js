import Hls from 'hls.js/dist/hls.min'

export const videoHlsLoad = (videoSelector, src) => {
  if (videoSelector.canPlayType('application/vnd.apple.mpegurl')) {
    videoSelector.src = src
  } else if (Hls.isSupported()) {
    let hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(videoSelector)
  }
}
export const setPlaybackRate = (selector, side = 1) => {
  if (selector) {
    if (side > 0) {
      selector.playbackRate += 0.5
    } else if (side < 0) {
      selector.playbackRate -= 0.5
    }
  } else return
}
