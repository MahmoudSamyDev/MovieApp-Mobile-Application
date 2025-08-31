# 🎬 Movie App

A modern, feature-rich movie discovery app built with React Native and Expo. Browse trending movies, search for your favorites, and manage your personal watchlist with a beautiful, intuitive interface.

## ✨ Features

### 🏠 **Home Screen**

- **Trending Movies**: Horizontal scrolling carousel showing the most popular movies with ranking indicators
- **Latest Movies**: Grid view of the newest releases from TMDB
- **Quick Search**: Instant access to movie search functionality

### 🔍 **Smart Search**

- **Real-time Search**: Debounced search with live results as you type
- **Trending Analytics**: Tracks and displays popular search terms using Appwrite
- **Comprehensive Results**: Search through thousands of movies from TMDB database

### 💾 **Personal Collection**

- **Favorites Management**: Save and remove movies from your personal collection
- **Offline Storage**: Uses AsyncStorage for persistent favorites across app sessions
- **Quick Access**: Dedicated tab for viewing all saved movies

### 🎯 **Movie Details**

- **Rich Information**: Detailed movie data including ratings, release dates, and descriptions
- **High-Quality Posters**: HD movie posters from TMDB's extensive image library
- **Interactive UI**: Smooth animations and intuitive navigation

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev) with React Native
- **Navigation**: Expo Router with file-based routing
- **Styling**: TailwindCSS via NativeWind
- **Language**: TypeScript for type safety
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Backend**: [Appwrite](https://appwrite.io) for trending data analytics
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: Custom components with gradient effects and masked views

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator/Android Emulator or physical device

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Add your TMDB API key and Appwrite configuration
   # (See Environment Configuration section below)
   ```

4. **Start the development server**

   ```bash
   npx expo start
   ```

5. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator

## ⚙️ Environment Configuration

### TMDB API Setup

1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Generate an API key from your account settings
3. Add the API key to your constants/data configuration

### Appwrite Setup (Optional)

1. Set up an [Appwrite](https://appwrite.io) project
2. Configure database for trending movies tracking
3. Update Appwrite configuration in utils/appwrite

## 📱 App Structure

```
app/
├── (tabs)/                 # Tab-based navigation
│   ├── index.tsx          # Home screen
│   ├── SearchTap.tsx      # Search functionality
│   └── SavedTap.tsx       # Saved movies
├── movie/
│   └── [movieId].tsx      # Dynamic movie details
├── components/
│   ├── General/           # Reusable components
│   └── Screens/           # Screen-specific components
└── _layout.tsx            # Root navigation layout
```

## 🎨 Key Features

### Custom Tab Navigation

- Beautiful rounded tab bar with highlight effects
- Custom tab icons with focus states
- Smooth transitions and animations

### Trending Movies System

- Real-time tracking of popular searches
- Gradient-masked ranking indicators
- Horizontal scrolling with smooth performance

### Advanced Search

- Debounced input for optimal API usage
- Loading states and error handling
- Clean, responsive search interface

### Favorites System

- Persistent storage across app sessions
- Add/remove functionality with visual feedback
- Dedicated viewing screen for saved movies

## 🔧 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Core

- **React Native**: Cross-platform mobile framework
- **Expo Router**: File-based navigation system
- **TypeScript**: Static type checking

### UI & Styling

- **NativeWind**: TailwindCSS for React Native
- **Masked View**: Gradient text effects
- **Expo Image**: Optimized image handling

### Data & Storage

- **AsyncStorage**: Local data persistence
- **Appwrite**: Backend services for analytics
- **TMDB API**: Movie database integration

## 🎯 Performance Features

- **Optimized Rendering**: FlatList for efficient scrolling
- **Image Caching**: Expo Image for better performance
- **Debounced Search**: Reduced API calls
- **Memoized Components**: Prevented unnecessary re-renders

## 🚀 Build & Deploy

### Development Build

```bash
expo build:android
expo build:ios
```

### Production Release

```bash
expo publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
- [Expo](https://expo.dev) for the excellent development platform
- [Appwrite](https://appwrite.io) for backend services
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS framework

---

**Built with ❤️ using React Native and Expo**
