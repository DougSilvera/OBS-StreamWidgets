@echo off
cd /d "%~dp0"

:: Start the server in the background
start /min cmd /c "node server.js"

:: Start OBS and wait for it to close
start /wait obs64.exe

:: Kill the server process when OBS closes
taskkill /F /IM node.exe
