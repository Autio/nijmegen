# Firebase Setup Guide for Nijmegen March Training Tracker

## 🚀 Quick Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `nijmegen-tracker` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### 3. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

### 4. Get Firebase Configuration
1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (`</>`)
4. Enter app nickname: `nijmegen-tracker-web`
5. Click "Register app"
6. Copy the `firebaseConfig` object

### 5. Update Configuration
1. Copy `config.template.js` to `config.js`
2. Replace the Firebase configuration in `config.js`:

```javascript
const CONFIG = {
    firebase: {
        apiKey: "your-actual-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-app-id"
    },
    app: {
        defaultLanguage: 'fi',
        enableFirebase: true,
        enableOfflineMode: true,
        enableRealTimeSync: true
    }
};
```

**Important**: Never commit `config.js` to version control as it contains sensitive API keys!

### 6. Configuration Options
The `config.js` file allows you to customize various aspects of the app:

```javascript
const CONFIG = {
    firebase: { /* Firebase settings */ },
    app: {
        defaultLanguage: 'fi',     // Default language ('en' or 'fi')
        enableFirebase: true,      // Enable/disable Firebase
        enableOfflineMode: true,   // Enable offline support
        enableRealTimeSync: true  // Enable real-time data sync
    },
    features: {
        leaderboard: false,       // Enable leaderboard feature
        analytics: false,          // Enable Firebase Analytics
        notifications: false      // Enable push notifications
    }
};
```

### 7. Set Up Firestore Security Rules
In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Achievements: users can read all, write their own
    match /achievements/{achievementId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
  }
}
```

## 🔧 Advanced Configuration

### Production Security Rules
For production, use more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /achievements/{achievementId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### Enable Offline Persistence
Add to your Firebase initialization:

```javascript
import { enableNetwork, disableNetwork } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Enable offline persistence
enableNetwork(db);
```

## 📊 Database Structure

### Collections

#### `users` Collection
```javascript
{
  name: "User Name",
  email: "user@example.com",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

#### `achievements` Collection
```javascript
{
  duration: 3,
  weight: 10,
  speedTarget: 6.5,
  actualSpeed: 6.2,
  date: "2024-01-15",
  status: "success",
  comment: "Great training session",
  userId: "user-uid",
  userName: "User Name",
  createdAt: "2024-01-15T10:00:00.000Z",
  updatedAt: "2024-01-15T10:00:00.000Z"
}
```

## 🚀 Deployment

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

### Deploy to Other Platforms
- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop or connect GitHub
- **GitHub Pages**: Push to GitHub, enable Pages

## 🔍 Testing

### Test Authentication
1. Register a new user
2. Login with credentials
3. Check Firebase Console → Authentication → Users

### Test Data Storage
1. Add achievements
2. Check Firebase Console → Firestore Database
3. Verify data appears in `achievements` collection

### Test Cross-Device Sync
1. Login on device A, add achievements
2. Login on device B with same account
3. Verify achievements appear on device B

## 🛠️ Troubleshooting

### Common Issues

#### "Firebase App not initialized"
- Check Firebase config is correct
- Ensure Firebase scripts load before your app code

#### "Permission denied"
- Check Firestore security rules
- Verify user is authenticated

#### "Network request failed"
- Check internet connection
- Verify Firebase project is active

### Debug Mode
Add to your code for debugging:

```javascript
// Enable debug logging
localStorage.setItem('firebase:debug', 'true');
```

## 📈 Future Enhancements

### Leaderboard Support
The Firebase service already includes `getLeaderboard()` method for future leaderboard features.

### Real-time Collaboration
Firestore's real-time listeners enable live updates when multiple users are active.

### Analytics
Firebase Analytics can track user engagement and feature usage.

## 🔐 Security Best Practices

1. **Never expose API keys** in client-side code (use environment variables)
2. **Use proper Firestore rules** to protect user data
3. **Validate data** on both client and server side
4. **Enable App Check** for production apps
5. **Monitor usage** in Firebase Console

## 📞 Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
