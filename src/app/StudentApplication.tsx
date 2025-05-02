import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

const StudentApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    semester: '',
    department: '',
    address: '',
    previousEducation: '',
    documents: null as FileList | null,
  });

  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus({ type: null, message: '' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionStatus({
        type: 'success',
        message: 'Application submitted successfully! We will contact you soon.'
      });
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, documents: e.target.files }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Student Application</h1>
        <p className="text-gray-600 mb-8">Fill out the form below to apply for admission</p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                  Program
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Program</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="eee">Electrical & Electronic Engineering</option>
                  <option value="bba">Business Administration</option>
                  <option value="llb">Law</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="eee">Electrical & Electronic Engineering</option>
                  <option value="bba">Business Administration</option>
                  <option value="law">Law</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label htmlFor="previousEducation" className="block text-sm font-medium text-gray-700 mb-1">
                Previous Education
              </label>
              <textarea
                id="previousEducation"
                name="previousEducation"
                value={formData.previousEducation}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                Required Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="documents"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="documents"
                        name="documents"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
            </div>

            {submissionStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submissionStatus.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p className="text-sm font-medium">{submissionStatus.message}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentApplication; 