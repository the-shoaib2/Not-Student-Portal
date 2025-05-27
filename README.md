# Not Student Portal

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Android Setup

This guide will help you set up the Android version of your Not Student Portal app using Capacitor.

### Prerequisites

- Android Studio installed
- JDK 11 or newer
- Android SDK installed

### Setup Steps

1. **Build your Next.js app**

   ```bash
   npm run build
   ```

2. **Sync your web app with Capacitor**

   ```bash
   npx cap sync
   ```

3. **Open Android Studio with your project**

   ```bash
   npx cap open android
   ```

4. **Run the app in Android Studio**

   Click the "Run" button (green play icon) in Android Studio to build and run the app on an emulator or connected device.

### Rebuilding After Changes

When you make changes to your web app, run the following commands to update the Android app:

```bash
npm run build && npx cap sync && npx cap open android
```

### Customizing App Icon

The app icon has been customized to use the project's logo. If you need to update the icon:

1. Place your new logo in the `public` directory
2. Run the `copy-logo.ps1` script to copy it to all Android mipmap directories:

   ```bash
   powershell -ExecutionPolicy Bypass -File copy-logo.ps1
   ```

3. Rebuild the Android app in Android Studio
