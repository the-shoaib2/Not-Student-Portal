import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// This function handles GET requests to /api/download/android
export async function GET() {
  try {
    // Define the path to the APK file
    // In a production environment, you might store this in a more secure location
    // or use a CDN/storage service like AWS S3, Google Cloud Storage, etc.
    const apkFilePath = path.join(process.cwd(), 'public', 'downloads', 'not-student-portal.apk');
    
    // Check if the file exists
    if (!fs.existsSync(apkFilePath)) {
      console.error('APK file not found at path:', apkFilePath);
      return NextResponse.json(
        { error: 'APK file not found' },
        { status: 404 }
      );
    }
    
    // Read the APK file
    const apkFile = fs.readFileSync(apkFilePath);
    
    // Set the response headers to indicate a file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.android.package-archive');
    headers.set('Content-Disposition', 'attachment; filename="not-student-portal.apk"');
    headers.set('Content-Length', apkFile.length.toString());
    
    // Return the APK file as the response
    return new NextResponse(apkFile, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error downloading Android app:', error);
    return NextResponse.json(
      { error: 'Failed to download Android app' },
      { status: 500 }
    );
  }
}
