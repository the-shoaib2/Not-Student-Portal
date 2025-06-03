"use client";

import React, { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { Bus } from 'lucide-react';
import { TransportCardList } from '@/components/transport-card-apply/transport-card-list';
import { ContactInfo } from '@/components/transport-card-apply/contact-info';
import { VideoGuideline } from '@/components/transport-card-apply/video-guideline';
import { TransportCardApplyDialog } from '@/components/transport-card-apply/transport-card-apply-dialog';
import { Button } from '@/components/ui/button';

export default function TransportCardApplyPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    setIsDialogOpen(false);
    handleRefresh();
  };

  return (
    <>
      <PageTitle
        title="Transport Card Apply"
        icon={<Bus />}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleOpenDialog}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Apply for Transport Card
          </Button>
        </div>

        <TransportCardList 
          key={refreshKey} 
        />

        <TransportCardApplyDialog 
          onSuccess={handleDialogSuccess}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactInfo />
          <VideoGuideline />
        </div>
      </div>
    </>
  );
}
