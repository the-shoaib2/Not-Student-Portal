'use client';

import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <div className="container mx-auto py-20">
        {children}
      </div>
    </main>
  );
}
