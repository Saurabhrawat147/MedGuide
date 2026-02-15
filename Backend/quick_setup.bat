@echo off
echo ========================================
echo MedGuide MySQL Quick Setup
echo ========================================
echo.

set /p MYSQL_PASSWORD="Enter your MySQL root password: "

echo.
echo Creating database...
mysql -u root -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS medguide_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %ERRORLEVEL% EQU 0 (
    echo Database created successfully!
    echo.
    echo Updating Django settings...
    
    echo Now running migrations...
    call venv\Scripts\activate
    python manage.py makemigrations
    python manage.py migrate
    
    echo.
    echo ========================================
    echo Setup Complete!
    echo ========================================
    echo.
    echo To start the server, run:
    echo   venv\Scripts\activate
    echo   python manage.py runserver
    echo.
) else (
    echo.
    echo Failed to create database.
    echo Please check your MySQL password and try again.
)

pause
