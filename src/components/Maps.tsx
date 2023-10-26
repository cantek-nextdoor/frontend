/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  })

  const [map, setMap] = React.useState(null)
  const [markerPosition, setMarkerPosition] = useState(null);
  
  const onLoad = React.useCallback(function callback(map) {
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
      setMarkerPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
  }, [])

  const GTA_BOUND = {
    north: 43.882233482933124,
    south: 43.50790227910436,
    west: -79.93308995290906,
    east: -78.86878941579968,
  };

  const TORONTO_CENTER = { lng: -79.415541, lat: 43.674505 };

  return isLoaded ? (
      <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
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
        {markerPosition && <Marker position={markerPosition} />}
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
      </>
  ) : <></>
}

export default React.memo(MyComponent)