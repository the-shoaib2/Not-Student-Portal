import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  error: string;
  success: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading?: boolean;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  isOpen,
  onClose,
  email,
  setEmail,
  error,
  success,
  onSubmit,
  isLoading = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Forgot Password</DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Enter your email address and we'll send you a reset link.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-3 pt-2">
          <div className="mb-2">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs"
            />
          </div>

          {error && (
            <div className="text-xs text-red-500 mb-2">{error}</div>
          )}
          
          {success && (
            <div className="text-xs text-green-500 mb-2">{success}</div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-teal-600 hover:text-teal-700 text-xs py-1 px-3 h-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs py-1 px-3 h-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
