import React from 'react';
import * as LucideIcons from 'lucide-react';

interface PageTitleProps {
  title: string;
  icon?: string; // Now expects icon name as string
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, icon, subtitle }) => {
  const IconComponent = icon ? (LucideIcons as any)[icon] : null;

  return (
    <div className="border-b border-gray-300 text-center bg-gradient-to-r from-teal-100 via-white to-teal-100 shadow-md flex items-center justify-center gap-2 py-2 relative">
      {IconComponent && <IconComponent className="h-6 w-6 text-teal-600 drop-shadow-sm" />}
      <h1 className="text-lg md:text-2xl font-bold text-teal-700 tracking-wide drop-shadow-sm">
        {title}
      </h1>
      {subtitle && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-teal-400 font-semibold hidden sm:inline">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default PageTitle;