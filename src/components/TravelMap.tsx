
import React from 'react';
import { Card } from '@/components/ui/card';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface TravelMapProps {
  locations: Location[];
}

export const TravelMap: React.FC<TravelMapProps> = ({ locations }) => {
  // This is a mock map component - in a real implementation, you would integrate with Google Maps or another map provider
  
  return (
    <Card className="relative overflow-hidden rounded-2xl border h-full">
      <div className="absolute inset-0 flex items-center justify-center bg-travel-sky/10">
        {/* Mock map with Sri Lanka outline */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 120" 
              className="w-1/2 h-auto text-travel-sky opacity-40"
              fill="currentColor"
            >
              {/* Simplified Sri Lanka outline */}
              <path d="M50,10 C70,15 80,30 85,45 C90,60 85,75 80,90 C75,105 60,110 50,110 C40,110 25,105 20,90 C15,75 10,60 15,45 C20,30 30,15 50,10 Z" />
            </svg>
          </div>
          
          {/* Markers for locations */}
          {locations.map((loc, index) => {
            // Convert the lat/lng to approximate positions on our SVG viewBox
            const x = ((loc.lng - 79.5) / 2) * 100 + 50; // Roughly normalize to SVG coordinates
            const y = ((7.9 - loc.lat) / 2) * 100 + 50;
            
            return (
              <div 
                key={index} 
                className="absolute w-3 h-3 bg-travel-sunset rounded-full shadow-md"
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded text-xs shadow whitespace-nowrap">
                  {loc.name}
                </div>
                
                {/* Pulsing effect */}
                <div className="absolute inset-0 rounded-full bg-travel-sunset/50 animate-pulse-slow"></div>
              </div>
            );
          })}
          
          {/* Add lines between points to create a route */}
          <svg 
            className="absolute inset-0 h-full w-full" 
            style={{ zIndex: 5 }}
          >
            {locations.length > 1 && (
              <g>
                {locations.map((loc, index) => {
                  if (index === locations.length - 1) return null;
                  
                  const start = {
                    x: ((loc.lng - 79.5) / 2) * 100 + 50,
                    y: ((7.9 - loc.lat) / 2) * 100 + 50
                  };
                  
                  const end = {
                    x: ((locations[index + 1].lng - 79.5) / 2) * 100 + 50,
                    y: ((7.9 - locations[index + 1].lat) / 2) * 100 + 50
                  };
                  
                  return (
                    <line 
                      key={index}
                      x1={`${start.x}%`} 
                      y1={`${start.y}%`} 
                      x2={`${end.x}%`} 
                      y2={`${end.y}%`}
                      stroke="#F97316"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>
    </Card>
  );
};
