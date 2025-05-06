import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import PageTitle from '../components/PageTitle';
import PersonalTab from '../components/profile-update-tabs/PersonalTab';
import GuardianTab from '../components/profile-update-tabs/GuardianTab';
import PhotographTab from '../components/profile-update-tabs/PersonalTab';
import InsuranceTab from '../components/profile-update-tabs/InsuranceTab';
import DegreeListTab from '../components/profile-update-tabs/DegreeListTab';
import EducationListTab from '../components/profile-update-tabs/EducationListTab';

const ProfileUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loadedTabs, setLoadedTabs] = useState<{ [key: string]: boolean }>({ personal: true });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setLoadedTabs(prev => ({ ...prev, [tab]: true }));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-start">
      <div className="w-full bg-white border-b">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PageTitle title="Profile Information" icon="UserCog" />
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
        <div className="mb-6 w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
            <TabsList className="mb-4 flex justify-center w-full">
              <TabsTrigger value="personal">PERSONAL</TabsTrigger>
              <TabsTrigger value="guardian">GUARDIAN</TabsTrigger>
              <TabsTrigger value="photograph">PHOTOGRAPH</TabsTrigger>
              <TabsTrigger value="insurance">INSURANCE</TabsTrigger>
              <TabsTrigger value="degreeList">DEGREE LIST</TabsTrigger>
              <TabsTrigger value="educationList">EDUCATION LIST</TabsTrigger>
            </TabsList>
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl">
                <TabsContent value="personal">{loadedTabs.personal && <PersonalTab />}</TabsContent>
                <TabsContent value="guardian">{loadedTabs.guardian && <GuardianTab />}</TabsContent>
                <TabsContent value="photograph">{loadedTabs.photograph && <PhotographTab />}</TabsContent>
                <TabsContent value="insurance">{loadedTabs.insurance && <InsuranceTab />}</TabsContent>
                <TabsContent value="degreeList">{loadedTabs.degreeList && <DegreeListTab />}</TabsContent>
                <TabsContent value="educationList">{loadedTabs.educationList && <EducationListTab />}</TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;