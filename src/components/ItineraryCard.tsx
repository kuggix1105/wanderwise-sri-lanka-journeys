
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

export interface ItineraryItem {
  id: string;
  day: number;
  location: string;
  activities: string[];
  accommodation: string;
  duration: string;
  category: 'beach' | 'culture' | 'nature' | 'wildlife' | 'city';
}

interface ItineraryCardProps {
  item: ItineraryItem;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ item }) => {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'beach': return 'bg-travel-sky text-white';
      case 'culture': return 'bg-travel-sunset text-white';
      case 'nature': return 'bg-travel-jungle text-white';
      case 'wildlife': return 'bg-amber-500 text-white';
      case 'city': return 'bg-violet-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <Card className="travel-card border-t-4 h-full flex flex-col" style={{ borderTopColor: getCategoryColor(item.category).split(' ')[0].replace('bg-', '#') }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">Day {item.day}</p>
            <h3 className="font-bold text-lg">{item.location}</h3>
          </div>
          <Badge className={getCategoryColor(item.category)}>
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-3">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{item.duration}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{item.accommodation}</span>
            </div>
          </div>
          
          <ul className="space-y-1">
            {item.activities.map((activity, index) => (
              <li key={index} className="text-sm">
                • {activity}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
