"use client"

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTitle from '@/components/PageTitle'
import { UserCog } from 'lucide-react'
import PersonalTab from '@/components/profile-update-tabs/personal-tab'
import GuardianTab from '@/components/profile-update-tabs/guardian-tab'
import ContactTab from '@/components/profile-update-tabs/contact-tab'
import EducationTab from '@/components/profile-update-tabs/education-tab'
import PhotographTab from '@/components/profile-update-tabs/photograph-tab'
import InsuranceTab from '@/components/profile-update-tabs/insurance-tab'
import { profileService } from '@/services/proxy-api'

const ProfileUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal")
  interface ProfileData {
    personal: any;
    guardian: any;
    contact: any;
    education: any;
    photograph: any;
    insurance: any;
    maritalStatus: any[];
    bloodGroup: any[];
    religion: any[];
    district: any[];
    division: any[];
    country: any[];
    degree: any[];
  }

  const [data, setData] = useState<ProfileData>({
    personal: null,
    guardian: null,
    contact: null,
    education: null,
    photograph: null,
    insurance: null,
    maritalStatus: [],
    bloodGroup: [],
    religion: [],
    district: [],
    division: [],
    country: [],
    degree: []
  })

  const fetchGuardianData = async () => {
    try {
      const guardianData = await profileService.getGuardianInfo()
      setData((prev: ProfileData) => ({
        ...prev,
        guardian: guardianData
      }))
      return guardianData
    } catch (error) {
      console.error('Error fetching guardian data:', error)
      throw error
    }
  }

  useEffect(() => {
    // Initial fetch of guardian data
    fetchGuardianData()
  }, [])

  useEffect(() => {
    // Only fetch data if activeTab is defined and not empty
    if (activeTab && activeTab.length > 0) {
      const fetchData = async () => {
        try {
          // Fetch data based on active tab
          switch (activeTab) {
            case "personal":
              if (!data.personal) {
                const personalData = await profileService.personalInfo()
                const maritalStatus = await profileService.maritalStatusList()
                const bloodGroup = await profileService.bloodGroupList()
                const religion = await profileService.religionList()
                setData((prev: any) => ({
                  ...prev,
                  personal: personalData,
                  maritalStatus,
                  bloodGroup,
                  religion
                }))
              }
              break

            case "guardian":
              if (!data.guardian) {
                const guardianData = await profileService.guardianInfo()
                setData((prev: any) => ({
                  ...prev,
                  guardian: guardianData
                }))
              }
              break

            case "contact":
              if (!data.contact) {
                const contactData = await profileService.contactAddress()
                const districtData = await profileService.districtList()
                const divisionData = await profileService.divisionList()
                const countryData = await profileService.countryList()
                setData((prev: any) => ({
                  ...prev,
                  contact: contactData,
                  district: districtData,
                  division: divisionData,
                  country: countryData
                }))
              }
              break

            case "education":
              if (!data.education) {
                const educationData = await profileService.getEducationListUpdate()
                const degreeData = await profileService.degreeList()
                setData((prev: any) => ({
                  ...prev,
                  education: educationData,
                  degree: degreeData
                }))
              }
              break

            case "photograph":
              if (!data.photograph) {
                const photographData = await profileService.photograph()
                setData((prev: any) => ({
                  ...prev,
                  photograph: photographData
                }))
              }
              break

            case "insurance":
              if (!data.insurance) {
                const insuranceData = await profileService.insurance()
                setData((prev: any) => ({
                  ...prev,
                  insurance: insuranceData
                }))
              }
              break
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData()
    }
  }, [activeTab])

  return (
    <div className="w-full">
      <PageTitle
        title={"Profile Information"}
        icon={<UserCog />}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">


        <div className="mb-6 bg-gray-100 w-full max-w-6xl mx-auto p-4 rounded-md">
          <h2 className="font-bold mb-2">Note:</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To update your profile Click on Personal, Guardian, Contact/Address, Education/Training, Photograph.</li>
            <li>Some fields which are blocked are not updatable.</li>
            <li className="text-orange-500">
              If you want to update blocked fields please contact with admission office.
            </li>
          </ul>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-500 mb-6">
              <TabsTrigger
                key="personal"
                value="personal"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                PERSONAL
              </TabsTrigger>
              <TabsTrigger
                key="guardian"
                value="guardian"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                GUARDIAN
              </TabsTrigger>
              <TabsTrigger
                key="contact"
                value="contact"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                CONTACT
              </TabsTrigger>
              <TabsTrigger
                key="education"
                value="education"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                EDUCATION
              </TabsTrigger>
              <TabsTrigger
                key="photograph"
                value="photograph"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                PHOTOGRAPH
              </TabsTrigger>
              <TabsTrigger
                key="insurance"
                value="insurance"
                className="data-[state=active]:bg-blue-700 text-white data-[state=active]:text-white"
              >
                INSURANCE
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalTab
                data={data.personal}
                maritalStatus={data.maritalStatus}
                bloodGroup={data.bloodGroup}
                religion={data.religion}
              />
            </TabsContent>
            <TabsContent value="guardian">
              <GuardianTab data={data.guardian} onUpdate={fetchGuardianData} />
            </TabsContent>
            <TabsContent value="contact">
              <ContactTab
                {...{
                  data: data.contact,
                  district: data.district,
                  division: data.division,
                  country: data.country
                }}
              />
            </TabsContent>
            <TabsContent value="education">
              <EducationTab
                {...{
                  data: data.education,
                  degree: data.degree
                }}
              />
            </TabsContent>
            <TabsContent value="photograph">
              <PhotographTab {...{ data: data.photograph }} />
            </TabsContent>
            <TabsContent value="insurance">
              <InsuranceTab {...{ data: data.insurance }} />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ProfileUpdate;