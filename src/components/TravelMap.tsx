
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ZoomIn, ZoomOut, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

interface Location {
  name: string;
  lat: number;
  lng: number;
  day?: number;
}

interface TravelMapProps {
  locations: Location[];
}

// Sri Lanka's map center coordinates
const SRI_LANKA_CENTER = {
  lat: 7.8731,
  lng: 80.7718
};

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Map options
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
  mapTypeId: 'terrain'
};

export const TravelMap: React.FC<TravelMapProps> = ({ locations }) => {
  const [zoomLevel, setZoomLevel] = useState(7.5);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyBzDgCdNfCNXZnqwNZLjNaVrG88uzLyJGI' // Replace with your API key
  });

  // Add day number to each location if not already provided
  const locationsWithDays = locations.map((loc, index) => ({
    ...loc,
    day: loc.day || index + 1
  }));

  const handleZoomIn = () => {
    if (zoomLevel < 12) {
      setZoomLevel(prevZoom => prevZoom + 0.5);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 6) {
      setZoomLevel(prevZoom => prevZoom - 0.5);
    }
  };

  // Generate polyline path from the locations
  const pathCoordinates = locationsWithDays.map(loc => ({
    lat: loc.lat,
    lng: loc.lng
  }));

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    // Fit map bounds to contain all markers if there are locations
    if (locationsWithDays.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locationsWithDays.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      map.fitBounds(bounds);
    }
  }, [locationsWithDays]);

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
              <MapPin className="h-4 w-4 text-travel-sunset" />
              <span className="font-medium">Sri Lanka Travel Route</span>
            </div>
            <p className="text-xs text-muted-foreground">{locationsWithDays.length} destinations</p>
          </div>
          
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={SRI_LANKA_CENTER}
              zoom={zoomLevel}
              options={mapOptions}
              onLoad={handleMapLoad}
            >
              {/* Polyline connecting locations */}
              <Polyline
                path={pathCoordinates}
                options={{
                  strokeColor: '#F97316',
                  strokeOpacity: 0.8,
                  strokeWeight: 3,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  zIndex: 1,
                  geodesic: true,
                  icons: [{
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: '#F97316',
                      fillOpacity: 0.8,
                      scale: 2,
                      strokeColor: '#F97316',
                      strokeWeight: 2,
                    },
                    offset: '0',
                    repeat: '20px'
                  }]
                }}
              />

              {/* Markers for locations */}
              {locationsWithDays.map((location, index) => (
                <Marker
                  key={`marker-${index}`}
                  position={{ lat: location.lat, lng: location.lng }}
                  label={{ 
                    text: location.day?.toString() || '', 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#F97316',
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#FFFFFF',
                    scale: 18,
                  }}
                  onClick={() => setSelectedLocation(location)}
                  animation={google.maps.Animation.DROP}
                  zIndex={100}
                />
              ))}

              {/* Info window for selected location */}
              {selectedLocation && (
                <InfoWindow
                  position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="p-1">
                    <p className="font-medium text-sm">{selectedLocation.name}</p>
                    <p className="text-xs text-muted-foreground">Day {selectedLocation.day}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <p>Loading map...</p>
            </div>
          )}
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
                <div className="ml-auto text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
