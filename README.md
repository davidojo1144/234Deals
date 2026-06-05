# 234Deals Mobile Application

234Deals is a modern, visually appealing, and user-friendly mobile application built with React Native and Expo. It features a beautiful product listing interface, comprehensive product detail views, dynamic animations, and state management optimized for a sleek user experience.

## ✨ Features

- **Product Listing Screen**: Responsive 2-column grid layout with search functionality, category filters, pull-to-refresh, and infinite scrolling.
- **Product Details Screen**: Deep-dive product views including an image carousel, interactive rating stars, pricing with discount badges, full product descriptions, and scrollable customer reviews.
- **State Management**: Centralized global state handling using `Zustand`.
- **Styling**: Beautiful, utility-first styling powered by `NativeWind` (Tailwind CSS for React Native).
- **Navigation**: File-based routing configured with `Expo Router`.

---

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Styling:** [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS)
- **Data Fetching:** [Axios](https://axios-http.com/) (using the dummyjson public API)
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Expo CLI** (installed via npx)
- **EAS CLI** (for building the APK) -> `npm install -g eas-cli`

### 1. Installation

Clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/davidojo1144/234Deals.git

# Navigate into the project directory
cd 234Deals

# Install dependencies (use npm ci for a clean install)
npm ci
```

### 2. Running Locally (Development Server)

To start the Expo development server:

```bash
npx expo start
```

Once the server is running, you can:
- **Press `a`** to open the app on an Android Emulator.
- **Press `i`** to open the app on an iOS Simulator.
- **Scan the QR Code** with the [Expo Go](https://expo.dev/go) app on your physical device (Android/iOS) to view the app live.

> **Note:** If you encounter caching issues with the Metro bundler during development, you can start the server and clear the cache using `npx expo start -c`.

---

## 📦 Building the Android APK

This project is fully configured with Expo Application Services (EAS) to build a standalone Android `.apk` file.

### Step 1: Login to EAS
Ensure you are logged into your Expo account via the EAS CLI.

```bash
eas login
```

### Step 2: Run the Build Command
To trigger an Android APK build, run the following command. The `preview` profile in our `eas.json` is specifically configured to generate an `.apk` file instead of an Android App Bundle (`.aab`).

```bash
eas build --profile preview --platform android
```

### Step 3: Download and Install
Once the build is complete, EAS will provide a direct download link to your `.apk` file in the terminal. You can download this file and install it directly on any Android device.

---

## 📂 Project Structure

```
234Deals/
├── app/                  # Expo Router file-based navigation screens
│   ├── _layout.tsx       # Root layout and global providers
│   ├── index.tsx         # Product Listing Screen (Home)
│   └── product/          # Dynamic routes for Product Details
├── components/           # Reusable UI components (ProductCard, Skeletons, etc.)
│   └── ui/               # Granular UI elements (Badge, RatingStars, Spinner)
├── hooks/                # Custom React hooks (e.g., useProducts)
├── lib/                  # Utilities, type definitions, and constants
├── services/             # API configuration and network requests (Axios)
├── store/                # Zustand global state management
├── global.css            # NativeWind global CSS configuration
├── app.json              # Expo application configuration
└── eas.json              # EAS build profiles and configuration
```

---

## 📝 License

This project was built as part of an interview process assessment.
