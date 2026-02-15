// ===================================
// MEDGUIDE - Frontend JavaScript
// ===================================

// ===================================
// STATE MANAGEMENT
// ===================================

let appState = {
    user: null,
    currentScreen: 'home',
    wizardStep: 1,
    symptoms: [],
    severity: 'mild',
    duration: '',
    ageGroup: '',
    conditions: [],
    healthStatus: [],
    results: null,
};

// Symptom database
const symptomDatabase = [
    // General symptoms
    'Headache',
    'Fever',
    'Cough',
    'Cold/Runny nose',
    'Sore throat',
    'Fatigue',
    'Dizziness',
    'Muscle aches',
    'Body aches',
    'Nausea',
    'Vomiting',

    // Menstrual symptoms
    'Menstrual cramps',
    'Heavy bleeding',
    'Light bleeding',
    'Irregular period',
    'Missed period',
    'Period pain',
    'Bloating',
    'Breast tenderness',

    // Pregnancy symptoms
    'Nausea/Morning sickness',
    'Food cravings',
    'Mood changes',
    'Frequent urination',

    // Digestive
    'Stomach pain',
    'Diarrhea',
    'Constipation',
    'Indigestion',
    'Heartburn',
    'Loss of appetite',

    // Respiratory
    'Difficulty breathing',
    'Shortness of breath',
    'Chest pain',
    'Wheezing',

    // Others
    'Skin rash',
    'Itching',
    'Joint pain',
    'Back pain',
    'Insomnia',
    'Anxiety',
    'Dryness',
];

// Possible causes database
const causesDatabase = {
    'Headache': {
        causes: ['Tension headache', 'Dehydration', 'Stress', 'Poor sleep', 'Eye strain'],
        preventive: ['Stay hydrated', 'Manage stress', 'Sleep adequately', 'Take regular breaks'],
        otc: ['Paracetamol', 'Ibuprofen']
    },
    'Fever': {
        causes: ['Viral infection', 'Bacterial infection', 'Seasonal flu', 'Common cold'],
        preventive: ['Maintain hygiene', 'Stay hydrated', 'Rest adequately', 'Avoid crowded places'],
        otc: ['Paracetamol', 'Ibuprofen']
    },
    'Cough': {
        causes: ['Common cold', 'Viral infection', 'Dry air', 'Allergies', 'Irritation'],
        preventive: ['Stay hydrated', 'Use humidifier', 'Avoid irritants', 'Rest'],
        otc: ['Cough syrup', 'Lozenges', 'Honey']
    },
    'Sore throat': {
        causes: ['Viral infection', 'Bacterial infection', 'Dry air', 'Allergies'],
        preventive: ['Stay hydrated', 'Use humidifier', 'Rest voice', 'Gargle salt water'],
        otc: ['Throat lozenges', 'Paracetamol']
    },
    'Fatigue': {
        causes: ['Poor sleep', 'Stress', 'Dehydration', 'Anemia', 'Viral infection'],
        preventive: ['Sleep 7-9 hours', 'Manage stress', 'Balanced diet', 'Regular exercise'],
        otc: ['Iron supplements (if deficient)']
    },
    'Nausea': {
        causes: ['Food poisoning', 'Virus', 'Motion sickness', 'Stress', 'Medication'],
        preventive: ['Eat light meals', 'Stay hydrated', 'Ginger tea', 'Fresh air'],
        otc: ['Antacid', 'Ginger supplements']
    },
    'Stomach pain': {
        causes: ['Indigestion', 'Food sensitivity', 'Viral infection', 'Stress', 'Constipation'],
        preventive: ['Eat slowly', 'Avoid spicy food', 'Stay hydrated', 'Manage stress'],
        otc: ['Antacid', 'ORS']
    },
    'Diarrhea': {
        causes: ['Food poisoning', 'Viral infection', 'Food intolerance', 'Medication'],
        preventive: ['Stay hydrated', 'Bland diet', 'Hand hygiene', 'Food safety'],
        otc: ['ORS', 'Electrolyte drinks']
    },
    'Menstrual cramps': {
        causes: ['Uterine contractions', 'Hormonal changes', 'Stress', 'Inflammation'],
        preventive: ['Regular exercise', 'Stress management', 'Heat therapy', 'Nutrition'],
        otc: ['Ibuprofen', 'Antispasmodics (mefenamic acid)']
    },
    'Irregular period': {
        causes: ['Stress', 'Weight changes', 'Intense exercise', 'Hormonal imbalance', 'Sleep disruption'],
        preventive: ['Manage stress', 'Maintain weight', 'Moderate exercise', 'Sleep adequately'],
        otc: []
    },
    'Heavy bleeding': {
        causes: ['Hormonal imbalance', 'Polyps', 'Stress', 'Nutritional deficiency'],
        preventive: ['Iron-rich diet', 'Stress management', 'Sleep', 'Hydration'],
        otc: ['Iron supplements']
    },
    'Missed period': {
        causes: ['Stress', 'Weight changes', 'Exercise intensity', 'Hormonal changes', 'Pregnancy'],
        preventive: ['Stress management', 'Healthy weight', 'Adequate exercise', 'Sleep'],
        otc: []
    },
    'Skin rash': {
        causes: ['Allergic reaction', 'Infection', 'Irritant', 'Heat rash', 'Dry skin'],
        preventive: ['Identify triggers', 'Keep skin clean', 'Moisturize', 'Avoid irritants'],
        otc: ['Hydrocortisone cream', 'Antihistamine']
    },
    'Joint pain': {
        causes: ['Stress', 'Poor posture', 'Overuse', 'Inflammation', 'Age-related'],
        preventive: ['Exercise regularly', 'Maintain posture', 'Rest', 'Weight management'],
        otc: ['Ibuprofen', 'Heat therapy']
    },
    'Back pain': {
        causes: ['Poor posture', 'Muscle strain', 'Stress', 'Weak core', 'Injury'],
        preventive: ['Good posture', 'Core exercises', 'Stretching', 'Proper lifting'],
        otc: ['Ibuprofen', 'Heat therapy']
    },
    'Insomnia': {
        causes: ['Stress', 'Screen time', 'Caffeine', 'Irregular schedule', 'Anxiety'],
        preventive: ['Set schedule', 'Limit screens', 'No caffeine evening', 'Relaxation'],
        otc: []
    },
};

// OTC Medicines database
const otcMedicines = {
    'Paracetamol': {
        purpose: 'Pain relief and fever reduction',
        guidance: 'Used for headaches, muscle aches, and fever. Check package instructions for dosage.',
        warning: 'Do not exceed recommended daily dose. Not suitable for liver disease.'
    },
    'Ibuprofen': {
        purpose: 'Pain relief, inflammation reduction, and fever management',
        guidance: 'Used for headaches, muscle aches, period pain, and fever. Take with food.',
        warning: 'May cause stomach upset. Not suitable for people with ulcers or kidney issues.'
    },
    'Antacid': {
        purpose: 'Heartburn and indigestion relief',
        guidance: 'Used for acid reflux and indigestion. Follow package instructions.',
        warning: 'Do not overuse. Consult doctor if symptoms persist beyond 2 weeks.'
    },
    'Antihistamine': {
        purpose: 'Allergy symptom relief',
        guidance: 'Used for allergic reactions, itching, and allergic rhinitis.',
        warning: 'May cause drowsiness. Do not drive after taking.'
    },
    'Cough syrup': {
        purpose: 'Cough suppression and relief',
        guidance: 'For dry coughs. Check ingredients - some cause drowsiness.',
        warning: 'Do not use in children without medical guidance.'
    },
    'ORS (Oral Rehydration Salts)': {
        purpose: 'Rehydration during diarrhea and vomiting',
        guidance: 'Mix with water as per instructions. Sip frequently.',
        warning: 'Not for severe dehydration - seek medical help.'
    },
    'Iron supplements': {
        purpose: 'Iron deficiency awareness and general wellness',
        guidance: 'For general awareness of iron-rich nutrition. Consult before supplements.',
        warning: 'Excessive iron can be harmful. Only use if deficiency confirmed by doctor.'
    },
    'Honey': {
        purpose: 'Natural cough and sore throat relief',
        guidance: 'A spoonful of honey can soothe throat irritation. Add to tea.',
        warning: 'Not for children under 1 year. Natural does not mean risk-free.'
    },
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('MedGuide App Initialized');
    loadUserSession();
    setupEventListeners();
});

function loadUserSession() {
    const savedUser = localStorage.getItem('medguideUser');
    if (savedUser) {
        appState.user = JSON.parse(savedUser);
        appState.currentScreen = 'landing';
        showAppContainer();
        updateHeaderForLoggedInUser();
    } else {
        showAppContainer();
        switchScreen('home');
    }
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);

    // Signup form
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);

    // Severity slider
    document.getElementById('severitySlider')?.addEventListener('input', updateSeverityFeedback);

    // Duration options
    document.querySelectorAll('input[name="duration"]').forEach(input => {
        input.addEventListener('change', validateStep2);
    });

    // Age group options
    document.querySelectorAll('input[name="ageGroup"]').forEach(input => {
        input.addEventListener('change', validateStep3);
    });
}

// ===================================
// AUTHENTICATION
// ===================================

function openLoginModal() {
    closeAllDropdowns();
    document.getElementById('loginModal').classList.add('active');
}

function openSignupModal() {
    closeAllDropdowns();
    document.getElementById('signupModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('signupModal').classList.remove('active');
}

function switchToLoginModal() {
    document.getElementById('signupModal').classList.remove('active');
    document.getElementById('loginModal').classList.add('active');
}

function switchToSignupModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('signupModal').classList.add('active');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        try {
            const response = await authAPI.login({ email, password });
            
            if (response.user) {
                appState.user = {
                    id: response.user.id,
                    email: response.user.email,
                    name: response.user.name,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('medguideUser', JSON.stringify(appState.user));
                loginSuccess();
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (name && email && password && gender) {
        try {
            const response = await authAPI.register({ name, email, password, gender });
            
            if (response.message) {
                // Auto-login after successful registration
                const loginResponse = await authAPI.login({ email, password });
                
                if (loginResponse.user) {
                    appState.user = {
                        id: loginResponse.user.id,
                        email: loginResponse.user.email,
                        name: loginResponse.user.name,
                        gender: gender,
                        signupTime: new Date().toISOString()
                    };
                    localStorage.setItem('medguideUser', JSON.stringify(appState.user));
                    loginSuccess();
                }
            }
        } catch (error) {
            alert('Registration failed. Email may already be in use.');
            console.error('Signup error:', error);
        }
    }
}

function loginSuccess() {
    closeAuthModal();
    updateHeaderForLoggedInUser();
    switchScreen('landing');
    resetWizard();
}

function updateHeaderForLoggedInUser() {
    const authButtons = document.getElementById('authButtons');
    const authDropdown = document.getElementById('authDropdown');
    const userGreeting = document.getElementById('userGreeting');
    
    if (appState.user) {
        authButtons.style.display = 'none';
        authDropdown.style.display = 'flex';
        userGreeting.textContent = `Welcome, ${appState.user.name}`;
        userGreeting.style.display = 'inline';
    } else {
        authButtons.style.display = 'flex';
        authDropdown.style.display = 'none';
        userGreeting.style.display = 'none';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('medguideUser');
        appState.user = null;
        appState.currentScreen = 'home';
        closeAllDropdowns();
        switchScreen('home');
        updateHeaderForLoggedInUser();
    }
}

// Dropdown Management
function toggleLoginDropdown() {
    closeAllDropdowns();
    const menu = document.getElementById('loginDropdownMenu');
    const toggle = event.target.closest('.dropdown-toggle');
    menu.classList.add('open');
    toggle.classList.add('open');
}

function toggleSignupDropdown() {
    closeAllDropdowns();
    const menu = document.getElementById('signupDropdownMenu');
    const toggle = event.target.closest('.dropdown-toggle');
    menu.classList.add('open');
    toggle.classList.add('open');
}

function toggleAuthDropdown() {
    closeAllDropdowns();
    const menu = document.getElementById('authDropdownMenu');
    const toggle = event.target.closest('.dropdown-toggle');
    menu.classList.add('open');
    toggle.classList.add('open');
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('open');
    });
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('open');
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.auth-dropdown')) {
        closeAllDropdowns();
    }
});

// Close modals when clicking outside the modal content
document.addEventListener('click', function (event) {
    if (event.target === document.getElementById('loginModal')) {
        closeAuthModal();
    }
    if (event.target === document.getElementById('signupModal')) {
        closeAuthModal();
    }
});

// ===================================
// SCREEN NAVIGATION
// ===================================

function showAppContainer() {
    document.getElementById('appContainer').classList.add('active');
}

function navigateHome() {
    if (appState.user) {
        switchScreen('landing');
    } else {
        switchScreen('home');
    }
}

function switchScreen(screenName) {
    // Map screen names to carousel slide indices
    const screenMap = {
        'home': 0,
        'landing': 1,
        'symptomWizard': 2,
        'menstrual': 3,
        'pregnancy': 4,
        'results': 5
    };
    
    const slideIndex = screenMap[screenName];
    
    if (slideIndex !== undefined && carousel3D) {
        carousel3D.goToSlide(slideIndex);
    }
    
    appState.currentScreen = screenName;
}

function goToLanding() {
    switchScreen('landing');
    localStorage.setItem('disclaimerAccepted', 'false');
}

function closeDisclaimerModal() {
    document.getElementById('disclaimerModal').classList.remove('active');
}

function acceptDisclaimerAndNavigate() {
    localStorage.setItem('disclaimerAccepted', 'true');
    document.getElementById('disclaimerModal').classList.remove('active');
}

// ===================================
// SYMPTOM WIZARD
// ===================================

function startSymptomFlow() {
    resetWizard();
    switchScreen('symptomWizard');
    setTimeout(() => {
        showDisclaimerModal();
    }, 300);
}

function startNewSymptomFlow() {
    resetWizard();
    switchScreen('symptomWizard');
    document.getElementById('disclaimerModal').classList.add('active');
}

function showDisclaimerModal() {
    document.getElementById('disclaimerModal').classList.add('active');
}

function resetWizard() {
    appState.wizardStep = 1;
    appState.symptoms = [];
    appState.severity = 'mild';
    appState.duration = '';
    appState.ageGroup = '';
    appState.conditions = [];
    appState.healthStatus = [];
    updateProgressBar();
    // Focus on symptom input
    setTimeout(() => {
        const input = document.getElementById('symptomInput');
        if (input) input.focus();
    }, 100);
}

function updateProgressBar() {
    const progress = (appState.wizardStep / 4) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentStep').textContent = appState.wizardStep;
}

function updateSelectedSymptoms() {
    const noSymptoms = document.getElementById('noSymptoms');
    const symptomList = document.getElementById('symptomList');
    
    if (appState.symptoms.length === 0) {
        noSymptoms.style.display = 'block';
        symptomList.style.display = 'none';
    } else {
        noSymptoms.style.display = 'none';
        symptomList.style.display = 'block';
        
        symptomList.innerHTML = '';
        appState.symptoms.forEach(symptom => {
            const badge = document.createElement('div');
            badge.className = 'symptom-badge';
            badge.innerHTML = `
                <span>${symptom}</span>
                <button onclick="removeSymptom('${symptom}')">×</button>
            `;
            symptomList.appendChild(badge);
        });
    }
}

function removeSymptom(symptom) {
    appState.symptoms = appState.symptoms.filter(s => s !== symptom);
    updateSelectedSymptoms();
    validateStep1();
}

function handleAddSymptom(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSymptomFromInput();
    }
}

function addSymptomFromInput() {
    const input = document.getElementById('symptomInput');
    const symptom = input.value.trim();
    
    if (!symptom) {
        alert('Please enter a symptom');
        return;
    }
    
    // Capitalize first letter of each word
    const formattedSymptom = symptom
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    
    if (appState.symptoms.includes(formattedSymptom)) {
        alert('This symptom has already been added');
        input.value = '';
        return;
    }
    
    appState.symptoms.push(formattedSymptom);
    input.value = '';
    updateSelectedSymptoms();
    validateStep1();
    input.focus();
}

function validateStep1() {
    const nextBtn = document.getElementById('step1Next');
    nextBtn.disabled = appState.symptoms.length === 0;
}

// Step 2: Severity & Duration
function updateSeverityFeedback() {
    const slider = document.getElementById('severitySlider');
    const feedback = document.getElementById('severityFeedback');
    const value = parseInt(slider.value);
    
    const feedbacks = [
        'Mild symptoms - manageable discomfort',
        'Moderate symptoms - noticeable but manageable',
        'Severe symptoms - significant impact on daily activities'
    ];
    
    appState.severity = ['mild', 'moderate', 'severe'][value - 1];
    feedback.textContent = feedbacks[value - 1];
}

function validateStep2() {
    const nextBtn = document.getElementById('step2Next');
    const durationSelected = document.querySelector('input[name="duration"]:checked');
    appState.duration = durationSelected?.value || '';
    nextBtn.disabled = !durationSelected;
}

function validateStep3() {
    const ageSelected = document.querySelector('input[name="ageGroup"]:checked');
    appState.ageGroup = ageSelected?.value || '';
}

function nextStep() {
    if (appState.wizardStep < 4) {
        updateSymptomSummary();
        appState.wizardStep++;
        updateProgressBar();
        scrollToTop();
        showCurrentStep();
    }
}

function prevStep() {
    if (appState.wizardStep > 1) {
        appState.wizardStep--;
        updateProgressBar();
        scrollToTop();
        showCurrentStep();
    }
}

function showCurrentStep() {
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${appState.wizardStep}`).classList.add('active');
}

function updateSymptomSummary() {
    const summary = document.getElementById('symptomSummary');
    summary.textContent = `You selected: ${appState.symptoms.join(', ')}`;
}

async function completeWizard() {
    // Collect health status data
    appState.healthStatus = Array.from(document.querySelectorAll('input[name="healthStatus"]:checked'))
        .map(input => input.value);
    
    // Collect conditions data
    appState.conditions = Array.from(document.querySelectorAll('input[name="conditions"]:checked'))
        .map(input => input.value);
    
    // Save session to backend if user is logged in
    if (appState.user && appState.user.id) {
        try {
            await sessionAPI.createSession({
                user: appState.user.id,
                symptoms: appState.symptoms,
                severity: appState.severity,
                duration: appState.duration,
                age_group: appState.ageGroup,
                conditions: appState.conditions,
                health_status: appState.healthStatus
            });
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    }
    
    await generateResults();
    switchScreen('results');
    scrollToTop();
}

// ===================================
// RESULTS GENERATION
// ===================================

async function generateResults() {
    let causes = generatePossibleCauses();
    let preventive = generatePreventiveMeasures();
    let otc = generateOTCMedicines();
    
    // Try to get enhanced results from backend
    try {
        const backendResults = await sessionAPI.analyzeSymptoms(appState.symptoms);
        if (backendResults.causes) {
            causes = [...new Set([...causes, ...backendResults.causes])];
        }
        if (backendResults.preventive) {
            preventive = [...new Set([...preventive, ...backendResults.preventive])];
        }
        if (backendResults.otc) {
            otc = [...new Set([...otc, ...backendResults.otc])];
        }
    } catch (error) {
        console.log('Using local analysis (backend unavailable)');
    }
    
    const results = {
        symptoms: appState.symptoms,
        severity: appState.severity,
        duration: appState.duration,
        ageGroup: appState.ageGroup,
        conditions: appState.conditions,
        healthStatus: appState.healthStatus,
        causes: causes,
        preventive: preventive,
        otc: otc,
        timestamp: new Date().toISOString()
    };
    
    appState.results = results;
    displayResults(results);
    checkForSpecialModules();
}

function generatePossibleCauses() {
    const allCauses = new Set();
    
    appState.symptoms.forEach(symptom => {
        if (causesDatabase[symptom]) {
            causesDatabase[symptom].causes.forEach(cause => allCauses.add(cause));
        }
    });
    
    return Array.from(allCauses).slice(0, 8);
}

function generatePreventiveMeasures() {
    const allMeasures = new Set();
    
    appState.symptoms.forEach(symptom => {
        if (causesDatabase[symptom]) {
            causesDatabase[symptom].preventive.forEach(measure => allMeasures.add(measure));
        }
    });
    
    return Array.from(allMeasures).slice(0, 8);
}

function generateOTCMedicines() {
    const medicines = new Set();
    
    appState.symptoms.forEach(symptom => {
        if (causesDatabase[symptom]) {
            causesDatabase[symptom].otc.forEach(medicine => {
                if (medicine) medicines.add(medicine);
            });
        }
    });
    
    return Array.from(medicines);
}

function displayResults(results) {
    // Symptom summary
    const summaryHtml = `
        <div class="cause-item">
            <div class="cause-title">Reported Symptoms (${results.symptoms.length})</div>
            <div class="cause-description">${results.symptoms.join(', ')}</div>
            <div class="cause-description" style="margin-top: 0.5rem; font-size: 0.875rem;">
                <strong>Severity:</strong> ${results.severity} | 
                <strong>Duration:</strong> ${results.duration}
            </div>
        </div>
    `;
    document.getElementById('resultSummary').innerHTML = summaryHtml;
    
    // Check for severe symptoms
    if (results.severity === 'severe') {
        showEmergencyWarning();
    }
    
    // Possible causes
    const causesHtml = results.causes.length > 0 ? results.causes.map(cause => `
        <div class="cause-item">
            <div class="cause-title">${cause}</div>
            <div class="cause-description">General information about possible causes for your reported symptoms.</div>
        </div>
    `).join('') : '<p class="text-muted">Unable to generate specific information for the symptoms provided.</p>';
    
    document.getElementById('possibleCauses').innerHTML = causesHtml;
    
    // Preventive measures
    const preventiveHtml = results.preventive.length > 0 ? results.preventive.map(measure => `
        <div class="measure-card">
            <div class="measure-title">• ${measure}</div>
        </div>
    `).join('') : '<p class="text-muted">No specific preventive measures available.</p>';
    
    document.getElementById('preventiveMeasures').innerHTML = preventiveHtml;
    
    // OTC medicines
    const otcHtml = results.otc.length > 0 ? results.otc.map(medicine => `
        <div class="medicine-card">
            <div class="medicine-name">${medicine}</div>
            ${otcMedicines[medicine] ? `
                <div class="medicine-purpose">
                    <strong>Purpose:</strong> ${otcMedicines[medicine].purpose}
                </div>
                <div class="medicine-info">
                    <strong>General Guidance:</strong> ${otcMedicines[medicine].guidance}
                </div>
                <div class="medicine-warning">
                    <strong>⚠️ Important:</strong> ${otcMedicines[medicine].warning}
                </div>
            ` : '<p class="text-muted">Information not available</p>'}
        </div>
    `).join('') : '<p class="text-muted">No OTC medicines typically recommended for these symptoms. Consult a healthcare professional.</p>';
    
    document.getElementById('otcMedicines').innerHTML = otcHtml;
}

function showEmergencyWarning() {
    const emergencyDiv = document.getElementById('emergencyWarning');
    emergencyDiv.style.display = 'block';
    
    const emergencyList = document.getElementById('emergencyList');
    const severeSymptoms = appState.symptoms.filter(s => 
        ['Difficulty breathing', 'Severe chest pain', 'Severe bleeding'].some(severe => s.includes(severe))
    );
    
    const emergencyItems = [
        'Severe difficulty breathing or shortness of breath',
        'Severe chest pain',
        'Severe bleeding',
        'Loss of consciousness',
        'Severe allergic reactions',
        'Signs of stroke'
    ];
    
    emergencyList.innerHTML = emergencyItems.map(item => `<li>${item}</li>`).join('');
}

function checkForSpecialModules() {
    // Check for menstrual health module trigger
    const isFemale = appState.user?.gender === 'female';
    const menstrualSymptoms = ['Menstrual cramps', 'Heavy bleeding', 'Irregular period', 'Missed period'];
    const hasMenstrualSymptoms = appState.symptoms.some(s => menstrualSymptoms.includes(s));
    
    if (isFemale && hasMenstrualSymptoms) {
        document.getElementById('menstrualTrigger').style.display = 'block';
    }
    
    // Check for pregnancy awareness module trigger
    const pregnancySymptoms = ['Missed period', 'Nausea/Morning sickness', 'Fatigue', 'Breast tenderness'];
    const hasPregnancySymptoms = appState.symptoms.filter(s => pregnancySymptoms.includes(s)).length >= 2;
    
    if (isFemale && (appState.symptoms.includes('Missed period') || hasPregnancySymptoms)) {
        document.getElementById('pregnancyTrigger').style.display = 'block';
    }
}

// ===================================
// SPECIAL MODULES
// ===================================

function openMenstrualModule() {
    switchScreen('menstrual');
    scrollToTop();
}

function openPregnancyModule() {
    switchScreen('pregnancy');
    scrollToTop();
}

function backToResults() {
    switchScreen('results');
    scrollToTop();
}

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

function toggleAccordion(event) {
    const header = event.currentTarget;
    const item = header.parentElement;
    
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
            openItem.classList.remove('open');
        }
    });
    
    item.classList.toggle('open');
}

// ===================================
// SESSION MANAGEMENT
// ===================================

function saveSession() {
    if (appState.results) {
        const sessions = JSON.parse(localStorage.getItem('medguideSessions') || '[]');
        sessions.push(appState.results);
        localStorage.setItem('medguideSessions', JSON.stringify(sessions));
        
        alert('Session saved successfully! You can access previous sessions anytime.');
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// 3D CAROUSEL SYSTEM
// ===================================

class Carousel3D {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.container = document.getElementById('carouselContainer');
        this.stage = document.querySelector('.carousel-stage');
        this.current = 0;
        this.total = this.slides.length;
        this.isAnimating = false;
        this.isAutoplay = false;
        this.autoplayInterval = null;
        
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        
        this.init();
        this.setupEventListeners();
        this.updateUI();
    }
    
    init() {
        // Set initial slide positions
        this.slides.forEach((slide, index) => {
            slide.dataset.index = index;
            if (index === 0) {
                slide.classList.add('active');
                slide.dataset.position = 'active';
            } else {
                slide.dataset.position = 'far-next';
            }
        });
        
        // Initialize progress dots
        const dotsContainer = document.getElementById('progressDots');
        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.total; i++) {
            const dot = document.createElement('div');
            dot.className = `progress-dot${i === 0 ? ' active' : ''}`;
            dot.onclick = () => this.goToSlide(i);
            dotsContainer.appendChild(dot);
        }
    }
    
    nextSlide() {
        if (!this.isAnimating) {
            this.current = (this.current + 1) % this.total;
            this.updateSlides();
        }
    }
    
    prevSlide() {
        if (!this.isAnimating) {
            this.current = (this.current - 1 + this.total) % this.total;
            this.updateSlides();
        }
    }
    
    goToSlide(index) {
        if (!this.isAnimating && index !== this.current && index >= 0 && index < this.total) {
            this.current = index;
            this.updateSlides();
        }
    }
    
    updateSlides() {
        this.isAnimating = true;
        
        this.slides.forEach((slide, index) => {
            const distance = (index - this.current + this.total) % this.total;
            let position = 'far-next';
            
            if (distance === 0) {
                position = 'active';
            } else if (distance === 1) {
                position = 'next';
            } else if (distance === this.total - 1) {
                position = 'prev';
            } else if (distance > 1 && distance < this.total - 1) {
                position = 'far-next';
            }
            
            slide.dataset.position = position;
            
            // Update active class for traditional navigation
            slide.classList.remove('active');
            if (distance === 0) {
                slide.classList.add('active');
            }
        });
        
        this.updateUI();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    updateUI() {
        // Update progress indicator
        document.getElementById('currentSlide').textContent = this.current + 1;
        
        // Update progress dots
        document.querySelectorAll('.progress-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.current);
        });
        
        // Update button states
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        }
    }
    
    setupEventListeners() {
        // Button click handlers
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
            }
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (this.stage) {
            this.stage.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            this.stage.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, false);
        }
        
        const handleSwipe = () => {
            const diff = touchStartX - touchEndX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide(); // Swiped left
                } else {
                    this.prevSlide(); // Swiped right
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
        
        // Mouse drag support
        let isDragging = false;
        let dragStartX = 0;
        let dragDistance = 0;
        
        if (this.stage) {
            this.stage.addEventListener('mousedown', (e) => {
                isDragging = true;
                dragStartX = e.pageX;
                dragDistance = 0;
                this.stage.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    dragDistance = e.pageX - dragStartX;
                }
            });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    this.stage.style.cursor = 'grab';
                    
                    const threshold = 50;
                    if (Math.abs(dragDistance) > threshold) {
                        if (dragDistance > 0) {
                            this.prevSlide(); // Dragged right
                        } else {
                            this.nextSlide(); // Dragged left
                        }
                    }
                }
            });
        }
    }
    
    startAutoplay(interval = 5000) {
        this.isAutoplay = true;
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }
    
    stopAutoplay() {
        this.isAutoplay = false;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

// Global carousel instance
let carousel3D = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize carousel after a short delay to ensure DOM is ready
    setTimeout(() => {
        carousel3D = new Carousel3D();
        console.log('3D Carousel initialized successfully');
    }, 100);
});
