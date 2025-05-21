
import React from 'react';
import { ItineraryItem, ItineraryCard } from './ItineraryCard';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-heading">Your Sri Lanka Adventure</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItineraryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
