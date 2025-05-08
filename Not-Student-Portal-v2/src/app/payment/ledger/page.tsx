import { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

// export const metadata: Metadata = {
//   title: "Payment Ledger - Student Portal",
//   description: "View your payment history",
// };

export default function PaymentLedgerPage() {
  return (
    <MainContent>
      <PageTitle title="Payment Ledger" />
      <div className="p-4">
        {/* Add payment ledger table here */}
      </div>
    </MainContent>
  );
}
