
import React from 'react';
import { ItineraryItem, ItineraryCard } from './ItineraryCard';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ items }) => {
  // Sort items by day
  const sortedItems = [...items].sort((a, b) => a.day - b.day);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-heading">Your Sri Lanka Adventure</h2>
      
      {/* Sequential journey timeline */}
      <div className="hidden md:flex items-center justify-between mb-6 px-2">
        {sortedItems.map((item, index) => (
          <div key={`timeline-${item.id}`} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-travel-sunset text-white flex items-center justify-center font-bold">
                {item.day}
              </div>
              <span className="text-xs mt-1">{item.location}</span>
            </div>
            {index < sortedItems.length - 1 && (
              <div className="h-0.5 bg-travel-sunset/30 w-full flex-1 mx-1 md:mx-2 lg:mx-4" />
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedItems.map((item) => (
          <ItineraryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
