import { app, BrowserWindow, nativeImage } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}


const createWindow = () => {
  // Resolve path relative to working directory
  const iconPath = path.join(process.cwd(), 'src/assets/applogo.ico');
  const appIcon = nativeImage.createFromPath(iconPath);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Always load the web portal in development and production
  mainWindow.loadURL('https://schoolgearliberia.com/login');

  // Comment out DevTools so it does not open for end users
  // mainWindow.webContents.openDevTools();

  mainWindow.setAutoHideMenuBar(true);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});