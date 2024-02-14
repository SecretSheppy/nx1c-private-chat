@ECHO off

ECHO "NX1C PRIVATE CHAT: MAIN MENU"
ECHO "1. Start Server"
ECHO "2. Start Client"
ECHO "3. Start Server and Client"
ECHO "4. Check for updates"
ECHO "5. Exit"

SET /p choice="Option: "

IF %choice%==1 (
    CALL :start_server
    )
IF %choice%==2 (
    CALL :start_client
    )
IF %choice%==3 (
    CALL :start_client
    CALL :start_server
    )
IF %choice%==4 (
    ECHO "Checking for updates..."
    git pull
    )
IF %choice%==5 (
    ECHO "Exiting..."
    )

PAUSE
EXIT /B 0

:start_server
ECHO "Starting Server..."
node server2.js
EXIT /B 0

:start_client
ECHO "Starting Client..."
nw.exe
EXIT /B 0