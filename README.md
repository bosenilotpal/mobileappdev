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

## Expo build (EAS) — finished artifact

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for installable builds. A submission-ready build must show status **finished** in the Expo dashboard.

### Create a build (first time)

1. Install EAS CLI and log in:

```bash
npm install -g eas-cli
eas login
```

2. Configure the project (if prompted):

```bash
eas build:configure
```

3. Start a build (example: Android preview APK):

```bash
eas build --platform android --profile preview
```

4. When the build completes, open the **finished** build in the Expo dashboard and copy the artifact link.

### View all builds

1. Sign in at https://expo.dev  
2. Open project **RestaurantChooser** → **Builds**  
3. Open the build with status **finished** and copy the artifact URL  

Direct dashboard path (replace `YOUR_EXPO_USERNAME` with your Expo account username):

`https://expo.dev/accounts/YOUR_EXPO_USERNAME/projects/RestaurantChooser/builds`

### Finished build artifact link

**Build artifact (status: finished):**  
<!-- Update this line after your EAS build completes -->
`https://expo.dev/artifacts/eas/YOUR-BUILD-ID`

Replace `YOUR-BUILD-ID` with the ID from the finished build page (Build details → **Artifact** / **Install** link).

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
