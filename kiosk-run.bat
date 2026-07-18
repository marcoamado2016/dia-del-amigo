@echo off
REM Forzar cierre de Chrome y abrir en modo kiosk (sin UI)
taskkill /IM chrome.exe /F >nul 2>&1
timeout /t 1 /nobreak >nul
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "http://localhost:3000/" --user-data-dir="%TEMP%\chrome-kiosk-profile"
