# iOS Setup Guide for Not Student Portal

This guide will help you set up the iOS version of your Not Student Portal app using Capacitor.

## Prerequisites

- Xcode 12 or newer
- macOS computer
- Apple Developer account (for App Store distribution)
- CocoaPods installed

## Setup Steps

1. **Create iOS project folder**

   Create a folder named `ios` in your project root.

2. **Basic iOS Project Structure**

   Inside the `ios` folder, you'll need to create a basic iOS project structure:
   ```
   ios/
   ├── App/
   │   ├── App/
   │   │   ├── AppDelegate.swift
   │   │   ├── capacitor.config.json (symlink to root)
   │   │   ├── config.xml
   │   │   └── Info.plist
   │   ├── App.xcodeproj/
   │   └── App.xcworkspace/
   └── Podfile
   ```

3. **AppDelegate.swift content**

   ```swift
   import UIKit
   import Capacitor

   @UIApplicationMain
   class AppDelegate: UIResponder, UIApplicationDelegate {

       var window: UIWindow?

       func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
           // Override point for customization after application launch.
           return true
       }

       func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
           // Called when the app was launched with a url
           return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
       }

       func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
           // Called when the app was launched with an activity, including Universal Links
           return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
       }

       override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
           super.touchesBegan(touches, with: event)
           let statusBarRect = UIApplication.shared.statusBarFrame
           if let touchPoint = event?.allTouches?.first?.location(in: self.window) {
               if statusBarRect.contains(touchPoint) {
                   NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
               }
           }
       }

       func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
           NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
       }

       func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
           NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
       }
   }
   ```

4. **Info.plist content**

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>CFBundleDevelopmentRegion</key>
       <string>en</string>
       <key>CFBundleDisplayName</key>
       <string>Not Student Portal</string>
       <key>CFBundleExecutable</key>
       <string>$(EXECUTABLE_NAME)</string>
       <key>CFBundleIdentifier</key>
       <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
       <key>CFBundleInfoDictionaryVersion</key>
       <string>6.0</string>
       <key>CFBundleName</key>
       <string>$(PRODUCT_NAME)</string>
       <key>CFBundlePackageType</key>
       <string>APPL</string>
       <key>CFBundleShortVersionString</key>
       <string>1.0</string>
       <key>CFBundleVersion</key>
       <string>1</string>
       <key>LSRequiresIPhoneOS</key>
       <true/>
       <key>NSAppTransportSecurity</key>
       <dict>
           <key>NSAllowsArbitraryLoads</key>
           <true/>
       </dict>
       <key>UILaunchStoryboardName</key>
       <string>LaunchScreen</string>
       <key>UIMainStoryboardFile</key>
       <string>Main</string>
       <key>UIRequiredDeviceCapabilities</key>
       <array>
           <string>armv7</string>
       </array>
       <key>UISupportedInterfaceOrientations</key>
       <array>
           <string>UIInterfaceOrientationPortrait</string>
           <string>UIInterfaceOrientationLandscapeLeft</string>
           <string>UIInterfaceOrientationLandscapeRight</string>
       </array>
       <key>UISupportedInterfaceOrientations~ipad</key>
       <array>
           <string>UIInterfaceOrientationPortrait</string>
           <string>UIInterfaceOrientationPortraitUpsideDown</string>
           <string>UIInterfaceOrientationLandscapeLeft</string>
           <string>UIInterfaceOrientationLandscapeRight</string>
       </array>
       <key>UIViewControllerBasedStatusBarAppearance</key>
       <true/>
   </dict>
   </plist>
   ```

5. **Podfile content**

   ```ruby
   platform :ios, '13.0'
   use_frameworks!

   # workaround to avoid Xcode caching of Pods that requires
   # Product -> Clean Build Folder after new Cordova plugins installed
   # Requires CocoaPods 1.6 or newer
   install! 'cocoapods', :disable_input_output_paths => true

   def capacitor_pods
     pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
     pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
   end

   target 'App' do
     capacitor_pods
     # Add your Pods here
   end
   ```

6. **Open in Xcode**

   Once you have the basic structure, you would normally run:
   ```
   npx cap open ios
   ```
   
   But since we're setting up manually, open the `ios/App/App.xcworkspace` file in Xcode.

## Building the App

1. In Xcode, select your target device (simulator or connected device)
2. Click the Run button or press Cmd+R

## Creating an IPA for Distribution

1. In Xcode, go to Product > Archive
2. Once archiving is complete, the Organizer window will appear
3. Select your archive and click "Distribute App"
4. Follow the prompts to create an IPA for App Store, Ad Hoc, or Enterprise distribution

## Testing on Device

1. Connect your iOS device to your Mac
2. In Xcode, select your device from the scheme dropdown
3. Click the Run button

## Updating the App

Since the app loads content from your Vercel deployment, you only need to update your Vercel site to update the app content. You only need to rebuild and redeploy the iOS app if you make changes to the native wrapper.
