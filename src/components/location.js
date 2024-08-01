import React, { useState } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Wait 10 seconds for a response
          maximumAge: 0, // Don't use cached location
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : 'Location not available'}</p>
      )}
    </div>
  );
};

export default LocationComponent;
