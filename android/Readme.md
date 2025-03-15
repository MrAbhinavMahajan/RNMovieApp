# Android KT

- The build tool used for Android is **Gradle**
- React Native uses the Android NDK (Native Development Kit) to compile any Java or C/C++ code included in the project.
- The native code is compiled through Gradle during the build process

# Build Process?

# Build Types?

## Development Build:

- The JavaScript bundle is generated **dynamically by Metro**.
- The app includes a JavaScript server running locally to serve updates.
- Source maps are included, and debugging is enabled.

## Release Build:

- The JavaScript bundle is **precompiled and placed inside the APK/AAB**.
- Debugging is disabled, and the code is minified to improve performance and reduce the file size.
- No local server or live-reloading is included, as everything is bundled and packaged into the final app.

## Constant files in Android?

In order to load the .env variables into your build.gradle files, we will need to use a plugin that can read these variables and inject them into the Gradle build process

- .env (Environment Variables)
  - stores environment variables (secrets, configurations) outside your codebase.
- strings.xml (Resource File in Android)
  - stores user interface text for easy localization and management.
  - centralized text management for android.
- gradle.properties (Gradle Build Configuration)
  - manages build configurations and project-specific settings. (like - hermesEnabled, newArchEnabled, etc)

## buildscript components in build.gradle?

- ext
  - extra properties (variables) that can be used throughout the build scripts.
  - Eg: buildToolsVersion, minSdkVersion, etc
- repositories
  - specifies where Gradle should look for dependencies (e.g., Google’s Maven repo, Maven Central)
- dependencies
  - lists Gradle plugins required for the build process.
  - Eg: kotlin-gradle-plugin: Kotlin plugin if using Kotlin.
  - Eg:com.android.tools.build:gradle Android Gradle plugin>

## Environment Variables?

- Environment variables are used to inject configuration values or secrets into your build scripts. They can be accessed in Gradle scripts or your app during runtime.

### Common Uses:

- API keys
- Signing credentials (e.g., Keystore passwords)
- Custom build configurations

### Environment file

- Step 1: Create your .env file with environment variables.
- Step 2: Add a Gradle script to read .env and inject those values into the build script.
- Step 3: Access the environment variables in build.gradle using project.ext.<KEY>

### android/app/build folder

- generated/
  - generated files (such as R.java or other resources) and intermediates from the build process go.
- interpreted/
  - interpreted resources or JavaScript code is stored in its intermediate form.
- kotlin/
  - Kotlin-related files, Android-specific code
- outputs/
  - contains output files from the build process, like the APKs, AABs (Android App Bundles)
- tmp/
  - Temporary files generated during the build process
- cxx/
  - C++ code

### Manual creation of js bundle (index.android.bundle)

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
