# Deployment Guide for Nijmegen March Training Tracker

## 🚀 Quick Deploy to Vercel

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `nijmegen-march-tracker` (or your preferred name)
3. Make it public or private (your choice)
4. **DO NOT** initialize with README, .gitignore, or license

### 2. Push Code to GitHub
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Nijmegen March Training Tracker"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/nijmegen-march-tracker.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `nijmegen-march-tracker` repository
5. Vercel will auto-detect it's a static site
6. Click "Deploy"

### 4. Configure Firebase for Production
After deployment, you need to update the Firebase configuration:

1. **Option A: Environment Variables (Recommended)**
   - In Vercel dashboard, go to your project settings
   - Add environment variables:
     ```
     FIREBASE_API_KEY=AIzaSyD339R59UwrVr_QmTOJi8vY8VEUyGXNr68
     FIREBASE_AUTH_DOMAIN=nijmegen-3aaa6.firebaseapp.com
     FIREBASE_PROJECT_ID=nijmegen-3aaa6
     FIREBASE_STORAGE_BUCKET=nijmegen-3aaa6.appspot.com
     FIREBASE_MESSAGING_SENDER_ID=123456789
     FIREBASE_APP_ID=your-firebase-app-id
     ```

2. **Option B: Update config.production.js**
   - Update `config.production.js` with your actual Firebase app ID
   - Commit and push changes
   - Vercel will auto-deploy

### 5. Set Up Firebase Security Rules
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

## 🔧 Alternative Deployment Options

### Netlify
1. Connect GitHub repo to Netlify
2. Build command: (leave empty for static site)
3. Publish directory: (leave empty, root is fine)
4. Deploy!

### GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase hosting
firebase init hosting

# Deploy
firebase deploy
```

## 🔐 Security Checklist

### Before Going Live:
- [ ] Firebase security rules are set up
- [ ] Authentication is enabled in Firebase Console
- [ ] Firestore database is created
- [ ] API keys are not exposed in public files
- [ ] Test registration and login flows
- [ ] Test data persistence across devices

### Environment Variables (Vercel):
If using environment variables, update your HTML to read from them:

```javascript
// In index.html Firebase initialization
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
```

## 📊 Post-Deployment Testing

### Test Checklist:
1. **Registration**: Create new account
2. **Login**: Sign in with credentials
3. **Data Entry**: Add training achievements
4. **Cross-Device**: Login on different device, verify data syncs
5. **Offline Mode**: Test offline functionality
6. **Language Switch**: Test Finnish/English switching
7. **Mobile**: Test on mobile devices

### Performance:
- Check Vercel analytics for performance metrics
- Monitor Firebase usage in Firebase Console
- Test loading times on different networks

## 🚨 Troubleshooting

### Common Issues:

#### "Firebase not initialized"
- Check Firebase config is correct
- Verify Firebase project is active
- Check browser console for errors

#### "Permission denied"
- Check Firestore security rules
- Verify user is authenticated
- Check Firebase Console for errors

#### "Build failed on Vercel"
- Check all files are committed
- Verify no syntax errors in JavaScript
- Check Vercel build logs

### Debug Mode:
Add to your config for debugging:
```javascript
app: {
    debug: true  // Enables console logging
}
```

## 🔄 Updates and Maintenance

### Making Updates:
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel auto-deploys from main branch

### Firebase Maintenance:
- Monitor usage in Firebase Console
- Check authentication logs
- Review Firestore usage and costs
- Update security rules as needed

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

Your Nijmegen March Training Tracker is now ready for production deployment! 🎯
