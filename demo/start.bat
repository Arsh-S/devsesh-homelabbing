@echo off
echo ===================================
echo   AdGuard Home - Quick Start
echo ===================================
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Docker is not installed.
    echo.
    echo Install Docker Desktop from:
    echo   https://docs.docker.com/desktop/install/windows-install/
    echo.
    echo After installing, open Docker Desktop and wait for it to start,
    echo then run this script again.
    pause
    exit /b 1
)

REM Check if Docker daemon is running
docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo Docker Desktop is not running.
    echo Please open Docker Desktop and wait for it to start,
    echo then run this script again.
    pause
    exit /b 1
)

echo Docker is ready.
echo.

REM Check if port 53 is in use
netstat -an | findstr ":53 " >nul 2>nul
if %errorlevel% equ 0 (
    echo Warning: Port 53 may already be in use.
    echo.
    echo On Windows, this can be the DNS Client service.
    echo To free port 53, open an admin Command Prompt and run:
    echo   net stop dnscache
    echo.
    echo To re-enable it later:
    echo   net start dnscache
    echo.
    set /p REPLY="Try starting anyway? (y/n) "
    if /i not "%REPLY%"=="y" exit /b 1
)

REM Start AdGuard Home
echo Starting AdGuard Home...
docker compose up -d

echo.
echo ===================================
echo   AdGuard Home is running!
echo ===================================
echo.
echo 1. Open the setup wizard:
echo    http://localhost:3000
echo.
echo 2. After setup, the dashboard moves to:
echo    http://localhost:80
echo.
echo 3. To use it as your DNS:
echo    Settings ^> Network ^& Internet ^> Wi-Fi ^> Hardware properties
echo    Click "Edit" next to DNS server assignment
echo    Set to Manual, enable IPv4, set DNS to: 127.0.0.1
echo.
echo To stop:  docker compose down
echo To logs:  docker compose logs -f
echo.
pause
