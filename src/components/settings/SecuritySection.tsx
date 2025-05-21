import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import React from 'react';

// Define types for the component
export type SecurityTab = 'sessions' | 'two-factor' | 'recovery-codes';

interface LoginHistoryItem {
  id: string;
  device: string;
  os: string;
  browser: string;
  ip: string;
  location: string;
  timestamp: Date;
  status: 'success' | 'failed';
}

interface SecurityLogItem {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  status: string;
}

interface RecoveryCode {
  id: string;
  code: string;
  used: boolean;
}

interface SecurityData {
  activeTab?: SecurityTab;
  showQRCode?: boolean;
  qrCodeData?: string;
  verificationCode?: string;
  recoveryCodes?: RecoveryCode[];
  showRecoveryCodes?: boolean;
  loginHistory?: LoginHistoryItem[];
  securityLog?: SecurityLogItem[];
  loading?: {
    twoFactor?: boolean;
    recoveryCodes?: boolean;
  };
  twoFactor?: boolean;
}

interface SecuritySectionProps {
  formData: {
    twoFactorEnabled: boolean;
    recoveryCodes?: RecoveryCode[];
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    twoFactorEnabled: boolean;
    recoveryCodes?: RecoveryCode[];
    [key: string]: any;
  }>>;
  securityData: SecurityData;
  setSecurityData: React.Dispatch<React.SetStateAction<SecurityData>>;
  onTwoFactorSetup: () => Promise<{ success: boolean; qrCode: string; secret: string }>;
  onVerifyTwoFactor: (code: string) => Promise<{ success: boolean }>;
  onGenerateRecoveryCodes: () => Promise<{ success: boolean; codes: RecoveryCode[] }>;
  onTabChange: (value: SecurityTab) => void;
}

export function SecuritySection({
  formData,
  setFormData,
  securityData,
  setSecurityData,
  onTwoFactorSetup,
  onVerifyTwoFactor,
  onGenerateRecoveryCodes,
  onTabChange
}: SecuritySectionProps) {
  const [verificationCode, setVerificationCode] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState({
    twoFactor: false,
    recoveryCodes: false
  });

  const handleEnableTwoFactor = async () => {
    try {
      setIsLoading(prev => ({ ...prev, twoFactor: true }));
      const result = await onTwoFactorSetup();
      if (result.success) {
        setSecurityData(prev => ({
          ...prev,
          showQRCode: true,
          qrCodeData: result.qrCode,
          verificationCode: result.secret
        }));
      }
    } catch (error) {
      console.error('Error enabling two-factor authentication:', error);
      toast.error('Failed to set up two-factor authentication');
    } finally {
      setIsLoading(prev => ({ ...prev, twoFactor: false }));
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, twoFactor: true }));
      const result = await onVerifyTwoFactor(verificationCode);
      if (result.success) {
        setFormData(prev => ({ ...prev, twoFactorEnabled: true }));
        setSecurityData(prev => ({
          ...prev,
          showQRCode: false,
          qrCodeData: undefined,
          verificationCode: undefined
        }));
        toast.success('Two-factor authentication enabled successfully');
      }
    } catch (error) {
      console.error('Error verifying verification code:', error);
      toast.error('Failed to verify verification code');
    } finally {
      setIsLoading(prev => ({ ...prev, twoFactor: false }));
    }
  };

  const handleGenerateRecoveryCodes = async () => {
    try {
      setIsLoading(prev => ({ ...prev, recoveryCodes: true }));
      const result = await onGenerateRecoveryCodes();
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          recoveryCodes: result.codes
        }));
        setSecurityData(prev => ({
          ...prev,
          showRecoveryCodes: true
        }));
      }
    } catch (error) {
      console.error('Error generating recovery codes:', error);
      toast.error('Failed to generate recovery codes');
    } finally {
      setIsLoading(prev => ({ ...prev, recoveryCodes: false }));
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800">Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Tabs 
          value={securityData.activeTab || 'two-factor'} 
          onValueChange={(value: string) => onTabChange(value as SecurityTab)}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="two-factor">
              <Shield className="h-4 w-4 mr-2" />
              Two-Factor Auth
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Clock className="h-4 w-4 mr-2" />
              Active Sessions
            </TabsTrigger>
            <TabsTrigger value="recovery-codes">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Recovery Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="two-factor">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={formData.twoFactorEnabled}
                    onCheckedChange={handleEnableTwoFactor}
                    disabled={isLoading.twoFactor}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading.twoFactor ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : securityData.showQRCode ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img src={securityData.qrCodeData} alt="2FA QR Code" className="h-48 w-48" />
                    </div>
                    <div className="space-y-2">
                      <Label>Verification Code</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Enter 6-digit code"
                        />
                        <Button onClick={handleVerifyCode}>
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <Button variant="outline" size="sm" onClick={() => onTabChange('sessions')}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityData.loginHistory?.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.device}</TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>{session.ip}</TableCell>
                        <TableCell>
                          <Badge variant={session.status === 'success' ? 'default' : 'destructive'}>
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {(new Date(session.timestamp)).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery-codes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Recovery Codes</h3>
                    <p className="text-sm text-muted-foreground">
                      Save these codes in a safe place. You can use them to access your account if you lose access to your device.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateRecoveryCodes}
                    disabled={isLoading.recoveryCodes}
                  >
                    {isLoading.recoveryCodes ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Generate New Codes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(formData.recoveryCodes?.length ?? 0) > 0 ? (
                  <div className="grid grid-cols-2 gap-2 p-4 bg-muted/50 rounded-md">
                    {formData.recoveryCodes?.map((code) => (
                      <div 
                        key={code.id} 
                        className={`font-mono p-2 text-center ${code.used ? 'line-through text-muted-foreground' : 'font-bold'}`}
                      >
                        {code.code}
                      </div>
                    )) ?? []}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No recovery codes generated yet.</p>
                    <Button 
                      className="mt-4" 
                      onClick={handleGenerateRecoveryCodes}
                      disabled={isLoading.recoveryCodes}
                    >
                      {isLoading.recoveryCodes ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Generate Recovery Codes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
