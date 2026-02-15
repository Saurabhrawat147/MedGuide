# MySQL Setup Instructions

## Step 1: Create the Database

Run the batch file:
```bash
create_database.bat
```

Or manually in MySQL:
```bash
mysql -u root -p
```

Then execute:
```sql
CREATE DATABASE IF NOT EXISTS medguide_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EXIT;
```

## Step 2: Update Django Settings

Edit `medguide/settings.py` and update the MySQL password:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'medguide_db',
        'USER': 'root',
        'PASSWORD': 'YOUR_MYSQL_PASSWORD_HERE',  # <-- Update this
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## Step 3: Install MySQL Client

```bash
.\venv\Scripts\activate
pip install mysqlclient
```

**If installation fails on Windows:**
1. Download the wheel file from: https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient
2. Install it: `pip install mysqlclient-2.2.0-cp314-cp314-win_amd64.whl`

Or try:
```bash
pip install pymysql
```

Then add to `medguide/__init__.py`:
```python
import pymysql
pymysql.install_as_MySQLdb()
```

## Step 4: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Step 5: Start Server

```bash
python manage.py runserver
```

## Verify Database

Check tables were created:
```bash
mysql -u root -p medguide_db
```

```sql
SHOW TABLES;
```

You should see tables like:
- api_userprofile
- api_symptomsession
- auth_user
- etc.
