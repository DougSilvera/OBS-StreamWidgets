@echo off
echo Welcome to the OBS Widgets Installer!
set /p OBS_DIR="Enter your OBS Studio installation path (e.g., C:\Program Files\obs-studio): "

echo Installing dependencies...
cd /d %~dp0
npm install

echo Copying necessary files...
xcopy /E /I /Y widgets "%OBS_DIR%\obs-widgets"
xcopy /E /I /Y settings "%OBS_DIR%\obs-widgets"
copy server.js "%OBS_DIR%\obs-widgets\server.js"
copy package.json "%OBS_DIR%\obs-widgets\package.json"

echo Creating startup script...
echo cd /d "%OBS_DIR%\obs-widgets" && start /min cmd /c "npm start" > "%OBS_DIR%\start_server.bat"

echo Installation complete!
pause
