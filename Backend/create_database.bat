@echo off
echo Creating MySQL database for MedGuide...
echo.
echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p < setup_mysql.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Database created successfully!
    echo.
    echo Next steps:
    echo 1. Update your MySQL password in medguide/settings.py
    echo 2. Run: python manage.py migrate
) else (
    echo.
    echo Failed to create database. Please check your MySQL credentials.
)

pause
