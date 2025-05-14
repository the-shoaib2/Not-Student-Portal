import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Student Portal',
  description: 'Privacy Policy for Daffodil International University Student Portal',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
        <p>We collect information necessary for providing educational services, including:</p>
        <ul className="list-disc pl-5">
          <li>Personal identification information</li>
          <li>Academic records</li>
          <li>Contact details</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-5">
          <li>Provide educational services</li>
          <li>Communicate important updates</li>
          <li>Improve our student portal</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">3. Data Protection</h2>
        <p>We implement appropriate security measures to protect your personal information.</p>
      </section>
      
      <p className="text-sm text-gray-600">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
