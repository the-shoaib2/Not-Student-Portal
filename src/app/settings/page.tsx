"use client"

import React, { useState } from 'react';
import PageTitle from '@/components/PageTitle';

// Import settings components
import { AppearanceSection } from '@/components/settings/AppearanceSection';
import { SecuritySection } from '@/components/settings/SecuritySection';
import { PrivacySection } from '@/components/settings/PrivacySection';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { ActiveSessions } from '@/components/settings/ActiveSessions';
import { Settings } from 'lucide-react';

interface FormData {
  theme: string;
  fontSize: string;
  reducedMotion: boolean;
  twoFactorEnabled: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    publicProfile: boolean;
    profileVisibility: string;
  };
}

import { SecurityTab } from '@/components/settings/SecuritySection';

interface SecurityData {
  activeTab: SecurityTab;
  showQRCode: boolean;
  qrCodeData: string;
  verificationCode: string;
  recoveryCodes: any[];
  showRecoveryCodes: boolean;
  loginHistory: any[];
  securityLog: any[];
  loading: {
    twoFactor: boolean;
    recoveryCodes: boolean;
  };
}

const SettingsPage = () => {
  const [formData, setFormData] = useState<FormData>({
    theme: 'light',
    fontSize: 'medium',
    reducedMotion: false,
    twoFactorEnabled: false,
    notifications: {
      email: true,
      push: true,
      inApp: true,
    },
    privacy: {
      publicProfile: true,
      profileVisibility: 'public',
    },
  });

  const [securityData, setSecurityData] = useState<SecurityData>({
    activeTab: 'two-factor', // Default to first valid tab
    showQRCode: false,
    qrCodeData: '',
    verificationCode: '',
    recoveryCodes: [],
    showRecoveryCodes: false,
    loginHistory: [],
    securityLog: [],
    loading: {
      twoFactor: false,
      recoveryCodes: false,
    },
  });

  const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <div className="space-y-6">
      <PageTitle
        title="Settings"
        icon={<Settings />}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* First Row - Appearance and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AppearanceSection
            formData={formData}
            setFormData={setFormData as any}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />

          <NotificationsSection
            formData={formData as any}
            setFormData={setFormData as any}
          />
        </div>

        {/* Second Row - Security and Privacy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecuritySection
            formData={{
              twoFactorEnabled: formData.twoFactorEnabled,
              recoveryCodes: securityData.recoveryCodes,
            }}
            setFormData={(updater) => {
              setFormData(prev => {
                const newState = typeof updater === 'function' ? updater(prev) : updater;
                return { ...prev, ...newState };
              });
            }}
            securityData={securityData}
            setSecurityData={setSecurityData as any}
            onTwoFactorSetup={async () => {
              // Mock implementation - replace with actual API call
              return {
                success: true,
                qrCode: 'data:image/png;base64,example',
                secret: 'JBSWY3DPEHPK3PXP'
              };
            }}
            onVerifyTwoFactor={async (code: string) => {
              // Mock implementation - replace with actual API call
              console.log('Verifying 2FA code:', code);
              return { success: true };
            }}
            onGenerateRecoveryCodes={async () => {
              // Mock implementation - replace with actual API call
              const codes = Array(10).fill(0).map((_, i) => ({
                id: `code-${i}`,
                code: Math.random().toString(36).substring(2, 8).toUpperCase(),
                used: false
              }));
              setSecurityData(prev => ({
                ...prev,
                recoveryCodes: codes
              }));
              return { success: true, codes };
            }}
            onTabChange={(tab) => {
              setSecurityData(prev => ({
                ...prev,
                activeTab: tab as SecurityTab
              }));
            }}
          />

          {/* <div className="space-y-6"> */}
            <PrivacySection
              formData={formData}
              setFormData={setFormData as any}
            />
            {/* <ActiveSessions /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
