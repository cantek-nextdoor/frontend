/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

function MapComponent() {

  // Define a marker data interface
  interface MarkerData {
    position: Coordinates;
    title: string;
    icon: { url: string };
    content: string;
  }

  interface Coordinates {
    lat: number;
    lng: number;
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  })

  const [map, setMap] = React.useState(null)
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  
  const onLoad = React.useCallback(function callback(map) {
    // TODO Get events from server
    navigator.geolocation.getCurrentPosition(function(position) {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map)
    });
    
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const setMarker = React.useCallback(function callback(ev) {
      console.log("latitide = ", ev.latLng.lat());
      console.log("longitude = ", ev.latLng.lng());
      // TODO: Add box that allows creation of events
      setSelectedMarker(null);
      setMarkerPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
  }, [])

  const GTA_BOUND = {
    north: 43.882233482933124,
    south: 43.50790227910436,
    west: -79.93308995290906,
    east: -78.86878941579968,
  };

  const TORONTO_CENTER = { lng: -79.415541, lat: 43.674505 };
  
  // Mock data, for deletion after API is generated 
  const markers:MarkerData[]= [
    {
      position: { lat: 43.69734577800064, lng: -79.47167427026366 },
      title: 'Marker 1',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
      content: 'Info for Marker 1',
    },
    {
      position: { lat: 43.6422151606653, lng: -79.49725181542968 },
      title: 'Marker 2',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
      content: 'Info for Marker 2',
    },
    {
      position: { lat: 43.70661636256947, lng:  -79.30997539772393 },
      title: 'Marker 3',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Custom blue marker icon
      },
      content: 'Info for Marker 3',
    },
  ];

  const handleMarkerClick = (marker) => {
    setMarkerPosition(null);
    setSelectedMarker(marker);
  };
  
  return isLoaded ? (
      <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={setMarker}
        center={TORONTO_CENTER}
        options={{
        streetViewControl:false, // turn off street view
        restriction: {
          latLngBounds: GTA_BOUND, // bound maps to GTA area
        },
        styles: [
          {
            featureType: 'poi', // hide buildings markers
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: "transit", // hide transit markers
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeId: "roadmap", // set to roadmap 
        mapTypeControl: false // hide toggle between roadmap and satellite
      }}
      >
      
      {markers.map((marker, index) => (
        <Marker //code block that populates available events
          key={index}
          position={marker.position}
          title={marker.title}
          icon={marker.icon}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
          options={{ maxWidth: 300 }} // Initial maximum width
        >
          <div>{selectedMarker.content}</div>
        </InfoWindow>
      )}
      {markerPosition && <Marker position={markerPosition} /> /* red marker */} 
      </GoogleMap>
      </>
  ) : <></>
}

export default React.memo(MapComponent)