// app 用于控制应用生命周期
const { app, globalShortcut, clipboard, nativeImage, BrowserWindow, Notification, ipcMain, dialog } = require('electron')

const path = require('path')
const os = require('os')

// 参考：https://www.jb51.net/article/148537.htm

//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);

function makeSingleInstance (mainWindow) {
  if (process.mas) {
    return
  }
  app.requestSingleInstanceLock()
  app.on('second-instance', () => {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  })
}

let captureWindow = null
const createCaptureScreen = (e, args) => {
  if (captureWindow) {
    return
  }

  const { screen } = require('electron')
  const { width, height } = screen.getPrimaryDisplay().bounds

  // 窗口需要覆盖全屏，并完全置顶
  captureWindow = new BrowserWindow({
    // window 使用 fullscreen, mac 设置为 undefined, 不可为 false
    fullscreen: os.platform() === 'win32' || undefined,
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    autoHideMenuBar: true,
    movable: false,
    resizable: false,
    enableLargerThanScreen: true, // mac
    hasShadow: false,
  })
  captureWindow.setAlwaysOnTop(true, 'screen-saver')
  captureWindow.setVisibleOnAllWorkspaces(true)
  captureWindow.setFullScreenable(false)
  captureWindow.loadFile('capture.html')
  captureWindow.on('close', () => {
    captureWindow = null
  })
}

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#2e2c29',
    // 预加载配置
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 标识渲染进程（Renderer Process）的HTML文件
  // mainWindow.loadFile('render/dist/index.html')
  // mainWindow.loadFile('switchhost.html')
  // mainWindow.loadURL('http://local.baas.uban360.net:8080/')
  // mainWindow.loadURL('https://juejin.cn')
  mainWindow.loadFile('desktop.html')

  const session = mainWindow.webContents.session
  console.log('session:', session)

  mainWindow.webContents.openDevTools()

  // 单例窗口
  makeSingleInstance(mainWindow)

  // 注册全局快捷键
  globalShortcut.register('cmd+shift+a', () => {
    showNotification('快捷键', 'cmd+shift+a')
    mainWindow.webContents.send('shortcut-capture')
  })
  globalShortcut.register('esc', () => {
    showNotification('快捷键', 'esc')
    if (captureWindow) {
      captureWindow.close()
      captureWindow = null
    }
  })

  // 抓取屏幕后显示窗口
  ipcMain.on('capture-screen', () => {
    showNotification('截图截图', '收到截图消息')
  })

  // 接收渲染进程的消息
  ipcMain.on('min', () => {
    mainWindow.minimize()
  })

  ipcMain.on('max', () => {
    mainWindow.maximize()
  })

  ipcMain.on('login', () => {
    mainWindow.maximize()
  })




  // if (debug) {
  //   mainWindow.webContents.openDevTools()
  //   install()
  // }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function showNotification (title, body) {
  // title, body, actions: [{ text, type }]
  new Notification({ title, body }).show()
}

app.whenReady().then(function() {
  //每次启动程序，就检查更新
  checkUpdate()

  // 初始化窗口
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).then(() => {
  showNotification('Basic Notification', 'Notification from the Main process')
})

// 关闭所有窗口时推出应用
// 在 Window和Linux上，关闭所有窗口通常会完全退出一个应用程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // 检测不是在 MacOS（darwin）上时，退出应用程序
    app.quit()
  }
})

/**************** 检测更新 ********************/
const { autoUpdater } = require('electron-updater')

function checkUpdate () {
  // 当配置 app 服务器后
  // if (process.platform === 'darwin') {
  //   autoUpdater.setFeedURL('http://127.0.0.1:9005/darwin') // 设置要检测更新的路径
  // } else {
  //   autoUpdater.setFeedURL('http://127.0.0.1:9005/win32')
  // }

  // 检测更新
  autoUpdater.checkForUpdates()

  // 监听 error 事件
  autoUpdater.on('error', error => {
    console.error(error)
  })

  // 监听 update-available 事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    console.log('found new version')
  })

  // 默认会自动下载新版本，如果不想自动下载，设置 autoUpdater.auto
  autoUpdater.autoDownload = false

  // 监听 update-downloaded 事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用更新',
      message: '发现新版本，是否更新？',
      buttons: ['是', '否'],
    }).then(buttonIndex => {
      if (buttonIndex.response === 0) {
        // 选择是，则退出程序，安装新版本
        autoUpdater.quitAndInstall()
        app.quit()
      }
    })
  })
}

ipcMain.on('open-file-dialog', (event, args) => {
  console.log('open-file-dialog:', event, args)
  dialog.showMessageBox({
    title: '帮助',
    message: '你愿意打赏给苏南大叔多少钱？',
    buttons: ['五块钱', '十块钱', '一百块钱'],
    type: 'error', // 'info',
    cancelId: 2,
  }, (buttonIndex) => {
    console.log('buttonIndex:', buttonIndex)
  })
})
