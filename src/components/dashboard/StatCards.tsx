import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "../ui/skeleton"; 
import { 
  faMoneyBillAlt, 
} from "@fortawesome/free-solid-svg-icons";
import { 
  dashboardService, 
  calculatePaymentSummary, 
  PaymentSummary 
} from "../../services/api";

// Props Interface
interface StatCardsProps {
  onRetry?: () => void;
}



// Main StatCards Component
export default function StatCards({ onRetry }: StatCardsProps) {
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getPaymentLedgerSummary();
      setSummary(calculatePaymentSummary(data));
    } catch (err) {
      console.error('Failed to fetch payment summary:', err);
      setError('Failed to load payment summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      fetchPaymentSummary();
  }, [fetchPaymentSummary]);

  // Dashboard stats configuration
  const dashboardStats = [
    {
      id: 1,
      value: summary?.totalPayable || "0",
      title: "Total Payable",
      icon: faMoneyBillAlt,
      color: "bg-blue-500",
    },
    {
      id: 2,
      value: summary?.totalPaid || "0",
      title: "Total Paid",
      icon: faMoneyBillAlt,
      color: "bg-purple-500",
    },
    {
      id: 3,
      value: summary?.totalDue || "0",
      title: "Total Due",
      icon: faMoneyBillAlt,
      color: "bg-red-500",
    },
    {
      id: 4,
      value: summary?.totalOthers || "0",
      title: "Total Others",
      icon: faMoneyBillAlt,
      color: "bg-cyan-400",
    },
  ];

  // if (error) {
  //   return (
  //     <div className="bg-red-100 p-4 rounded-lg text-center">
  //       <p className="text-red-600 mb-2">{error}</p>
  //       {onRetry && (
  //         <button
  //           onClick={onRetry}
  //           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
  //         >
  //           Retry
  //         </button>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 ">
      {dashboardStats.map((stat) => (
        <div
          key={stat.id}
          className={`p-3 py-2 rounded-lg shadow-md flex items-center justify-between ${stat.color}`}
        >
          <div className="flex flex-col justify-between w-full h-full">
            <div className="text-right">
              {loading ? (
                <Skeleton className="h-6 w-full mb-1 bg-white/50 rounded" />
              ) : (
              <div className="text-white text-2xl font-semibold mb-1">{stat.value}</div>
              )}
              <div className="text-white text-sm">{stat.title}</div>
            </div>
            <div className="self-start opacity-30">
              <FontAwesomeIcon icon={stat.icon} className="text-5xl p-0 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
