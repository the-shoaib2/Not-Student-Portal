"use client"

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Monitor, Apple, Check, Loader2 } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import Link from 'next/link';

const DownloadPage: React.FC = () => {
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState<{
    platform: string;
    status: 'idle' | 'downloading' | 'success' | 'error';
    error?: string;
  } | null>(null);

  useEffect(() => {
    // Detect device type
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (/android/i.test(userAgent)) {
        setDeviceType('android');
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        setDeviceType('ios');
      } else if (/windows/i.test(userAgent)) {
        setDeviceType('windows');
      } else {
        setDeviceType('unknown');
      }
      
      setIsLoading(false);
    };

    // Run detection after component mounts
    detectDevice();
  }, []);

  // Define app versions with platform identifiers matching device detection
  const appVersions = [
    {
      platform: 'Android',
      icon: <Smartphone size={24} />,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      recommendedBg: 'bg-green-500',
      description: 'Download our Android app for a seamless mobile experience on your Android device.',
      downloadUrl: '/api/download/android',
      version: '1.0.0',
      size: '15 MB',
      instructions: [
        'Download the APK file',
        'Open the file from your downloads',
        'If prompted, allow installation from unknown sources',
        'Follow the on-screen instructions to complete installation'
      ]
    },
    {
      platform: 'iOS',
      icon: <Apple size={24} />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      recommendedBg: 'bg-blue-500',
      description: 'Get our iOS app for your iPhone or iPad for the best experience on Apple devices.',
      downloadUrl: '/api/download/ios',
      version: '1.0.0',
      size: '18 MB',
      instructions: [
        'Download the IPA file',
        'Use AltStore or similar to install on your device',
        'Trust the developer in Settings > General > Device Management'
      ]
    },
    {
      platform: 'Windows',
      icon: <Monitor size={24} />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      recommendedBg: 'bg-purple-500',
      description: 'Install our Windows app for a desktop experience with offline capabilities.',
      downloadUrl: '/api/download/windows',
      version: '1.0.0',
      size: '25 MB',
      instructions: [
        'Download the installer (.exe file)',
        'Run the installer as administrator',
        'Follow the installation wizard',
        'Launch the app from your Start menu'
      ]
    }
  ];

  // Function to handle the download process
  const handleDownload = async (platform: string, downloadUrl: string) => {
    try {
      setDownloadStatus({
        platform,
        status: 'downloading'
      });
      
      // For Android APK, we need to handle the download manually
      if (platform.toLowerCase() === 'android') {
        const response = await fetch(downloadUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Get the blob from the response
        const blob = await response.blob();
        
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'not-student-portal.apk';
        
        // Add to the DOM and trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setDownloadStatus({
          platform,
          status: 'success'
        });
      } else {
        // For other platforms, we can use the direct link
        window.location.href = downloadUrl;
        
        // Set a timeout to update the status after a short delay
        setTimeout(() => {
          setDownloadStatus({
            platform,
            status: 'success'
          });
        }, 1000);
      }
    } catch (error) {
      console.error(`Error downloading ${platform} app:`, error);
      setDownloadStatus({
        platform,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  return (
    <div className="flex-grow ">

<PageTitle title="Download Our Apps" icon={<Download />} />
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 pt-10 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access the Student Portal anytime, anywhere with our cross-platform applications.
            Choose the version that works best for your device.
          </p>
        </div>
        {/* App Logo Section */}
        {/* <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 bg-white rounded-xl shadow-md p-4">
            <Image
              src="/diuLogo.png"
              alt="Student Portal Logo"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-2"
            />
          </div>
        </div> */}



        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {appVersions.map((app, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
              {!isLoading && deviceType && deviceType !== 'unknown' && 
                deviceType === app.platform.toLowerCase() && (
                <div className={`absolute top-0 right-0 ${app.recommendedBg} text-white text-xs font-bold px-2 py-1 rounded-bl-md z-10`}>
                  Recommended
                </div>
              )}
              <div className="p-6">
                <div className={`${app.iconBg} ${app.iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  {app.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{app.platform}</h3>
                <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Version: {app.version}</span>
                  <span>Size: {app.size}</span>
                </div>
                <button 
                  onClick={() => handleDownload(app.platform, app.downloadUrl)}
                  disabled={downloadStatus?.platform === app.platform && downloadStatus?.status === 'downloading'}
                  className="flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {downloadStatus?.platform === app.platform && downloadStatus?.status === 'downloading' ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} className="mr-2" />
                      Download
                    </>
                  )}
                </button>
                
                {/* Installation Instructions */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Installation Instructions</h4>
                  <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                    {app.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                {downloadStatus?.platform === app.platform && downloadStatus?.status === 'error' && (
                  <p className="text-red-500 text-xs mt-2">{downloadStatus.error || 'Download failed. Please try again.'}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Installation Instructions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Android</h3>
              <ol className="list-decimal list-inside text-gray-600 ml-4 text-sm">
                <li>Download the APK file</li>
                <li>Open the file from your downloads</li>
                <li>If prompted, allow installation from unknown sources</li>
                <li>Follow the on-screen instructions to complete installation</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">iOS</h3>
              <ol className="list-decimal list-inside text-gray-600 ml-4 text-sm">
                <li>Download the IPA file</li>
                <li>Use AltStore or similar to install on your device</li>
                <li>Trust the developer in Settings {">"}  General {">"} Device Management</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Windows</h3>
              <ol className="list-decimal list-inside text-gray-600 ml-4 text-sm">
                <li>Download the installer (.exe file)</li>
                <li>Run the installer as administrator</li>
                <li>Follow the installation wizard</li>
                <li>Launch the app from your Start menu</li>
              </ol>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DownloadPage;