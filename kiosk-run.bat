@echo off
REM Forzar cierre de Chrome y abrir en pantalla extendida
REM Ajusta el valor de WINDOW_X según la posición horizontal de tu monitor secundario.
set WINDOW_X=1920

taskkill /IM chrome.exe /F >nul 2>&1
timeout /t 1 /nobreak >nul
"C:\Program Files\Google\Chrome\Application\chrome.exe" --new-window --window-position=%WINDOW_X%,0 --window-size=1920,1080 --start-fullscreen "http://localhost:3000/" --user-data-dir="%TEMP%\chrome-kiosk-profile"
