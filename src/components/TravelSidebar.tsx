
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { WanderWiseLogo } from './WanderWiselogo';
import { CalendarDays, Filter } from 'lucide-react';

interface TravelSidebarProps {
  onFilterChange: (filters: any) => void;
}

export const TravelSidebar: React.FC<TravelSidebarProps> = ({ onFilterChange }) => {
  const [budget, setBudget] = React.useState([150]);
  const [adventureLevel, setAdventureLevel] = React.useState([2]);
  const [culturalInterest, setCulturalInterest] = React.useState(true);
  const [luxuryTravel, setLuxuryTravel] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  React.useEffect(() => {
    onFilterChange({
      budget: budget[0],
      adventureLevel: adventureLevel[0],
      culturalInterest,
      luxuryTravel,
      date
    });
  }, [budget, adventureLevel, culturalInterest, luxuryTravel, date, onFilterChange]);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 flex justify-center">
        <WanderWiseLogo />
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-3">
              <Filter className="w-4 h-4 mr-2 text-travel-sunset" />
              <h3 className="font-medium">Travel Filters</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Budget (per day $)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">$50</span>
                  <Slider
                    value={budget}
                    min={50}
                    max={500}
                    step={10}
                    onValueChange={setBudget}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">$500</span>
                </div>
                <p className="text-sm font-medium">${budget}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Adventure Level</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Relaxed</span>
                  <Slider
                    value={adventureLevel}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={setAdventureLevel}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Extreme</span>
                </div>
                <p className="text-sm font-medium">Level {adventureLevel}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="cultural-interest">Cultural Interest</Label>
                <Switch 
                  id="cultural-interest"
                  checked={culturalInterest}
                  onCheckedChange={setCulturalInterest}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="luxury-travel">Luxury Travel</Label>
                <Switch 
                  id="luxury-travel"
                  checked={luxuryTravel}
                  onCheckedChange={setLuxuryTravel}
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <CalendarDays className="w-4 h-4 mr-2 text-travel-sky" />
              <h3 className="font-medium">Travel Dates</h3>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="default" 
          className="w-full bg-travel-sky hover:bg-travel-sky/90"
          onClick={() => onFilterChange({
            budget: budget[0],
            adventureLevel: adventureLevel[0],
            culturalInterest,
            luxuryTravel,
            date
          })}
        >
          Apply Filters
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
