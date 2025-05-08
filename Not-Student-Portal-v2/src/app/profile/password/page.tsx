import { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

// export const metadata: Metadata = {
//   title: "Change Password - Student Portal",
//   description: "Change your student portal password",
// };

export default function PasswordChangePage() {
  return (
    <MainContent>
      <PageTitle title="Change Password" />
      <div className="p-4">
        {/* Add password change form here */}
      </div>
    </MainContent>
  );
}
