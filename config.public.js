// Public Configuration for Nijmegen March Training Tracker
// This file is safe to commit to git

const CONFIG = {
    // Firebase Configuration - Public (safe to commit)
    firebase: {
        apiKey: "AIzaSyD339R59UwrVr_QmTOJi8vY8VEUyGXNr68",
        authDomain: "nijmegen-3aaa6.firebaseapp.com",
        projectId: "nijmegen-3aaa6",
        storageBucket: "nijmegen-3aaa6.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-firebase-app-id" // You need to update this with your actual App ID
    },
    
    // App Settings
    app: {
        defaultLanguage: 'fi',
        enableFirebase: true,
        enableOfflineMode: true,
        enableRealTimeSync: true
    },
    
    // Feature Flags
    features: {
        leaderboard: false,
        analytics: false,
        notifications: false
    }
};

// Make config available globally
window.CONFIG = CONFIG;
