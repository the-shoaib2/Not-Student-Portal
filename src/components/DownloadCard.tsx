"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Smartphone, Monitor, Apple } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DownloadCard: React.FC = () => {
  return (
    <div className="mt-6 mb-3">
      <h2 className="text-base font-bold text-center text-gray-800 mb-3">Get Our App</h2>
      <Card className="overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 -z-10"></div>
        <CardHeader className="text-white py-2">
          <CardTitle className="text-base font-bold">Download Not Student Portal</CardTitle>
          <CardDescription className="text-white/90 text-xs">Access your student portal anytime, anywhere</CardDescription>
        </CardHeader>
        <CardContent className="pb-0 pt-0">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-2 md:mb-0 md:mr-4 text-white">
              <div className="flex flex-wrap gap-1.5 mb-2">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Smartphone size={14} className="mr-1" />
                  <span className="text-xs">Android</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Apple size={14} className="mr-1" />
                  <span className="text-xs">iOS</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Monitor size={14} className="mr-1" />
                  <span className="text-xs">Windows</span>
                </div>
              </div>
            </div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/diuLogo.png"
                  alt="App Logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start pt-1 pb-3">
          <Link href="/download" className="w-full sm:w-auto">
            <Button className="relative flex items-center bg-white text-teal-700 font-medium py-1.5 px-3 rounded-lg hover:bg-teal-50 transition-all duration-300 w-full text-sm overflow-hidden group hover:shadow-md hover:shadow-teal-200/50 hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent animate-shimmer"></span>
              <Download size={16} className="mr-1.5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10 group-hover:font-semibold transition-all duration-300">Download Now</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DownloadCard;
