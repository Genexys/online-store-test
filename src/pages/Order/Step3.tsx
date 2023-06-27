import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import SearchAddress from '@/components/SearchAddress';
import { getGeocode, GeocodeResult } from 'use-places-autocomplete';

import styles from './order.module.css';

type MarkerType = { lat: number; lng: number } | undefined;

const Step3: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const [marker, setMarker] = useState<MarkerType>();
  const [selected, setSelected] = useState<MarkerType>(undefined);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  const onMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng!.lat();
    const lng = e.latLng!.lng();

    setMarker({
      lat: lat,
      lng: lng,
    });

    try {
      const results: GeocodeResult[] = await getGeocode({ location: { lat, lng } });
      setSelectedAddress(results[0].formatted_address);
      const postalCodeResult = results[0].address_components.find((component) =>
        component.types.includes('postal_code')
      );
      if (postalCodeResult) {
        setPostalCode(postalCodeResult.long_name);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const mapRef = useRef<google.maps.Map | null>(null);
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <h2>Locate the Property</h2>

      <div className={styles.search}>
        <SearchAddress panTo={panTo} setFieldValue={setSelectedAddress} />
      </div>

      <input
        type="text"
        className={styles.inputField}
        value={selectedAddress}
        placeholder="Selected Address"
        readOnly
      />

      <input
        type="text"
        className={styles.inputField}
        value={postalCode}
        placeholder="Postal Code"
        readOnly
      />

      <div className={styles.map}>
        <GoogleMap
          id="map"
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={8}
          center={{ lat: 43.6532, lng: -79.3832 }}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {marker && (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          )}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(undefined);
              }}
            >
              <div>
                <h2>Selected Location</h2>
                <p>Selected address is {selectedAddress}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
      <h2>Selected Address</h2>
      <p>{selectedAddress}</p>
    </div>
  );
};

export default Step3;
