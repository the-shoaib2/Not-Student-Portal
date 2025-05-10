import { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

// export const metadata: Metadata = {
//   title: "Notices - Student Portal",
//   description: "Student Portal Notices",
// };

export default function NoticesPage() {
  return (
    <MainContent>
      <PageTitle title="Notices" />
      <div className="p-4">
        {/* Add notices content here */}
      </div>
    </MainContent>
  );
}
