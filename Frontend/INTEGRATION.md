# Frontend-Backend Integration Guide

## Setup Instructions

### 1. Start the Django Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend will run on: http://localhost:8000

### 2. Serve the Frontend

Open `Frontend/index.html` in your browser or use a local server:

```bash
cd Frontend
python -m http.server 8080
```

Frontend will be available at: http://localhost:8080

## API Integration

The frontend now connects to the backend through `js/api.js`:

### Authentication
- **Register**: POST `/api/register/` - Creates new user account
- **Login**: POST `/api/login/` - Authenticates user

### Symptom Sessions
- **Create Session**: POST `/api/sessions/` - Saves symptom data
- **Analyze Symptoms**: POST `/api/sessions/analyze/` - Gets AI analysis
- **Get Sessions**: GET `/api/sessions/` - Retrieves user history

## Features

✅ User registration with backend storage
✅ User login with authentication
✅ Symptom session persistence
✅ Backend-enhanced symptom analysis
✅ Fallback to local analysis if backend unavailable

## CORS Configuration

The backend is configured to accept requests from any origin during development. For production, update `CORS_ALLOW_ALL_ORIGINS` in `Backend/medguide/settings.py`.

## Testing

1. Register a new user through the frontend
2. Login with credentials
3. Complete symptom wizard
4. Check Django admin at http://localhost:8000/admin to see stored data

Create superuser for admin access:
```bash
python manage.py createsuperuser
```
