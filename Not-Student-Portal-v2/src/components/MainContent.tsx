"use client"
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from './Skeleton';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

export default MainContent;