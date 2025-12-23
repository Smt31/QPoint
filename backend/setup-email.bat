@echo off
REM Batch script to set SMTP environment variables for Windows
REM Run this before starting your Spring Boot application

echo Setting up SMTP environment variables...
echo.
echo Please enter your Gmail credentials:
echo (You need a Gmail App Password, not your regular password)
echo Get App Password from: https://myaccount.google.com/apppasswords
echo.

set /p SMTP_USER="Enter your Gmail address (e.g., yourname@gmail.com): "
set /p SMTP_PASS="Enter your Gmail App Password (16 characters): "

set SMTP_HOST=smtp.gmail.com
set SMTP_PORT=587

echo.
echo Environment variables set!
echo.
echo SMTP_USER: %SMTP_USER%
echo SMTP_PASS: ********
echo SMTP_HOST: %SMTP_HOST%
echo SMTP_PORT: %SMTP_PORT%
echo.
echo Now start your Spring Boot application in this same window.
echo The email will work for this session only.
echo.
pause

