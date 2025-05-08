import { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

// export const metadata: Metadata = {
//   title: "Update Profile - Student Portal",
//   description: "Update your student profile",
// };

export default function ProfileUpdatePage() {
  return (
    <MainContent>
      <PageTitle title="Update Profile" />
      <div className="p-4">
        {/* Add profile update form here */}
      </div>
    </MainContent>
  );
}
