// ===================================
// API CONFIGURATION
// ===================================

const API_BASE_URL = 'http://localhost:8000/api';

// API Helper Functions
const api = {
    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};

// Authentication API
const authAPI = {
    async register(userData) {
        return await api.post('/register/', {
            username: userData.email.split('@')[0],
            email: userData.email,
            password: userData.password,
            first_name: userData.name,
            gender: userData.gender
        });
    },

    async login(credentials) {
        return await api.post('/login/', {
            email: credentials.email,
            password: credentials.password
        });
    }
};

// Symptom Session API
const sessionAPI = {
    async createSession(sessionData) {
        return await api.post('/sessions/', sessionData);
    },

    async analyzeSymptoms(symptoms) {
        return await api.post('/sessions/analyze/', {
            symptoms: symptoms
        });
    },

    async getSessions() {
        return await api.get('/sessions/');
    }
};
