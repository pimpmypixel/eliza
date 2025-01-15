import { useState, useEffect } from 'react';

interface LocationState {
    location: string | null;
    town: string | null;
    isLoading: boolean;
}

export function useGeolocation(): [LocationState, () => Promise<void>] {
    const [location, setLocation] = useState<string | null>(null);
    const [town, setTown] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getLocation = async () => {
        setIsLoading(true);

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
            );

            const data = await response.json();
            if (data.display_name) {
                const city = data.address.suburb ?? data.address.town;
                setTown(city);
                const country = data.address.country;
                const loc = `${city ? city + ', ' : ''}${country ? country : ''}`;
                setLocation(loc);
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setLocation(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return [{ location, town, isLoading }, getLocation];
}