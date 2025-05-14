import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Student Portal',
  description: 'Terms and Conditions for Daffodil International University Student Portal',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using the Student Portal, you agree to these terms and conditions.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">2. User Responsibilities</h2>
        <ul className="list-disc pl-5">
          <li>Maintain the confidentiality of your account</li>
          <li>Provide accurate and current information</li>
          <li>Use the portal for intended educational purposes</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
        <p>The Student Portal is provided "as is" without any warranties.</p>
      </section>
      
      <p className="text-sm text-gray-600">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
