"use client";

import React, { useState, useEffect, useCallback } from 'react';
import PageTitle from '@/components/PageTitle';
import { Bus, PlusCircle } from 'lucide-react';
import { TransportCardList, TransportCard, Package } from '@/components/transport-card-apply/transport-card-list';
import { ContactInfo } from '@/components/transport-card-apply/contact-info';
import { VideoGuideline } from '@/components/transport-card-apply/video-guideline';
import { TransportCardApplyDialog } from '@/components/transport-card-apply/transport-card-apply-dialog';
import { Button } from '@/components/ui/button';
import { transportService } from '@/services/proxy-api';

// Define the API response type
interface TransportApiResponse {
  success: boolean;
  message?: string;
  data?: any[];
}

interface TransportCardApiResponse {
  id: number;
  user_id: string;
  user_name: string;
  package_id: number;
  package: Package;
  paymentstatus: string;
  cardstatus: string;
  created_at: string;
  updated_at: string;
  startdate: string;
  expirydate: string;
  apply_amount: string;
  paid_amount: string;
  amount: string;
  payment_method: string;
  status: string;
  user_email: string;
  phone: string;
  program: string;
  user_type: string;
  semester_type: string | null;
  image: string | null;
  location: string;
  printed_at: string | null;
  delivery_at: string | null;
  remarks: string | null;
}

export default function TransportCardApplyPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cards, setCards] = useState<TransportCard[]>([]);
  const [loading, setLoading] = useState(true);
  const effectRan = React.useRef(false);

  const fetchTransportCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await transportService.getTransportCards() as unknown as TransportApiResponse;
      
      if (response && response.data && Array.isArray(response.data)) {
        const transformedCards: TransportCard[] = response.data.map((card: TransportCardApiResponse) => ({
          ...card
        }));
        setCards(transformedCards);
      } else {
        setCards([]);
      }
    } catch (err) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [refreshKey]);

  // Fetch data on component mount and when refreshKey changes
  useEffect(() => {
    if (effectRan.current === false) {
      fetchTransportCards();
      return () => {
        effectRan.current = true;
      };
    }
  }, [refreshKey, fetchTransportCards]);

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


      <div className="space-y-2">
        <div className="flex justify-start">
          <Button 
            onClick={handleOpenDialog}
            className="bg-blue-800 hover:bg-blue-900 text-white transition-colors duration-200 flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>APPLY FOR TRANSPORT CARD</span>
          </Button>
        </div>

        <TransportCardList 
          key={refreshKey}
          cards={cards}
          loading={loading}
          onRefresh={handleRefresh}
        />
      </div>

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
