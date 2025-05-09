"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTitle from '@/components/PageTitle'
import { UserCog } from 'lucide-react'
import PersonalTab from '@/components/profile-update-tabs/personal-tab'
import GuardianTab from '@/components/profile-update-tabs/guardian-tab'
import ContactTab from '@/components/profile-update-tabs/contact-tab'
import EducationTab from '@/components/profile-update-tabs/education-tab'
import PhotographTab from '@/components/profile-update-tabs/photograph-tab'
import InsuranceTab from '@/components/profile-update-tabs/insurance-tab'

const ProfileUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="w-full bg-white border-b">
        <PageTitle
          title={"Profile Information"}
          icon={<UserCog />}
        />
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="mb-6 bg-gray-100 p-4 rounded-md">
          <h2 className="font-bold mb-2">Note:</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To update your profile Click on Personal, Guardian, Contact/Address, Education/Training, Photograph.</li>
            <li>Some fields which are blocked are not updatable.</li>
            <li className="text-orange-500">
              If you want to update blocked fields please contact with admission office.
            </li>
          </ul>
        </div>

        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-500 mb-6">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              PERSONAL
            </TabsTrigger>
            <TabsTrigger
              value="guardian"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              GUARDIAN
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              CONTACT / ADDRESS
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              EDUCATION / TRAINING
            </TabsTrigger>
            <TabsTrigger
              value="photograph"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              PHOTOGRAPH
            </TabsTrigger>
            <TabsTrigger
              value="insurance"
              className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
            >
              INSURANCE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalTab />
          </TabsContent>
          <TabsContent value="guardian">
            <GuardianTab />
          </TabsContent>
          <TabsContent value="contact">
            <ContactTab />
          </TabsContent>
          <TabsContent value="education">
            <EducationTab />
          </TabsContent>
          <TabsContent value="photograph">
            <PhotographTab />
          </TabsContent>
          <TabsContent value="insurance">
            <InsuranceTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileUpdate;