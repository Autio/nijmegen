// Firebase Service for Nijmegen March Training Tracker
class FirebaseService {
    constructor() {
        this.db = window.firebaseDB;
        this.auth = window.firebaseAuth;
        this.isOnline = navigator.onLine;
        this.setupOfflineListener();
    }

    setupOfflineListener() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('Back online - syncing data');
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('Gone offline - using local storage');
        });
    }

    // User Authentication
    async registerUser(email, password, name) {
        try {
            const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
            // Create user document in Firestore
            await this.createUserDocument(userCredential.user.uid, {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            return userCredential.user;
        } catch (error) {
            throw new Error(this.getErrorMessage(error.code));
        }
    }

    async loginUser(email, password) {
        try {
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(this.getErrorMessage(error.code));
        }
    }

    async logoutUser() {
        try {
            const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            await signOut(this.auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    // Firestore Operations
    async createUserDocument(userId, userData) {
        if (!this.isOnline) {
            // Store locally for later sync
            this.storeOfflineData('pendingUsers', { userId, userData });
            return;
        }

        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await setDoc(doc(this.db, 'users', userId), userData);
        } catch (error) {
            console.error('Error creating user document:', error);
            throw error;
        }
    }

    async saveAchievement(achievement) {
        if (!this.isOnline) {
            // Store locally for later sync
            this.storeOfflineData('pendingAchievements', achievement);
            return achievement.id;
        }

        try {
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const docRef = await addDoc(collection(this.db, 'achievements'), {
                ...achievement,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error saving achievement:', error);
            // Fallback to local storage
            this.storeOfflineData('pendingAchievements', achievement);
            return achievement.id;
        }
    }

    async getAchievements(userId = null) {
        if (!this.isOnline) {
            return this.getLocalAchievements();
        }

        try {
            const { collection, query, where, orderBy, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            let q = query(collection(this.db, 'achievements'), orderBy('date', 'desc'));
            if (userId) {
                q = query(collection(this.db, 'achievements'), where('userId', '==', userId), orderBy('date', 'desc'));
            }
            
            const querySnapshot = await getDocs(q);
            const achievements = [];
            
            querySnapshot.forEach((doc) => {
                achievements.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Cache locally for offline access
            this.cacheAchievements(achievements);
            return achievements;
        } catch (error) {
            console.error('Error fetching achievements:', error);
            return this.getLocalAchievements();
        }
    }

    async updateAchievement(achievementId, updates) {
        if (!this.isOnline) {
            this.storeOfflineData('pendingUpdates', { achievementId, updates });
            return;
        }

        try {
            const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await updateDoc(doc(this.db, 'achievements', achievementId), {
                ...updates,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating achievement:', error);
            this.storeOfflineData('pendingUpdates', { achievementId, updates });
        }
    }

    async deleteAchievement(achievementId) {
        if (!this.isOnline) {
            this.storeOfflineData('pendingDeletes', achievementId);
            return;
        }

        try {
            const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await deleteDoc(doc(this.db, 'achievements', achievementId));
        } catch (error) {
            console.error('Error deleting achievement:', error);
            this.storeOfflineData('pendingDeletes', achievementId);
        }
    }

    // Real-time listeners
    setupAchievementListener(userId, callback) {
        if (!this.isOnline) return;

        try {
            const { collection, query, where, orderBy, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            let q = query(collection(this.db, 'achievements'), orderBy('date', 'desc'));
            if (userId) {
                q = query(collection(this.db, 'achievements'), where('userId', '==', userId), orderBy('date', 'desc'));
            }
            
            return onSnapshot(q, (querySnapshot) => {
                const achievements = [];
                querySnapshot.forEach((doc) => {
                    achievements.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(achievements);
            });
        } catch (error) {
            console.error('Error setting up listener:', error);
        }
    }

    // Offline Support
    storeOfflineData(type, data) {
        const offlineData = JSON.parse(localStorage.getItem('offlineData') || '{}');
        if (!offlineData[type]) offlineData[type] = [];
        offlineData[type].push(data);
        localStorage.setItem('offlineData', JSON.stringify(offlineData));
    }

    async syncOfflineData() {
        const offlineData = JSON.parse(localStorage.getItem('offlineData') || '{}');
        
        // Sync pending achievements
        if (offlineData.pendingAchievements) {
            for (const achievement of offlineData.pendingAchievements) {
                await this.saveAchievement(achievement);
            }
            offlineData.pendingAchievements = [];
        }

        // Sync pending updates
        if (offlineData.pendingUpdates) {
            for (const update of offlineData.pendingUpdates) {
                await this.updateAchievement(update.achievementId, update.updates);
            }
            offlineData.pendingUpdates = [];
        }

        // Sync pending deletes
        if (offlineData.pendingDeletes) {
            for (const achievementId of offlineData.pendingDeletes) {
                await this.deleteAchievement(achievementId);
            }
            offlineData.pendingDeletes = [];
        }

        localStorage.setItem('offlineData', JSON.stringify(offlineData));
    }

    // Local Storage Fallbacks
    getLocalAchievements() {
        return JSON.parse(localStorage.getItem('nijmegenAchievements') || '[]');
    }

    cacheAchievements(achievements) {
        localStorage.setItem('nijmegenAchievements', JSON.stringify(achievements));
    }

    // Utility Methods
    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'An account with this email already exists',
            'auth/weak-password': 'Password should be at least 6 characters',
            'auth/invalid-email': 'Invalid email address',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later'
        };
        return errorMessages[errorCode] || 'An error occurred. Please try again.';
    }

    // Leaderboard Support (for future use)
    async getLeaderboard(limit = 10) {
        if (!this.isOnline) return [];

        try {
            const { collection, query, orderBy, limit: limitTo, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const q = query(
                collection(this.db, 'achievements'),
                where('status', '==', 'success'),
                orderBy('actualSpeed', 'desc'),
                limitTo(limit)
            );
            
            const querySnapshot = await getDocs(q);
            const leaderboard = [];
            
            querySnapshot.forEach((doc) => {
                leaderboard.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return leaderboard;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    }
}

// Make FirebaseService available globally
window.FirebaseService = FirebaseService;
