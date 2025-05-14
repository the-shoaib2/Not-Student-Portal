"use client";
import PageTitle from "@/components/PageTitle";

export default function HallPage() {
  return (
    <div>
      <div className="p-4">
        <PageTitle title="Hall" />
        <div className="bg-white rounded-lg shadow p-6">
          <p>View and manage hall information here.</p>
        </div>
      </div>
    </div>
  );
}
