"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Laptop } from 'lucide-react';
import { Card , CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LaptopPage() {

  return (
    <>
      <PageTitle
        title="Laptop Management"
        icon={<Laptop />}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      


      </div>

    </>
  );
}
