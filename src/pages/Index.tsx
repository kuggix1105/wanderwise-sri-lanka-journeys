
import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { TravelSidebar } from '@/components/TravelSidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { ItineraryTimeline } from '@/components/ItineraryTimeline';
import { TravelMap } from '@/components/TravelMap';
import { Download, RefreshCw } from 'lucide-react';
import { ItineraryItem } from '@/components/ItineraryCard';
import { WanderWiseLogo } from '@/components/WanderWiselogo';

// Mock data for locations in Sri Lanka
const sriLankaLocations = [
  { name: 'Colombo', lat: 6.9271, lng: 79.8612 },
  { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { name: 'Ella', lat: 6.8667, lng: 81.0467 },
  { name: 'Galle', lat: 6.0535, lng: 80.2210 },
  { name: 'Sigiriya', lat: 7.9570, lng: 80.7603 },
  { name: 'Trincomalee', lat: 8.5874, lng: 81.2152 }
];

// Mock itinerary items
const mockItinerary: ItineraryItem[] = [
  {
    id: '1',
    day: 1,
    location: 'Colombo',
    activities: ['Gangaramaya Temple visit', 'National Museum', 'Galle Face Green sunset walk'],
    accommodation: 'Urban Hotel Colombo',
    duration: 'Full Day',
    category: 'city'
  },
  {
    id: '2',
    day: 2,
    location: 'Sigiriya',
    activities: ['Climb Sigiriya Rock Fortress', 'Dambulla Cave Temples', 'Minneriya Safari'],
    accommodation: 'Jungle Eco Retreat',
    duration: 'Full Day',
    category: 'culture'
  },
  {
    id: '3',
    day: 3,
    location: 'Kandy',
    activities: ['Temple of the Tooth', 'Royal Botanical Gardens', 'Cultural dance performance'],
    accommodation: 'Hilltop Hotel Kandy',
    duration: 'Full Day',
    category: 'culture'
  },
  {
    id: '4',
    day: 4,
    location: 'Ella',
    activities: ['Nine Arch Bridge', 'Little Adams Peak hike', 'Tea plantation tour'],
    accommodation: 'Mountain View Cottages',
    duration: 'Full Day',
    category: 'nature'
  },
  {
    id: '5',
    day: 5,
    location: 'Yala',
    activities: ['Yala National Park Safari', 'Spot leopards and elephants', 'Beach relaxation'],
    accommodation: 'Luxury Safari Camp',
    duration: 'Full Day',
    category: 'wildlife'
  },
  {
    id: '6',
    day: 6,
    location: 'Galle',
    activities: ['Explore Galle Fort', 'Unawatuna Beach', 'Sunset boat ride'],
    accommodation: 'Colonial Heritage Hotel',
    duration: 'Full Day',
    category: 'beach'
  }
];

const Index = () => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(mockItinerary);
  const [activeLocations, setActiveLocations] = useState(sriLankaLocations.slice(0, 3));
  const [filters, setFilters] = useState({});
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // In a real app, this would trigger an API call to update the itinerary based on filters
  };
  
  const handleUpdateItinerary = (preference: string) => {
    setUserPreferences(prev => [...prev, preference]);
    
    // Update the itinerary based on the user's input
    // This is a simplified mock - in a real app, you'd make API calls to your AI service
    const shuffled = [...mockItinerary].sort(() => 0.5 - Math.random());
    const selectedLocations = sriLankaLocations
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);
      
    // Introduce a delay to simulate processing
    setTimeout(() => {
      setItinerary(shuffled);
      setActiveLocations(selectedLocations);
      
      toast({
        title: "Itinerary Updated",
        description: "Your travel plan has been refreshed based on your preferences.",
        variant: "default",
      });
    }, 1500);
  };
  
  const regenerateItinerary = () => {
    // Simulate regenerating a new itinerary
    const shuffled = [...mockItinerary]
      .sort(() => 0.5 - Math.random())
      .map(item => ({
        ...item,
        day: Math.floor(Math.random() * 7) + 1
      }))
      .sort((a, b) => a.day - b.day);
      
    const selectedLocations = sriLankaLocations
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);
      
    setItinerary(shuffled);
    setActiveLocations(selectedLocations);
    
    toast({
      title: "Itinerary Regenerated",
      description: "Your Sri Lanka adventure has been refreshed!",
    });
  };
  
  const downloadAsPDF = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Download Started",
      description: "Your itinerary is being prepared as a PDF.",
    });
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <TravelSidebar onFilterChange={handleFilterChange} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-card border-b shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <WanderWiseLogo />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={regenerateItinerary}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate Itinerary</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1 bg-travel-jungle hover:bg-travel-jungle/90"
              onClick={downloadAsPDF}
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-travel-sky/5 to-travel-jungle/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="h-[400px]">
                <ChatInterface onUpdateItinerary={handleUpdateItinerary} />
              </div>
              
              <div className="h-[400px]">
                <TravelMap locations={activeLocations} />
              </div>
            </div>
            
            <div className="mt-6">
              <ItineraryTimeline items={itinerary} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
