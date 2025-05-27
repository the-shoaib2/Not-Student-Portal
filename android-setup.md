# Android Setup Guide for Not Student Portal

This guide will help you set up the Android version of your Not Student Portal app using Capacitor.

## Prerequisites

- Android Studio installed
- JDK 11 or newer
- Android SDK installed

## Setup Steps

1. **Create Android project folder**

   Create a folder named `android` in your project root.

2. **Add basic Android project structure**

   Inside the `android` folder, create the following structure:
   ```
   android/
   ├── app/
   │   ├── src/
   │   │   ├── main/
   │   │   │   ├── java/
   │   │   │   │   └── com/
   │   │   │   │       └── notstudent/
   │   │   │   │           └── portal/
   │   │   │   │               └── MainActivity.java
   │   │   │   ├── res/
   │   │   │   │   ├── values/
   │   │   │   │   │   └── strings.xml
   │   │   │   │   └── xml/
   │   │   │   │       └── config.xml
   │   │   │   └── AndroidManifest.xml
   │   │   └── build.gradle
   │   └── build.gradle
   ├── gradle/
   │   └── wrapper/
   │       ├── gradle-wrapper.jar
   │       └── gradle-wrapper.properties
   ├── build.gradle
   ├── gradle.properties
   └── settings.gradle
   ```

3. **MainActivity.java content**

   ```java
   package com.notstudent.portal;

   import android.os.Bundle;
   import com.getcapacitor.BridgeActivity;

   public class MainActivity extends BridgeActivity {
       @Override
       public void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
       }
   }
   ```

4. **AndroidManifest.xml content**

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       package="com.notstudent.portal">

       <application
           android:allowBackup="true"
           android:icon="@mipmap/ic_launcher"
           android:label="@string/app_name"
           android:roundIcon="@mipmap/ic_launcher_round"
           android:supportsRtl="true"
           android:theme="@style/AppTheme">

           <activity
               android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
               android:name="com.notstudent.portal.MainActivity"
               android:label="@string/app_name"
               android:theme="@style/AppTheme.NoActionBarLaunch"
               android:launchMode="singleTask"
               android:exported="true">

               <intent-filter>
                   <action android:name="android.intent.action.MAIN" />
                   <category android:name="android.intent.category.LAUNCHER" />
               </intent-filter>

           </activity>

           <provider
               android:name="androidx.core.content.FileProvider"
               android:authorities="${applicationId}.fileprovider"
               android:exported="false"
               android:grantUriPermissions="true">
               <meta-data
                   android:name="android.support.FILE_PROVIDER_PATHS"
                   android:resource="@xml/file_paths" />
           </provider>
       </application>

       <!-- Permissions -->
       <uses-permission android:name="android.permission.INTERNET" />
       <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   </manifest>
   ```

5. **config.xml content**

   ```xml
   <?xml version='1.0' encoding='utf-8'?>
   <widget version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
     <access origin="*" />
     <allow-intent href="http://*/*" />
     <allow-intent href="https://*/*" />
   </widget>
   ```

6. **Open in Android Studio**

   Open the `android` folder in Android Studio to build and run the app.

## Building the APK

1. In Android Studio, go to `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`

## Testing on Device

1. Enable Developer Options and USB Debugging on your Android device
2. Connect your device to your computer
3. Run the app from Android Studio or install the APK directly

## Updating the App

Since the app loads content from your Vercel deployment, you only need to update your Vercel site to update the app content. You only need to rebuild and redeploy the Android app if you make changes to the native wrapper.
