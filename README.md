# Nijmegen March Training Tracker 🏃‍♂️

A beautiful, modern web application for tracking Nijmegen march training accomplishments. Track your progress with different durations, weights, and speed targets in a clean, intuitive interface.

## Features

### 🎯 Core Functionality
- **Track Achievements**: Record training sessions with duration (3h/8h), weight (0-20kg), speed targets, and actual performance
- **Success/Failure Tracking**: Mark whether you achieved your goals
- **Comments**: Add notes about your training sessions
- **Date Tracking**: Keep track of when each achievement was completed

### 📊 Dashboard & Analytics
- **Progress Statistics**: View total achievements, success rate, best speed, and heaviest load
- **Interactive Charts**: Visualize your training progress over the last 30 days
- **Trend Analysis**: See how your speed and weight capacity improve over time

### 👤 User Management
- **Optional Authentication**: Register and login for personalized tracking
- **Anonymous Mode**: Use the app without registration - data stored locally
- **Multi-User Support**: Each user can track their own achievements

### 📱 Modern Design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Modern gradient design with smooth animations
- **Intuitive Navigation**: Easy-to-use tabbed interface
- **Real-time Updates**: Instant feedback and notifications

### 🌍 Internationalization
- **Multi-language Support**: English and Finnish translations
- **Language Selector**: Easy language switching with flag indicators
- **Persistent Language Choice**: Browser remembers your language preference
- **Complete Translation**: All interface elements, messages, and charts translated

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Choose your preferred language using the language selector (🇺🇸 English / 🇫🇮 Suomi)
3. Start tracking achievements immediately (no registration required)
4. Data is automatically saved in your browser's local storage
5. Your language choice is remembered for future visits

### Adding Achievements
1. Click on "📊 Add Achievement" tab
2. Fill in the form:
   - **Duration**: 3 hours or 8 hours
   - **Weight**: 0kg (no weight) to 20kg in 2.5kg increments
   - **Speed Target**: Your goal speed in km/h (e.g., 6.5)
   - **Actual Speed**: Your achieved speed in km/h (e.g., 6.2)
   - **Date**: When the training was completed
   - **Status**: Success ✅ or Failed ❌
   - **Comment**: Optional notes about the session
3. Click "Add Achievement"

### Viewing Progress
- **Dashboard**: See statistics and progress charts
- **History**: Browse all achievements with filtering options
- **Filters**: Filter by duration, weight, or success status

### Language Selection
- **Language Selector**: Located in the top-right corner with flag indicators
- **Available Languages**: English (🇺🇸) and Finnish (🇫🇮)
- **Persistent Choice**: Your language preference is saved and restored on future visits
- **Real-time Switching**: Change language anytime and see immediate updates

### User Registration (Optional)
1. Click "Register" to create an account
2. Enter your name, email, and password
3. Your achievements will be associated with your account
4. You can still use the app without registration

## Technical Details

### Data Storage
- **Local Storage**: All data is stored in your browser's local storage
- **No Server Required**: The app runs entirely in your browser
- **Data Persistence**: Your achievements persist between browser sessions
- **Privacy**: Data never leaves your device unless you choose to export it

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design works on all screen sizes

### File Structure
```
├── index.html          # Main application file
├── styles.css          # Styling and responsive design
├── script.js           # Application logic and functionality
└── README.md           # This documentation
```

## Training Goals Reference

Based on Ilkka's training template, here are some suggested goals:

### 3-Hour Marches
- No weight: 6.5 km/h target
- 5kg: 6.0 km/h target
- 10kg: 5.7 km/h target
- 15kg: 5.4 km/h target

### 8-Hour Marches
- No weight: 5.5 km/h target
- 5kg: 5.0 km/h target
- 10kg: 4.5 km/h target

## Tips for Success

1. **Start Small**: Begin with shorter durations and lighter weights
2. **Track Consistently**: Record every training session for better insights
3. **Set Realistic Goals**: Use the suggested targets as starting points
4. **Monitor Progress**: Check your dashboard regularly to see improvements
5. **Add Comments**: Note weather conditions, how you felt, or any challenges

## Support

This application is designed to be simple and self-contained. If you encounter any issues:

1. Check that JavaScript is enabled in your browser
2. Ensure you're using a modern browser
3. Try refreshing the page
4. Check your browser's local storage settings

Enjoy tracking your Nijmegen march training progress! 🎯
