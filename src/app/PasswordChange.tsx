import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { authService } from '../services/api';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

const PasswordChange: React.FC = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, message: '' };
    
    let score = 0;
    const messages = [];

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) messages.push('Add uppercase, numbers, and special characters');
    if (password.length < 8) messages.push('Make it at least 8 characters long');
    if (!/[A-Z]/.test(password)) messages.push('Include an uppercase letter');
    if (!/[a-z]/.test(password)) messages.push('Include a lowercase letter');
    if (!/[0-9]/.test(password)) messages.push('Include a number');
    if (!/[^A-Za-z0-9]/.test(password)) messages.push('Include a special character');

    return {
      score,
      message: messages.join(', ')
    };
  };

  const validate = () => {
    const errs: { [k: string]: string } = {};
    
    if (!form.oldPassword) {
      errs.oldPassword = 'Required';
    }

    if (!form.newPassword) {
      errs.newPassword = 'Required';
    } else {
      if (form.newPassword === form.oldPassword) {
        errs.newPassword = 'New password must be different from old password';
      }
      
      const strength = getPasswordStrength(form.newPassword);
      if (strength.score < 3) {
        errs.newPassword = `Weak password. ${strength.message}`;
      }
    }

    if (form.newPassword !== form.confirmNewPassword) {
      errs.confirmNewPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShow = (field: 'old' | 'new' | 'confirm') => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        throw new Error('User data not found');
      }
      const userData = JSON.parse(userJson);
      
      const requestData = {
        ...form,
        email: userData.email || '',
        phone: userData.phone || '',
      };

      await authService.changePassword(requestData);
      toast.success('Password changed successfully!');
      setForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err: any) {
      if (err.message?.includes('old password')) {
        setErrors(prev => ({ ...prev, oldPassword: 'Invalid old password' }));
      }
      toast.error(err?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle title="Change Password" icon="Lock" />
      <div className="flex justify-center items-center min-h-[60vh] p-4 md:p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Old Password</label>
                <div className="relative">
                  <Input
                    name="oldPassword"
                    type={show.old ? 'text' : 'password'}
                    value={form.oldPassword}
                    onChange={handleChange}
                    className={`pr-10 ${errors.oldPassword ? 'border-red-500' : ''}`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleShow('old')}
                    tabIndex={-1}
                  >
                    {show.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.oldPassword && (
                  <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.oldPassword}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={show.new ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={handleChange}
                    className={`pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleShow('new')}
                    tabIndex={-1}
                  >
                    {show.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.newPassword}
                  </div>
                )}
                {form.newPassword && !errors.newPassword && (
                  <div className="text-xs text-teal-600 mt-1">
                    Password strength: {getPasswordStrength(form.newPassword).score}/5
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <div className="relative">
                  <Input
                    name="confirmNewPassword"
                    type={show.confirm ? 'text' : 'password'}
                    value={form.confirmNewPassword}
                    onChange={handleChange}
                    className={`pr-10 ${errors.confirmNewPassword ? 'border-red-500' : ''}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleShow('confirm')}
                    tabIndex={-1}
                  >
                    {show.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmNewPassword}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  'Change Password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PasswordChange; 