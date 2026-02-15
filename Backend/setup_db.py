#!/usr/bin/env python
"""Interactive MySQL database setup for MedGuide"""
import subprocess
import sys
import getpass

def run_command(command, shell=True):
    """Run a shell command and return success status"""
    try:
        result = subprocess.run(command, shell=shell, check=True, capture_output=True, text=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def main():
    print("=" * 50)
    print("MedGuide MySQL Database Setup")
    print("=" * 50)
    print()
    
    # Get MySQL credentials
    mysql_user = input("MySQL username [root]: ").strip() or "root"
    mysql_password = getpass.getpass("MySQL password: ")
    
    if not mysql_password:
        print("Error: Password cannot be empty")
        sys.exit(1)
    
    print("\n1. Creating database...")
    create_db_cmd = f'mysql -u {mysql_user} -p{mysql_password} -e "CREATE DATABASE IF NOT EXISTS medguide_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'
    success, output = run_command(create_db_cmd)
    
    if success:
        print("✓ Database created successfully!")
    else:
        print(f"✗ Failed to create database: {output}")
        sys.exit(1)
    
    print("\n2. Updating settings.py with your password...")
    try:
        with open('medguide/settings.py', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update password in settings
        content = content.replace("'PASSWORD': '',", f"'PASSWORD': '{mysql_password}',")
        
        with open('medguide/settings.py', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✓ Settings updated!")
    except Exception as e:
        print(f"✗ Failed to update settings: {e}")
        print("Please manually update the PASSWORD in medguide/settings.py")
    
    print("\n3. Running migrations...")
    success, output = run_command("python manage.py makemigrations")
    if success:
        print("✓ Migrations created")
        print(output)
    
    success, output = run_command("python manage.py migrate")
    if success:
        print("✓ Migrations applied")
        print(output)
    else:
        print(f"✗ Migration failed: {output}")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("Setup Complete!")
    print("=" * 50)
    print("\nYour MedGuide backend is now using MySQL!")
    print("\nTo start the server:")
    print("  python manage.py runserver")
    print()

if __name__ == "__main__":
    main()
