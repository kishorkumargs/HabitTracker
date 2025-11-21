# Habit Tracker - Progressive Web App

A fully-featured offline-first Progressive Web App (PWA) built with React, IndexedDB, and Workbox. Track your daily habits, maintain streaks, and stay motivated with reminders and detailed analytics.

## Features

### Core Habits Management
- **Create & Manage Habits** - Add, edit, and delete habits with custom accent colors
- **Daily Check-ins** - Mark habits as completed with visual feedback
- **Streak Tracking** - Monitor current and longest streaks with flame icons
- **Habit Cards** - Beautiful UI with color-coded borders and progress indicators
- **Modal Forms** - Smooth add/edit experience with backdrop overlays

### Analytics & Insights
- **Dedicated Analytics Page** - Full-screen per-habit analytics with yearly overview
- **Yearly Calendar View** - Traditional 12-month calendar grid showing full year of each habit
- **14-Day Progress Chart** - Visual completion history with hover tooltips
- **4-Month Calendar Grid** - Quick overview of recent completion patterns in main dashboard
- **Top Streaks Dashboard** - See your best-performing habits at a glance
- **CSV Export** - Download yearly habit data for external analysis
- **Color-Coded Calendars** - Each habit uses its accent color for easy identification

### UI/UX Enhancements
- **Accent Colors** - Every habit has a unique color used across borders, buttons, streaks, and calendars
- **Dark Mode** - Full dark theme support with smooth transitions
- **Responsive Design** - Optimized for mobile, tablet, and desktop screens
- **Hover Effects** - Smooth animations on cards and interactive elements
- **Landing Page** - Beautiful homepage with features showcase and call-to-action
- **Delete Confirmation** - Modal dialogs prevent accidental deletions
- **Theme Toggle** - Switch between light and dark modes anywhere in the app

### Offline-First & PWA
- **Offline Support** - Full functionality without internet connection
- **Service Worker** - Automatic caching with Workbox
- **Installable** - Works as standalone app on mobile and desktop
- **Offline Status Indicator** - Visual feedback when offline
- **Local Data Storage** - All data stays on your device (privacy-first)

### Reminders & Notifications
- **Scheduled Reminders** - Set daily reminder times for habits
- **Browser Notifications** - Get notified when it's time to check in
- **In-app Reminders** - Fallback notifications for all browsers
- **Mock Reminders** - Test notifications without waiting
- **Permission Handling** - Graceful permission requests and fallbacks

## Tech Stack

- **Frontend**: React 19.1.1 with Vite 7.2.2
- **Styling**: Tailwind CSS 3.4.18
- **Database**: IndexedDB (via idb library)
- **PWA**: Workbox + vite-plugin-pwa
- **Icons**: lucide-react
- **Utilities**: date-fns for date handling

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate PWA icons** (optional but recommended)
   ```bash
   # Using Python (recommended)
   python scripts/generate-icons.py
   
   # Or using Node.js with canvas installed
   npm run generate-icons
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Getting Started

### Development
```bash
npm run dev
```
Opens the app at `http://localhost:5173` with hot reload enabled.

### Testing Offline Mode
1. Start the dev server: `npm run dev`
2. Open DevTools (F12) → Application → Service Workers
3. Enable "Offline" mode
4. App continues to work with all data persisted locally

### Building
```bash
npm run build
npm run preview
```
Creates optimized production build in `dist/` folder.

## 📱 Installation as PWA

### Desktop (Chrome/Edge/Firefox)
1. Open the app in browser
2. Click the install button in address bar (or menu)
3. App installs as standalone application

### Mobile (iOS/Android)
1. Open in browser (Chrome, Firefox, Safari)
2. Tap Share/More menu
3. Select "Add to Home Screen"
4. App appears on home screen

## 💾 Data Storage

### IndexedDB Structure
- **habits** - Habit metadata (name, color, reminder time)
- **checkins** - Daily completion records

All data is stored locally in the browser with no server required.

## Features Breakdown

### Habit Management
- Add habits with custom accent colors
- Set daily reminder times
- Track streaks (current & longest)
- View completion charts
- Analytics button on each habit card

### Analytics Page
- **Per-Habit View**: Click analytics icon on any habit card
- **Streak Display**: Current and longest streaks with accent color theming
- **Yearly Calendar**: Full 12-month grid in traditional calendar format
- **Month Labels**: Properly positioned above each month
- **Day Numbers**: Visible inside each calendar cell
- **Color Coding**: Completed days highlighted in habit's accent color
- **CSV Export**: Download full year data with one click
- **Year Navigation**: Browse previous/next years
- **Back Button**: Return to main dashboard

### Main Dashboard
- **Stats Cards**: Total habits, active streaks, longest streak
- **Top Streaks**: Card showing best-performing habits
- **Today's Habits**: Full-width section with all habits
- **4-Month Calendar**: Recent completion patterns
- **Add Habit**: Button with gradient styling in top right

### Reminders
- Time-based daily reminders
- Browser notifications (when permitted)
- In-app notifications (always available)
- Mock reminder for testing

### Offline Features
- Works without internet
- Offline status indicator
- All data persisted locally

##  Project Structure

```
src/
├── components/          # React components
│   ├── AnalyticsDashboard.jsx      # 4-month calendar analytics
│   ├── HabitAnalyticsPage.jsx      # Full-page per-habit analytics
│   ├── HabitCard.jsx               # Individual habit display
│   ├── HabitForm.jsx               # Add/edit habit form
│   ├── HabitFormModal.jsx          # Modal wrapper for forms
│   ├── DeleteConfirmModal.jsx      # Delete confirmation dialog
│   ├── Homepage.jsx                # Landing page
│   ├── OfflineStatus.jsx           # Offline status indicator
│   ├── ProgressChart.jsx           # 14-day completion chart
│   ├── ReminderSettings.jsx        # Reminder configuration
│   ├── StreakDisplay.jsx           # Streak visualization
│   ├── ThemeToggle.jsx             # Dark mode toggle
│   └── YearlyOverview.jsx          # Yearly calendar component
├── db/
│   └── index.js                    # IndexedDB setup & helpers
├── hooks/
│   ├── useHabits.js                # Habits state management
│   └── useStreaks.js               # Streak calculations
├── services/
│   ├── habitService.js             # Habit CRUD operations
│   ├── notificationService.js      # Reminders & notifications
│   └── streakService.js            # Streak calculations & check-ins
├── App.jsx                         # Main app component
├── App.css                         # Global styles
├── index.css                       # Tailwind imports
└── main.jsx                        # Entry point
│   ├── habitService.js             # Habit CRUD operations
│   ├── notificationService.js      # Reminders & notifications
│   ├── offlineSyncService.js       # Offline sync management
│   └── streakService.js            # Streak calculations & check-ins
├── App.jsx                         # Main app component
└── main.jsx                        # Entry point

public/
├── icons/              # PWA icons
│   ├── icon-192.png
│   ├── icon-512.png
│   └── favicon.png
└── manifest.json       # PWA manifest

scripts/
├── generate-icons.js   # Node.js icon generator
└── generate-icons.py   # Python icon generator
```

## Configuration

### Workbox Caching Strategy
- **Pages**: NetworkFirst (try online, fallback to cache)
- **Scripts/Styles**: StaleWhileRevalidate (serve cache, update in background)
- **Images**: CacheFirst (serve from cache, update when online)

### Service Worker
- Auto-updates when new version available
- 30-day cache retention for resources
- Offline notification when connectivity lost

## 🎨 Customization

### Accent Colors
- Selected per habit in add/edit form
- Applied to: borders, buttons, streaks, calendar cells
- Fully customizable hex values

### Dark Mode
- Toggle in header (ThemeToggle component)
- Persisted in localStorage
- Smooth transitions

### Calendar Views
- Yearly: 12-month grid per habit (in analytics page)
- 4-Month: Recent overview (in main dashboard)
- 14-Day: Progress chart (in habit cards)

## 📈 Performance

- **Bundle Size**: Optimized with Vite code splitting
- **First Load**: <2s with service worker caching
- **Offline First**: Full functionality without network
- **Database**: IndexedDB supports unlimited entries
- **Responsive**: Mobile-first design

## Troubleshooting

### Service Worker Issues
1. Check DevTools → Application → Service Workers
2. Unregister and reload if stuck
3. Check browser DevTools console for errors

### Data Not Showing
1. Check DevTools → Application → IndexedDB
2. Verify `habits` and `checkins` stores exist
3. Clear cache and hard refresh if needed

### Icons Not Showing
1. Run `python scripts/generate-icons.py`
2. Verify files exist in `public/icons/`
3. Clear browser cache and hard refresh

### Reminders Not Working
1. Check notification permissions in browser
2. Enable "Send notifications" if blocked
3. Use "Send mock notification" to test

### Calendar Cells Overlapping
1. Ensure container has proper height constraints
2. Check browser zoom level (100% recommended)
3. Test in different screen sizes

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for productivity and consistency**
