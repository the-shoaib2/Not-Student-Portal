"use client"

import React, { useState } from 'react';
import { UserCog } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageTitle from '@/components/PageTitle';
import PersonalTab from '@/components/profile-update-tabs/PersonalTab';
import GuardianTab from '@/components/profile-update-tabs/GuardianTab';
import PhotographTab from '@/components/profile-update-tabs/PhotographTab';
import InsuranceTab from '@/components/profile-update-tabs/InsuranceTab';
import DegreeListTab from '@/components/profile-update-tabs/DegreeListTab';
import EducationListTab from '@/components/profile-update-tabs/EducationListTab';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ProfileUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loadedTabs, setLoadedTabs] = useState<{ [key: string]: boolean }>({
    personal: true,
    guardian: false,
    photograph: false,
    insurance: false,
    degreeList: false,
    educationList: false
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setLoadedTabs(prev => ({ ...prev, [tab]: true }));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-start">
      <div className="w-full bg-white border-b">
        <PageTitle
          title={"Profile Information"}
          icon={<UserCog />}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
        <div className="space-y-6">
          <div className="w-[90%] mx-auto">
            <Alert className="mb-4 bg-transparent border-0">
              <AlertTitle className="text-primary">Note:</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-0">
                  <li className="text-teal-700">To update your profile Click on Personal, Guardian, Contact/Address, Education/Training, Photograph.</li>
                  <li className="text-teal-700">Some fields which are blocked are not updatable.</li>
                  <li className="text-amber-500">If you want to update blocked fields, please contact the admission office.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          <div className="w-full">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
              <TabsList>
                <TabsTrigger value="personal">PERSONAL</TabsTrigger>
                <TabsTrigger value="guardian">GUARDIAN</TabsTrigger>
                <TabsTrigger value="photograph">PHOTOGRAPH</TabsTrigger>
                <TabsTrigger value="insurance">INSURANCE</TabsTrigger>
                <TabsTrigger value="degreeList">DEGREE LIST</TabsTrigger>
                <TabsTrigger value="educationList">EDUCATION LIST</TabsTrigger>
              </TabsList>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl">
                  <TabsContent value="personal" className="mt-4">
                    {loadedTabs.personal && <PersonalTab />}
                  </TabsContent>
                  <TabsContent value="guardian" className="mt-4">
                    {loadedTabs.guardian && <GuardianTab />}
                  </TabsContent>
                  <TabsContent value="photograph" className="mt-4">
                    {loadedTabs.photograph && <PhotographTab />}
                  </TabsContent>
                  <TabsContent value="insurance" className="mt-4">
                    {loadedTabs.insurance && <InsuranceTab />}
                  </TabsContent>
                  <TabsContent value="degreeList" className="mt-4">
                    {loadedTabs.degreeList && <DegreeListTab />}
                  </TabsContent>
                  <TabsContent value="educationList" className="mt-4">
                    {loadedTabs.educationList && <EducationListTab />}
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;