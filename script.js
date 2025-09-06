// Nijmegen March Training Tracker
class TrainingTracker {
    constructor() {
        this.firebaseService = null;
        this.achievements = [];
        this.currentUser = null;
        this.chart = null;
        this.currentLanguage = this.loadLanguage();
        this.realtimeListener = null;
        
        // Initialize Firebase service if available
        if (window.FirebaseService) {
            this.firebaseService = new FirebaseService();
        }
        
        this.translations = {
            en: {
                // App Title
                'app.title': '🏃‍♂️ Nijmegen March Training Tracker',
                
                // Navigation
                'nav.tracker': '📊 Add Achievement',
                'nav.dashboard': '📈 Dashboard',
                'nav.history': '📋 History',
                
                // Tracker
                'tracker.title': 'Track Your Achievement',
                
                // Form
                'form.duration': 'Duration',
                'form.selectDuration': 'Select duration',
                'form.duration3h': '3 hours',
                'form.duration8h': '8 hours',
                'form.weight': 'Weight (kg)',
                'form.selectWeight': 'Select weight',
                'form.noWeight': 'No weight',
                'form.weight5kg': '5 kg',
                'form.weight10kg': '10 kg',
                'form.weight12_5kg': '12.5 kg',
                'form.weight15kg': '15 kg',
                'form.weight17_5kg': '17.5 kg',
                'form.weight20kg': '20 kg',
                'form.speedTarget': 'Speed Target (km/h)',
                'form.actualSpeed': 'Actual Speed (km/h)',
                'form.date': 'Date',
                'form.status': 'Status',
                'form.success': '✅ Success',
                'form.failed': '❌ Failed',
                'form.comment': 'Comment (optional)',
                'form.commentPlaceholder': 'Add any notes about your training session...',
                'form.addAchievement': 'Add Achievement',
                
                // Dashboard
                'dashboard.title': 'Training Progress Dashboard',
                'dashboard.totalAchievements': 'Total Achievements',
                'dashboard.successRate': 'Success Rate',
                'dashboard.bestSpeed': 'Best Speed',
                'dashboard.heaviestLoad': 'Heaviest Load',
                
                // History
                'history.title': 'Training History',
                'history.allDurations': 'All Durations',
                'history.allWeights': 'All Weights',
                'history.allStatus': 'All Status',
                
                // Auth
                'auth.login': 'Login',
                'auth.register': 'Register',
                'auth.logout': 'Logout',
                'auth.email': 'Email',
                'auth.password': 'Password',
                'auth.name': 'Name',
                
                // Feedback
                'feedback.button': '💬 Feedback',
                'feedback.title': 'Send Feedback',
                'feedback.name': 'Your Name',
                'feedback.email': 'Your Email',
                'feedback.subject': 'Subject',
                'feedback.subjectPlaceholder': 'Brief description of your feedback',
                'feedback.message': 'Message',
                'feedback.messagePlaceholder': 'Please describe your feedback, suggestions, or issues...',
                'feedback.send': 'Send Feedback',
                
                // Messages
                'msg.achievementAdded': 'Achievement added successfully!',
                'msg.loggedIn': 'Logged in successfully!',
                'msg.registered': 'Registered successfully!',
                'msg.loggedOut': 'Logged out successfully!',
                'msg.noAchievements': 'No achievements found matching your filters.',
                'msg.welcome': 'Welcome, {name}!',
                'msg.by': 'by {name}',
                
                // Chart
                'chart.title': 'Training Progress (Last 30 Days)',
                'chart.speed': 'Speed (km/h)',
                'chart.weight': 'Weight (kg)',
                
                // History details
                'history.targetSpeed': 'Target Speed:',
                'history.actualSpeed': 'Actual Speed:',
                'history.duration': 'Duration:',
                'history.weight': 'Weight:',
                'history.hours': 'hours',
                'history.march': 'march with',
                'history.kg': 'kg'
            },
            fi: {
                // App Title
                'app.title': '🏃‍♂️ Nijmegen Marssin Harjoitteluseuranta',
                
                // Navigation
                'nav.tracker': '📊 Lisää Saavutus',
                'nav.dashboard': '📈 Raportti',
                'nav.history': '📋 Historia',
                
                // Tracker
                'tracker.title': 'Kirjaa Saavutuksesi',
                
                // Form
                'form.duration': 'Kesto',
                'form.selectDuration': 'Valitse kesto',
                'form.duration3h': '3 tuntia',
                'form.duration8h': '8 tuntia',
                'form.weight': 'Paino (kg)',
                'form.selectWeight': 'Valitse paino',
                'form.noWeight': 'Ei painoa',
                'form.weight5kg': '5 kg',
                'form.weight10kg': '10 kg',
                'form.weight12_5kg': '12,5 kg',
                'form.weight15kg': '15 kg',
                'form.weight17_5kg': '17,5 kg',
                'form.weight20kg': '20 kg',
                'form.speedTarget': 'Nopeustavoite (km/h)',
                'form.actualSpeed': 'Todellinen nopeus (km/h)',
                'form.date': 'Päivämäärä',
                'form.status': 'Tulos',
                'form.success': '✅ Onnistui',
                'form.failed': '❌ Epäonnistui',
                'form.comment': 'Kommentti (valinnainen)',
                'form.commentPlaceholder': 'Lisää muistiinpanoja harjoitussesiosta...',
                'form.addAchievement': 'Lisää Saavutus',
                
                // Dashboard
                'dashboard.title': 'Harjoittelun Edistymisraportti',
                'dashboard.totalAchievements': 'Saavutukset Yhteensä',
                'dashboard.successRate': 'Onnistumisprosentti',
                'dashboard.bestSpeed': 'Paras Nopeus',
                'dashboard.heaviestLoad': 'Raskain Kuorma',
                
                // History
                'history.title': 'Harjoitteluhistoria',
                'history.allDurations': 'Kaikki Kestot',
                'history.allWeights': 'Kaikki Painot',
                'history.allStatus': 'Kaikki Tulokset',
                
                // Auth
                'auth.login': 'Kirjaudu',
                'auth.register': 'Rekisteröidy',
                'auth.logout': 'Uloskirjautuminen',
                'auth.email': 'Sähköposti',
                'auth.password': 'Salasana',
                'auth.name': 'Nimi',
                
                // Feedback
                'feedback.button': '💬 Palaute',
                'feedback.title': 'Lähetä Palaute',
                'feedback.name': 'Nimesi',
                'feedback.email': 'Sähköpostisi',
                'feedback.subject': 'Aihe',
                'feedback.subjectPlaceholder': 'Lyhyt kuvaus palautteestasi',
                'feedback.message': 'Viesti',
                'feedback.messagePlaceholder': 'Kuvaile palautteesi, ehdotukset tai ongelmat...',
                'feedback.send': 'Lähetä Palaute',
                
                // Messages
                'msg.achievementAdded': 'Saavutus lisätty onnistuneesti!',
                'msg.loggedIn': 'Kirjautuminen onnistui!',
                'msg.registered': 'Rekisteröityminen onnistui!',
                'msg.loggedOut': 'Uloskirjautuminen onnistui!',
                'msg.noAchievements': 'Suodattimiisi sopivia saavutuksia ei löytynyt.',
                'msg.welcome': 'Tervetuloa, {name}!',
                'msg.by': 'käyttäjältä {name}',
                
                // Chart
                'chart.title': 'Harjoittelun Edistyminen (Viimeiset 30 päivää)',
                'chart.speed': 'Nopeus (km/h)',
                'chart.weight': 'Paino (kg)',
                
                // History details
                'history.targetSpeed': 'Nopeustavoite:',
                'history.actualSpeed': 'Todellinen nopeus:',
                'history.duration': 'Kesto:',
                'history.weight': 'Paino:',
                'history.hours': 'tuntia',
                'history.march': 'marssi',
                'history.kg': 'kg'
            }
        };
        
        // Wait for Firebase to load before initializing
        if (window.firebaseDB) {
            this.init();
        } else {
            // Fallback if Firebase doesn't load
            setTimeout(() => {
                this.init();
            }, 1000);
        }
    }

    async init() {
        this.setupEventListeners();
        this.translatePage();
        this.updateUI();
        this.setDefaultDate();
        
        // Initialize Firebase if available
        if (window.firebaseDB) {
            await this.initializeAuth();
            await this.loadData();
        } else {
            // Fallback to local storage
            this.achievements = this.loadAchievements();
            this.currentUser = this.loadCurrentUser();
        }
        
        this.renderHistory();
        this.updateDashboard();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Language selector
        document.getElementById('languageSelector').addEventListener('change', (e) => this.changeLanguage(e.target.value));

        // Forms
        document.getElementById('achievementForm').addEventListener('submit', (e) => this.handleAchievementSubmit(e));
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('feedbackForm').addEventListener('submit', (e) => this.handleFeedbackSubmit(e));

        // Auth buttons
        document.getElementById('loginBtn').addEventListener('click', () => this.showModal('loginModal'));
        document.getElementById('registerBtn').addEventListener('click', () => this.showModal('registerModal'));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.getElementById('feedbackBtn').addEventListener('click', () => this.showModal('feedbackModal'));

        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        });

        // History filters
        document.getElementById('filterDuration').addEventListener('change', () => this.renderHistory());
        document.getElementById('filterWeight').addEventListener('change', () => this.renderHistory());
        document.getElementById('filterStatus').addEventListener('change', () => this.renderHistory());

        // Scroll detection for header fade
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const header = document.querySelector('.header');
            
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                // Scrolling up or near top
                header.classList.add('scrolled');
            } else {
                // Scrolling down
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Firebase Integration Methods
    async initializeAuth() {
        try {
            if (!this.firebaseService || !this.firebaseService.auth) {
                throw new Error('Firebase not available');
            }
            
            const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            
            onAuthStateChanged(this.firebaseService.auth, (user) => {
                if (user) {
                    this.currentUser = {
                        id: user.uid,
                        name: user.displayName || user.email.split('@')[0],
                        email: user.email
                    };
                    this.saveCurrentUser();
                    this.setupRealtimeListener();
                } else {
                    this.currentUser = null;
                    this.saveCurrentUser();
                    if (this.realtimeListener) {
                        this.realtimeListener();
                    }
                }
                this.updateUI();
            });
        } catch (error) {
            console.error('Auth initialization error:', error);
            // Fallback to local storage
            this.currentUser = this.loadCurrentUser();
        }
    }

    async loadData() {
        try {
            if (this.currentUser) {
                this.achievements = await this.firebaseService.getAchievements(this.currentUser.id);
            } else {
                this.achievements = await this.firebaseService.getAchievements();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.achievements = this.loadAchievements();
        }
    }

    setupRealtimeListener() {
        if (!this.currentUser) return;

        try {
            this.realtimeListener = this.firebaseService.setupAchievementListener(
                this.currentUser.id,
                (achievements) => {
                    this.achievements = achievements;
                    this.renderHistory();
                    this.updateDashboard();
                }
            );
        } catch (error) {
            console.error('Error setting up realtime listener:', error);
        }
    }

    // Localization Methods
    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage][key];
            if (translation) {
                element.textContent = translation;
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.translations[this.currentLanguage][key];
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Set language selector value
        document.getElementById('languageSelector').value = this.currentLanguage;
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.saveLanguage();
        this.translatePage();
        this.renderHistory(); // Re-render history with new language
        this.updateDashboard(); // Re-render dashboard with new language
    }

    translate(key, params = {}) {
        let translation = this.translations[this.currentLanguage][key] || key;
        
        // Replace parameters in translation
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }

    // Tab Management
    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Update dashboard when switching to it
        if (tabName === 'dashboard') {
            this.updateDashboard();
        }
    }

    // Achievement Management
    async handleAchievementSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const achievement = {
            id: Date.now().toString(),
            duration: parseInt(formData.get('duration')),
            weight: parseFloat(formData.get('weight')),
            speedTarget: parseFloat(formData.get('speedTarget')),
            actualSpeed: parseFloat(formData.get('actualSpeed')),
            date: formData.get('date'),
            status: formData.get('status'),
            comment: formData.get('comment'),
            userId: this.currentUser?.id || 'anonymous',
            userName: this.currentUser?.name || 'Anonymous'
        };

        try {
            // Save to Firebase (or local storage if offline)
            if (this.firebaseService) {
                await this.firebaseService.saveAchievement(achievement);
            } else {
                // Fallback to local storage
                this.achievements.push(achievement);
                this.saveAchievements();
            }
            
            // Add to local array for immediate UI update
            this.achievements.unshift(achievement);
            this.renderHistory();
            this.updateDashboard();
            
            e.target.reset();
            this.setDefaultDate();
            
            // Show success message
            this.showNotification(this.translate('msg.achievementAdded'), 'success');
        } catch (error) {
            console.error('Error saving achievement:', error);
            this.showNotification('Error saving achievement. Please try again.', 'error');
        }
    }

    // Utility Methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    registerUserLocal(name, email, password) {
        // Check if user already exists
        const existingUsers = this.loadUsers();
        if (existingUsers.find(user => user.email === email)) {
            throw new Error('An account with this email already exists');
        }

        // Create user with hashed password
        const user = {
            id: Date.now().toString(),
            name: name,
            email: email,
            passwordHash: this.simpleHash(password),
            createdAt: new Date().toISOString()
        };
        
        // Save user to users list
        existingUsers.push(user);
        this.saveUsers(existingUsers);
        
        this.currentUser = { id: user.id, name: user.name, email: user.email };
        this.saveCurrentUser();
        this.updateUI();
    }

    loginUserLocal(email, password) {
        const users = this.loadUsers();
        const user = users.find(u => u.email === email && u.passwordHash === this.simpleHash(password));

        if (user) {
            this.currentUser = { id: user.id, name: user.name, email: user.email };
            this.saveCurrentUser();
            this.updateUI();
        } else {
            throw new Error('Invalid email or password');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        // Basic validation
        if (!name || name.length < 2) {
            this.showNotification('Name must be at least 2 characters long', 'error');
            return;
        }

        if (!email || !this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!password || password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            if (this.firebaseService) {
                await this.firebaseService.registerUser(email, password, name);
            } else {
                // Fallback to local storage registration
                this.registerUserLocal(name, email, password);
            }
            this.closeModal(document.getElementById('registerModal'));
            this.showNotification(this.translate('msg.registered'), 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showNotification('Please enter both email and password', 'error');
            return;
        }

        try {
            if (this.firebaseService) {
                await this.firebaseService.loginUser(email, password);
            } else {
                // Fallback to local storage login
                this.loginUserLocal(email, password);
            }
            this.closeModal(document.getElementById('loginModal'));
            this.showNotification(this.translate('msg.loggedIn'), 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    handleFeedbackSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('feedbackName').value.trim();
        const email = document.getElementById('feedbackEmail').value.trim();
        const subject = document.getElementById('feedbackSubject').value.trim();
        const message = document.getElementById('feedbackMessage').value.trim();

        if (!name || !email || !subject || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:mikael.upbeam@gmail.com?subject=${encodeURIComponent(`[Nijmegen Tracker] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        this.closeModal(document.getElementById('feedbackModal'));
        this.showNotification('Email client opened with your feedback', 'success');
    }

    async logout() {
        try {
            if (this.firebaseService) {
                await this.firebaseService.logoutUser();
            } else {
                this.currentUser = null;
                this.saveCurrentUser();
                this.updateUI();
            }
            this.showNotification(this.translate('msg.loggedOut'), 'info');
        } catch (error) {
            console.error('Logout error:', error);
            this.currentUser = null;
            this.saveCurrentUser();
            this.updateUI();
            this.showNotification(this.translate('msg.loggedOut'), 'info');
        }
    }

    // UI Updates
    updateUI() {
        const userInfo = document.getElementById('userInfo');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.currentUser) {
            userInfo.textContent = this.translate('msg.welcome', { name: this.currentUser.name });
            userInfo.classList.remove('hidden');
            logoutBtn.classList.remove('hidden');
            loginBtn.classList.add('hidden');
            registerBtn.classList.add('hidden');
        } else {
            userInfo.classList.add('hidden');
            logoutBtn.classList.add('hidden');
            loginBtn.classList.remove('hidden');
            registerBtn.classList.remove('hidden');
        }
    }

    setDefaultDate() {
        const dateInput = document.getElementById('date');
        if (!dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    // History Management
    renderHistory() {
        const historyList = document.getElementById('historyList');
        const filterDuration = document.getElementById('filterDuration').value;
        const filterWeight = document.getElementById('filterWeight').value;
        const filterStatus = document.getElementById('filterStatus').value;

        let filteredAchievements = this.achievements;

        if (filterDuration) {
            filteredAchievements = filteredAchievements.filter(a => a.duration.toString() === filterDuration);
        }
        if (filterWeight) {
            filteredAchievements = filteredAchievements.filter(a => a.weight.toString() === filterWeight);
        }
        if (filterStatus) {
            filteredAchievements = filteredAchievements.filter(a => a.status === filterStatus);
        }

        // Sort by date (newest first)
        filteredAchievements.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredAchievements.length === 0) {
            historyList.innerHTML = `<p class="text-center">${this.translate('msg.noAchievements')}</p>`;
            return;
        }

        historyList.innerHTML = filteredAchievements.map(achievement => `
            <div class="history-item ${achievement.status === 'failed' ? 'failed' : ''}">
                <div class="history-header">
                    <div class="history-title">
                        ${achievement.duration}${this.translate('history.hours')} ${this.translate('history.march')} ${achievement.weight === 0 ? this.translate('form.noWeight') : achievement.weight + this.translate('history.kg')}
                    </div>
                    <div class="history-date">${new Date(achievement.date).toLocaleDateString()}</div>
                </div>
                <div class="history-details">
                    <div class="history-detail">
                        <strong>${this.translate('history.targetSpeed')}</strong> ${achievement.speedTarget} km/h
                    </div>
                    <div class="history-detail">
                        <strong>${this.translate('history.actualSpeed')}</strong> ${achievement.actualSpeed} km/h
                    </div>
                    <div class="history-detail">
                        <strong>${this.translate('history.duration')}</strong> ${achievement.duration} ${this.translate('history.hours')}
                    </div>
                    <div class="history-detail">
                        <strong>${this.translate('history.weight')}</strong> ${achievement.weight === 0 ? this.translate('form.noWeight') : achievement.weight + ' kg'}
                    </div>
                </div>
                <div class="history-header">
                    <span class="status-badge status-${achievement.status}">
                        ${achievement.status === 'success' ? this.translate('form.success') : this.translate('form.failed')}
                    </span>
                    ${achievement.userName !== 'Anonymous' ? `<span style="color: #718096; font-size: 0.9rem;">${this.translate('msg.by', { name: achievement.userName })}</span>` : ''}
                </div>
                ${achievement.comment ? `<div class="history-comment">"${achievement.comment}"</div>` : ''}
            </div>
        `).join('');
    }

    // Dashboard Management
    updateDashboard() {
        this.updateStats();
        this.updateChart();
    }

    updateStats() {
        const totalAchievements = this.achievements.length;
        const successfulAchievements = this.achievements.filter(a => a.status === 'success').length;
        const successRate = totalAchievements > 0 ? Math.round((successfulAchievements / totalAchievements) * 100) : 0;
        const bestSpeed = this.achievements.length > 0 ? Math.max(...this.achievements.map(a => a.actualSpeed)) : 0;
        const heaviestLoad = this.achievements.length > 0 ? Math.max(...this.achievements.map(a => a.weight)) : 0;

        document.getElementById('totalAchievements').textContent = totalAchievements;
        document.getElementById('successRate').textContent = successRate + '%';
        document.getElementById('bestSpeed').textContent = bestSpeed.toFixed(1) + ' km/h';
        document.getElementById('heaviestLoad').textContent = heaviestLoad + ' kg';
    }

    updateChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare data for chart
        const last30Days = this.getLast30DaysData();
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last30Days.map(d => d.date),
                datasets: [
                    {
                        label: this.translate('chart.speed'),
                        data: last30Days.map(d => d.avgSpeed),
                        borderColor: '#6b7c32',
                        backgroundColor: 'rgba(107, 124, 50, 0.2)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: this.translate('chart.weight'),
                        data: last30Days.map(d => d.avgWeight),
                        borderColor: '#4a5d23',
                        backgroundColor: 'rgba(74, 93, 35, 0.2)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: this.translate('chart.title')
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: this.translate('chart.speed')
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: this.translate('chart.weight')
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    getLast30DaysData() {
        const data = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayAchievements = this.achievements.filter(a => a.date === dateStr);
            
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                avgSpeed: dayAchievements.length > 0 ? 
                    dayAchievements.reduce((sum, a) => sum + a.actualSpeed, 0) / dayAchievements.length : 0,
                avgWeight: dayAchievements.length > 0 ? 
                    dayAchievements.reduce((sum, a) => sum + a.weight, 0) / dayAchievements.length : 0
            });
        }
        
        return data;
    }

    // Modal Management
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modal) {
        modal.style.display = 'none';
        // Clear forms
        modal.querySelectorAll('input').forEach(input => input.value = '');
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Data Persistence
    saveAchievements() {
        localStorage.setItem('nijmegenAchievements', JSON.stringify(this.achievements));
    }

    loadAchievements() {
        const saved = localStorage.getItem('nijmegenAchievements');
        return saved ? JSON.parse(saved) : [];
    }

    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('nijmegenCurrentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('nijmegenCurrentUser');
        }
    }

    loadCurrentUser() {
        const saved = localStorage.getItem('nijmegenCurrentUser');
        return saved ? JSON.parse(saved) : null;
    }

    saveLanguage() {
        localStorage.setItem('nijmegenLanguage', this.currentLanguage);
    }

    loadLanguage() {
        const configLanguage = window.CONFIG?.app?.defaultLanguage || 'fi';
        return localStorage.getItem('nijmegenLanguage') || configLanguage;
    }

    saveUsers(users) {
        localStorage.setItem('nijmegenUsers', JSON.stringify(users));
    }

    loadUsers() {
        const saved = localStorage.getItem('nijmegenUsers');
        return saved ? JSON.parse(saved) : [];
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TrainingTracker();
});
