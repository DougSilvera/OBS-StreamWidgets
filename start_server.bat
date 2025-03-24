@echo off
cd /d "%~dp0"
start /min cmd /c "npm install && npm start"
exit
