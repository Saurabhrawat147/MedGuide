# MedGuide Backend

Django REST API for the MedGuide application with MySQL database.

## Prerequisites

- Python 3.8+
- MySQL Server 8.0+
- MySQL Client libraries

## MySQL Setup

1. Install MySQL Server if not already installed
2. Start MySQL service
3. Create the database:

```bash
mysql -u root -p < setup_mysql.sql
```

Or manually in MySQL:
```sql
CREATE DATABASE medguide_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Backend Setup

1. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

Note: If mysqlclient installation fails on Windows, install from wheel:
```bash
pip install mysqlclient-1.4.6-cp39-cp39-win_amd64.whl
```

3. Configure database:
   - Copy `.env.example` to `.env`
   - Update MySQL credentials in `.env` or directly in `settings.py`

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run server:
```bash
python manage.py runserver
```

## API Endpoints

- POST `/api/register/` - User registration
- POST `/api/login/` - User login
- GET/POST `/api/sessions/` - Symptom sessions
- POST `/api/sessions/analyze/` - Analyze symptoms

Server runs on http://localhost:8000

## Troubleshooting

### mysqlclient installation issues on Windows:
1. Install Visual C++ Build Tools
2. Or use pre-built wheel from https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient

### Connection errors:
- Verify MySQL service is running
- Check credentials in settings.py
- Ensure database exists
