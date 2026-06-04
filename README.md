# Restaurant Chooser

A React Native (Expo) app for managing people and restaurants, then running a group decision flow with filters, random selection, and per-person vetoes.

**Repository:** https://github.com/bosenilotpal/mobileappdev

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended, v18+)
- npm (included with Node.js)
- [Expo Go](https://expo.dev/go) on your phone (optional, for device testing)
- Android Studio emulator or Xcode (optional, for simulators)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/bosenilotpal/mobileappdev.git
cd mobileappdev
```

2. Install dependencies:

```bash
npm install
```

## Run the app (development)

Start the Expo development server:

```bash
npm start
```

Then choose how to open the app:

| Command | Description |
|---------|-------------|
| `npm start` | Opens Expo Dev Tools (Metro on port 8081) |
| `npm run android` | Opens on Android emulator or connected device |
| `npm run ios` | Opens on iOS simulator (macOS only) |
| `npm run web` | Runs in the browser |

From the Expo terminal you can also press:

- `w` — web
- `a` — Android
- `i` — iOS (Mac only)

Scan the QR code with **Expo Go** to run on a physical device (same Wi‑Fi network as your computer).

## App overview

Three main tabs:

- **People** — add, list, and delete people (AsyncStorage)
- **Restaurants** — add, list, and delete restaurants with validation (AsyncStorage)
- **Decision** — choose who is going, apply optional filters, random pick, accept/veto, final outcome

### Project structure

```
├── App.js                 # Root app + toast
├── components/            # CustomButton, CustomTextInput, CustomPickerField, navigation
├── screens/
│   ├── people/            # List + add + stack navigator
│   ├── restaurants/       # List + add + validators + stack navigator
│   └── decision/          # Decision flow screens + logic
├── assets/                # App icons and splash images
└── week 3-5/snapshots/    # Evaluation screenshots (add your own)
```

## Publish on [Expo](https://expo.dev/)

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/). Publishing creates a cloud build on Expo and lists it under your **RestaurantChooser** project.

### One-time setup (run in your terminal)

```bash
npm install -g eas-cli
eas login
eas init
```

`eas init` links this repo to a project on https://expo.dev and adds a `projectId` to `app.json`.

### Publish a build (Android APK — recommended for testing)

```bash
npm run build:preview
```

Or:

```bash
eas build --platform android --profile preview
```

- First build may prompt you to generate Android credentials — choose **Generate new keystore**.
- Wait until status is **finished** on the Expo dashboard.
- Open the build page and copy the **artifact** / **Install** link.

### View your published builds

1. Sign in at [expo.dev](https://expo.dev/)
2. Open **RestaurantChooser** → **Builds**
3. Select the row with status **finished**

### Finished build artifact link (coursework)

**Build artifact (status: finished):**  
https://expo.dev/accounts/bosenilotpal/projects/RestaurantChooser/builds/50093131-0299-443e-8b0c-506b03d23476

### Production build (optional)

```bash
npm run build:android
```

Example of what to look for in the dashboard:

- Status: **finished**
- Platform: Android and/or iOS
- Artifact: `.apk`, `.aab`, or `.ipa` download link

## Evaluation checklist (Week 3–5)

1. Run the app and verify People CRUD
2. Run the app and verify Restaurants CRUD
3. Run the Decision flow (select people → filter → random → accept/veto)
4. Save list screenshots under `week 3-5/snapshots/`
5. Push code to GitHub and submit the repository link on elearn
6. Submit the **finished** Expo build artifact link (see above)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `expo` not recognized | Use `npm start` (runs local `node_modules`) |
| Port 8081 in use | Stop other Metro/Expo processes or restart the terminal |
| Module not found after pull | Run `npm install` again |
| `@expo/vector-icons` error | Run `npx expo install @expo/vector-icons` |

## Tech stack

- Expo SDK 56
- React Native 0.85
- React Navigation (Material Top Tabs + Stack)
- AsyncStorage, react-native-toast-message, @react-native-picker/picker

## Documentation

Expo SDK 56 docs: https://docs.expo.dev/versions/v56.0.0/
