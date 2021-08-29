const { app, BrowserWindow, Notification, ipcMain } = require('electron')

let win
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    // webPreferences 网页功能设置
    webPreferences: {
      devTools: true, // 是否开启DevTools
      nodeIntegration: true, // 是否启用 Node 环境
      contextIsolation: false,
      // preload: '', // 在页面运行其他脚本之前预先加载指定的脚本
      // webSecurity: true, // 如果为false，将禁用同源策略（通常用来测试网站，也可以用来做跨域处理）
      // webgl: true, // 是否启用webgl
      defaultFontSize: 32
    }
  })

  win.loadFile('./timer.html')
  win.webContents.openDevTools()
  handleIPC()

  // net 网络请求
  const { net } = require('electron')
  console.log('isOnline:', net.isOnline(), net.online)
  const request = net.request('https://github.com')
  request.on('response', response => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})

function handleIPC () {
  // ipcMain.handle 必须返回一个结果
  // async/await 执行完项 ipcMain.handle 返回一个结果
  ipcMain.handle('work-notification', async () => {
    let res = await new Promise((resolve, reject) => {
      // 创建通知
      const notification = new Notification({
        title: '任务结束',
        body: '是否开始休息',
        // mac 按钮无法展示，需要配置：NSUserNotificationAlertStyle
        actions: [
          {
            text: '开始休息',
            type: 'button'
          }
        ],
        closeButtonText: '继续工作'
      })
      notification.show()
      notification.on('action', () => {
        // 按钮点击事件
        resolve('rest')
      })
      notification.on('close', () => {
        // 关闭事件
        resolve('work')
      })
    })
    return res
  })
}
