import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CertificateVerify: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    try {
      // TODO: Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            isValid: Math.random() > 0.5,
            message: Math.random() > 0.5 
              ? 'Certificate is valid and verified'
              : 'Certificate not found or invalid'
          });
        }, 1000);
      });

      setVerificationResult(response as { isValid: boolean; message: string });
    } catch (error) {
      setVerificationResult({
        isValid: false,
        message: 'Error verifying certificate'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Certificate Verification</h1>
        <p className="text-gray-600 mb-8">Verify the authenticity of your certificate using the certificate ID</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
                Certificate ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter certificate ID"
                  required
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Verify Certificate
            </button>
          </form>

          {verificationResult && (
            <div className={`mt-6 p-4 rounded-md ${
              verificationResult.isValid 
                ? 'bg-green-50 text-green-800' 
                : 'bg-red-50 text-red-800'
            }`}>
              <p className="text-sm font-medium">{verificationResult.message}</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">How to Verify</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Enter the certificate ID found on your certificate</li>
            <li>Click the "Verify Certificate" button</li>
            <li>View the verification result</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify; 