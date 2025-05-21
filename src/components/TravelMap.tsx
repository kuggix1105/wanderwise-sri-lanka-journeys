
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ZoomIn, ZoomOut, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  name: string;
  lat: number;
  lng: number;
  day?: number;
}

interface TravelMapProps {
  locations: Location[];
}

export const TravelMap: React.FC<TravelMapProps> = ({ locations }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(prevZoom => prevZoom + 10);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 70) {
      setZoomLevel(prevZoom => prevZoom - 10);
    }
  };
  
  // Add day number to each location if not already provided
  const locationsWithDays = locations.map((loc, index) => ({
    ...loc,
    day: loc.day || index + 1
  }));

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={100} minSize={30}>
        <Card className="relative overflow-hidden rounded-2xl border h-full">
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 hover:bg-white"
              onClick={handleZoomIn}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 hover:bg-white"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-4 left-4 z-20 bg-white/80 dark:bg-card/80 p-2 rounded-lg shadow-sm text-sm">
            <div className="flex items-center gap-1 mb-1">
              <Route className="h-4 w-4 text-travel-sunset" />
              <span className="font-medium">Sri Lanka Travel Route</span>
            </div>
            <p className="text-xs text-muted-foreground">{locationsWithDays.length} destinations</p>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center bg-travel-sky/5"
               style={{ transform: `scale(${zoomLevel/100})`, transition: 'transform 0.3s ease-in-out' }}>
            {/* Sri Lanka map with locations */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 100 140" 
                  className="w-3/4 h-auto text-travel-sky opacity-40"
                  fill="currentColor"
                >
                  {/* More detailed Sri Lanka outline */}
                  <path d="M53,20 C69,24 75,30 80,45 C85,60 90,80 85,95 C80,110 70,120 62,125 C54,130 45,132 38,125 C31,118 26,110 24,100 C22,90 18,75 20,60 C22,45 37,16 53,20 Z" />
                </svg>
              </div>
              
              {/* Markers for locations */}
              {locationsWithDays.map((loc, index) => {
                // Convert the lat/lng to approximate positions on our SVG viewBox
                const x = ((loc.lng - 79.5) / 2) * 100 + 50; // Roughly normalize to SVG coordinates
                const y = ((7.9 - loc.lat) / 2) * 120 + 60;
                
                return (
                  <div 
                    key={index} 
                    className="absolute w-6 h-6 bg-travel-sunset rounded-full shadow-md flex items-center justify-center text-white font-bold animate-pulse-slow"
                    style={{ 
                      left: `${x}%`, 
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                  >
                    {loc.day}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-xs shadow whitespace-nowrap text-black">
                      {loc.name}
                    </div>
                    
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 rounded-full bg-travel-sunset/50 animate-pulse-slow"></div>
                  </div>
                );
              })}
              
              {/* Add lines between points to create a route with day labels */}
              <svg 
                className="absolute inset-0 h-full w-full" 
                style={{ zIndex: 5 }}
              >
                {locationsWithDays.length > 1 && (
                  <g>
                    {locationsWithDays.map((loc, index) => {
                      if (index === locationsWithDays.length - 1) return null;
                      
                      const start = {
                        x: ((loc.lng - 79.5) / 2) * 100 + 50,
                        y: ((7.9 - loc.lat) / 2) * 120 + 60
                      };
                      
                      const end = {
                        x: ((locationsWithDays[index + 1].lng - 79.5) / 2) * 100 + 50,
                        y: ((7.9 - locationsWithDays[index + 1].lat) / 2) * 120 + 60
                      };

                      // Calculate midpoint for adding day label
                      const midX = (start.x + end.x) / 2;
                      const midY = (start.y + end.y) / 2;
                      
                      return (
                        <g key={index}>
                          <line 
                            x1={`${start.x}%`} 
                            y1={`${start.y}%`} 
                            x2={`${end.x}%`} 
                            y2={`${end.y}%`}
                            stroke="#F97316"
                            strokeWidth="3"
                            strokeDasharray="5 3"
                          />
                          {/* Day transition label */}
                          <circle 
                            cx={`${midX}%`} 
                            cy={`${midY}%`} 
                            r="8" 
                            fill="white" 
                            stroke="#F97316" 
                            strokeWidth="1"
                          />
                          <text 
                            x={`${midX}%`} 
                            y={`${midY}%`} 
                            textAnchor="middle" 
                            dominantBaseline="middle"
                            fontSize="8"
                            fontWeight="bold"
                            fill="#F97316"
                          >
                            {loc.day} → {locationsWithDays[index + 1].day}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>
            </div>
          </div>
        </Card>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={30} minSize={20}>
        <Card className="h-full p-4 overflow-auto">
          <h3 className="font-semibold mb-2">Travel Route Details</h3>
          <div className="space-y-2">
            {locationsWithDays.map((location, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-travel-sunset rounded-full flex items-center justify-center text-white font-bold">
                  {location.day}
                </div>
                <span className="font-medium">{location.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
