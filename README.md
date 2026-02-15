# Medical Assistant

A simple full-stack application that helps users register, log in, and analyze symptoms. The project consists of a Django REST backend and a static HTML/CSS/JS frontend.

## Architecture

```mermaid
graph TD
    subgraph Client
        A[User Browser]
        B[Frontend<br/>HTML/CSS/JS]
    end

    subgraph Backend (Django + DRF)
        C[API Endpoints]
        C1[/POST /api/register/]
        C2[/POST /api/login/]
        C3[/CRUD /api/sessions/]
        C4[/POST /api/sessions/analyze/]
        D[Views & ViewSets]
        E[Serializers]
        F[Models]
    end

    subgraph Data Store
        G[(MySQL)]
    end

    A --> B
    B -->|fetch JSON| C
    C --> D
    D --> E
    D --> F
    F --> G

    %% Key flows
    B -->|Register| C1
    B -->|Login| C2
    B -->|Create/List Sessions| C3
    B -->|Analyze Symptoms| C4
```

## Key Components

- Backend: Django project with Django REST Framework and CORS enabled
  - Settings: [settings.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/settings.py)
  - URLs: [urls.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/urls.py)
  - API app:
    - Views: [views.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/views.py)
    - URLs: [api/urls.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/urls.py)
    - Models: [models.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/models.py)
    - Serializers: [serializers.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/serializers.py)
- Frontend: Static site that calls REST endpoints
  - Entry: [index.html](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/index.html)
  - API helper: [api.js](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/js/api.js)
  - App logic: [app.js](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/js/app.js)
  - Styles: [style.css](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/css/style.css)

## Backend Endpoints

- POST /api/register/ — Create new users
- POST /api/login/ — Authenticate with email and password
- /api/sessions/ — CRUD for symptom sessions (ModelViewSet)
- POST /api/sessions/analyze/ — Simple rule-based symptom analysis

## Data Model

- User (Django auth)
- UserProfile (gender, created_at)
- SymptomSession (symptoms, severity, duration, age_group, conditions, health_status, results, created_at)

## Running Locally

- Backend
  - Python deps: [requirements.txt](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/requirements.txt)
  - Set up MySQL and configure credentials via environment or settings
  - Run server: `python manage.py runserver` from the Backend directory
- Frontend
  - Open [index.html](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/index.html) in a browser
  - Ensure backend is running at `http://localhost:8000` (CORS enabled)

## Project Structure

```
Medical Assistant/
├─ Backend/
│  ├─ medguide/                # Django project (settings, urls, wsgi, asgi)
│  ├─ api/                     # App (models, serializers, views, urls, migrations)
│  ├─ manage.py
│  ├─ requirements.txt
│  ├─ .env.example
│  ├─ setup_db.py
│  ├─ create_database.bat
│  └─ quick_setup.bat
├─ Frontend/
│  ├─ index.html
│  ├─ INTEGRATION.md
│  ├─ js/
│  │  ├─ api.js
│  │  └─ app.js
│  └─ css/
│     └─ style.css
└─ .vscode/
   └─ settings.json
```

### Roles and Links

- Backend
  - Settings — Django configuration: [settings.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/settings.py)
  - URLs — Root router: [urls.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/urls.py)
  - WSGI — Deployment entry: [wsgi.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/wsgi.py)
  - ASGI — Async entry: [asgi.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/medguide/asgi.py)
  - Models — Data schema: [models.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/models.py)
  - Serializers — API data shaping: [serializers.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/serializers.py)
  - Views — Endpoints & viewsets: [views.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/views.py)
  - API URLs — Route definitions: [api/urls.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/urls.py)
  - Migrations — DB schema evolution: [migrations](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/api/migrations)
  - Manage script — Django CLI: [manage.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/manage.py)
  - Dependencies — Backend packages: [requirements.txt](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/requirements.txt)
  - Env example — Config template: [.env.example](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/.env.example)
  - DB setup — Initialize database: [setup_db.py](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/setup_db.py)
  - Create DB — MySQL helper script: [create_database.bat](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/create_database.bat)
  - Quick setup — Bootstrap script: [quick_setup.bat](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Backend/quick_setup.bat)

- Frontend
  - Entry page — App UI: [index.html](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/index.html)
  - Integration notes — Docs: [INTEGRATION.md](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/INTEGRATION.md)
  - API helpers — REST calls: [api.js](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/js/api.js)
  - App logic — UI behavior: [app.js](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/js/app.js)
  - Styles — CSS: [style.css](file:///c:/Users/sr552/Downloads/Medical%20Assistant/Frontend/css/style.css)

- Tooling
  - VS Code settings — Workspace config: [settings.json](file:///c:/Users/sr552/Downloads/Medical%20Assistant/.vscode/settings.json)
