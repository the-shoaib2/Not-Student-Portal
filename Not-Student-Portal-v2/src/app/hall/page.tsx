"use client";
import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

export default function HallPage() {
  return (
    <MainContent>
      <div className="p-4">
        <PageTitle title="Hall" />
        <div className="bg-white rounded-lg shadow p-6">
          <p>View and manage hall information here.</p>
        </div>
      </div>
    </MainContent>
  );
}
