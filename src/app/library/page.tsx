"use client";

import PageTitle from "@/components/PageTitle";
import MainContent from "@/components/MainContent";

export default function LibraryPage() {
  return (
    <MainContent>
      <PageTitle title="Library" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Library</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>View and manage library information here.</p>
        </div>
      </div>
    </MainContent>
  );
}
