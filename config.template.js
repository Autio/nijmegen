// Configuration Template for Nijmegen March Training Tracker
// Copy this file to config.js and update with your actual Firebase settings

const CONFIG = {
    // Firebase Configuration
    // Get these from Firebase Console -> Project Settings -> Your apps
    firebase: {
        apiKey: "your-firebase-api-key-here",
        authDomain: "your-project-id.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project-id.appspot.com",
        messagingSenderId: "your-sender-id",
        appId: "your-app-id"
    },
    
    // App Settings
    app: {
        defaultLanguage: 'fi', // 'en' for English, 'fi' for Finnish
        enableFirebase: true,  // Set to false to disable Firebase and use local storage only
        enableOfflineMode: true,
        enableRealTimeSync: true
    },
    
    // Feature Flags
    features: {
        leaderboard: false,    // Set to true when ready to enable leaderboard
        analytics: false,      // Set to true to enable Firebase Analytics
        notifications: false   // Set to true to enable push notifications
    }
};

// Make config available globally
window.CONFIG = CONFIG;
