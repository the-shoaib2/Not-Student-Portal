import { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

// export const metadata: Metadata = {
//   title: "Payment Scheme - Student Portal",
//   description: "View payment schemes and options",
// };

export default function PaymentSchemePage() {
  return (
    <MainContent>
      <PageTitle title="Payment Scheme" />
      <div className="p-4">
        {/* Add payment scheme information here */}
      </div>
    </MainContent>
  );
}
