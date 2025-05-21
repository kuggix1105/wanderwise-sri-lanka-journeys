
import React from 'react';
import { MapPin } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const WanderWiseLogo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <MapPin className="h-6 w-6 text-travel-sunset" />
      <span className="font-bold text-xl">
        <span className="text-travel-sky">Wander</span>
        <span className="text-travel-jungle">Wise</span>
      </span>
    </div>
  );
};
