import { useState, useEffect } from 'react';
import { STADIUM_CENTER } from '../utils/constants';

export function useGeolocation() {
  const [location, setLocation] = useState(STADIUM_CENTER);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        setError(err.message);
        // Fallback to stadium center already set as default
      }
    );
  }, []);

  return { location, error };
}
