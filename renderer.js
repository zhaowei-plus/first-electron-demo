// 利用 HTML5 API 发送通知
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick = () => console.log(CLICK_MESSAGE)

// getUserMedia 获取 从桌面捕获的视频和音平
console.log(navigator.mediaDevices.getUserMedia())

const { desktopCapturer, ipcRenderer, screen } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, source) => {
  navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source[0].id,
      }
    }
  }).then(stream => {
    const video = document.querySelector('video')
    video.srcObject = stream
  }).catch(error => {
    console.error('error:', error)
  })
})

// 渲染进程收到主进程截图消息后执行截图操作
ipcRenderer.on('shortcut-capture', () => {
  // 获取屏幕数量
  const displays = screen.getAllDisplays()

  // 每个屏幕都截图
  const getDesktopCapturer = displays.map((display, i) => {
    return new Promise((resolve, reject) => {
      desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: display.size,
      }, (error, sources) => {
        if (!error) {
          return resolve({
            display,
            thumbnail: sources[i].thumbnail.toDataUrl()
          })
        }
        return reject(error)
      })
    })
  })

  Promise.all(getDesktopCapturer)
    .then(sources => {
      // 把数据传递到主进程
      ipcRenderer.send('shortcut-capture', sources)
    })
    .catch(error => {
      console.error(error)
    })
})
