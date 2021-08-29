const { desktopCapturer, ipcRenderer } = require('electron')
// const { dialog } = require('electron').remote

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  // sources 就是获取到的窗口和桌面数组
  console.log('sources:', sources)

  for (const source of sources) {
    if (source.name === 'Screen 1') {
      console.log('source:', source)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        // audio: {
        //   mandatory: {
        //     chromeMediaSource: 'desktop',
        //     // chromeMediaSourceId: screen.id
        //   }
        // },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        },
      })
      previewStream(stream)
    }
  }
})

// 本地播放媒体流
function previewStream (stream) {
  console.log('previewStream:', stream)
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

document.querySelector('#selectFile').addEventListener('click', () => {
  console.log('选择文件')
  ipcRenderer.send('open-file-dialog', 'ping')
  // dialog.showOpenDialog(null, {
  //   properties: ['openFile', 'showHiddenFiles'],
  //   filters: [
  //     {
  //       name: 'text',
  //       extensions: ['html', 'js', 'json', 'md']
  //     }
  //   ]
  // }, (files) => {
  //   console.log('files:', files)
  // })
})
