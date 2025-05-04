import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "../components/ui/skeleton"; 
import { Card } from "./ui/card";

const dashboardStats = [
  {
    id: 1,
    value: "",
    title: "Total Payable",
    icon: faMoneyBillAlt,
    color: "bg-blue-500",
  },
  {
    id: 2,
    value: "",
    title: "Total Paid",
    icon: faMoneyBillAlt,
    color: "bg-purple-500",
  },
  {
    id: 3,
    value: "",
    title: "Total Due",
    icon: faMoneyBillAlt,
    color: "bg-red-500",
  },
  {
    id: 4,
    value: "",
    title: "Total Others",
    icon: faMoneyBillAlt,
    color: "bg-cyan-400",
  },
];

export default function StatCards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {dashboardStats.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.color} hover:shadow-xl transition-shadow duration-300 rounded-md p-4`}
        >
          <div className="flex items-center h-full">
            <div className="flex-shrink-0 opacity-30 mr-4">
              <FontAwesomeIcon icon={stat.icon} className="text-6xl text-white" />
            </div>
            <div className="text-right flex-grow">
              {loading ? (
                <Skeleton className="h-8 w-24 mb-1 bg-white/50 rounded" />
              ) : (
                <div className="text-white text-2xl font-semibold">{stat.value}</div>
              )}
              <div className="text-white text-sm">{stat.title}</div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
