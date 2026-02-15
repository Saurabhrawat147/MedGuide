# Requirements

## Scope
- Provide a simple medical assistant with user authentication, symptom capture, and basic symptom analysis.
- Frontend consumes JSON APIs from the backend; data persisted in MySQL.

## Functional Requirements
- User Registration
  - Create account with name, email, password, gender.
  - Stores user in Django auth and gender in profile.
- User Login
  - Authenticate using email and password.
  - Returns user id, name, email on success.
- Symptom Session Management
  - Create session with symptoms, severity, duration, age group, conditions, health status.
  - List, retrieve, and delete sessions for administrative or user features.
- Symptom Analysis
  - Given a list of symptoms, return likely causes, preventive steps, and OTC suggestions.

## API Requirements
- Base URL: `http://localhost:8000/api`
- Endpoints
  - POST /register/
    - Request: `{ "email", "password", "first_name", "gender", "username" }`
    - Response: 201 on success with message
  - POST /login/
    - Request: `{ "email", "password" }`
    - Response: 200 on success `{ message, user: { id, name, email } }`
  - /sessions/ (ModelViewSet)
    - POST: create session
    - GET: list sessions
    - GET /sessions/{id}/: retrieve session
    - PUT/PATCH /sessions/{id}/: update session
    - DELETE /sessions/{id}/: delete session
  - POST /sessions/analyze/
    - Request: `{ "symptoms": [ "Headache", "Fever" ] }`
    - Response: `{ "causes": [], "preventive": [], "otc": [] }`

## Data Requirements
- User (Django auth): email, username, password, first_name.
- UserProfile: gender, created_at.
- SymptomSession: symptoms (JSON), severity, duration, age_group, conditions (JSON), health_status (JSON), results (JSON), created_at.
- See models: [models.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/models.py)

## Non-Functional Requirements
- Security
  - Use Django auth; do not expose secrets; configure production secrets via environment.
  - CORS allowed for development; restrict in production.
- Performance
  - JSON responses should be fast for small payloads; simple analysis logic.
- Reliability
  - Persistent storage in MySQL; migrations maintained.
- Compatibility
  - Backend: Python (see [requirements.txt](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/requirements.txt))
  - Frontend: modern browsers; static HTML/CSS/JS.

## Constraints
- Frameworks: Django, Django REST Framework, corsheaders.
- Database: MySQL.
- Renderers: JSON-only (no browsable API).
- Dev base URL: `http://localhost:8000`.

## Acceptance Criteria
- Registration returns 201 with success message.
- Login returns 200 with user object; invalid credentials return 401.
- Creating a session returns 201 and persists data.
- Analyze returns non-empty arrays for known symptoms and empty arrays when no matches.
