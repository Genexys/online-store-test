import React, { useState } from 'react';
import Select from 'react-select';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

type LatLng = {
  lat: number;
  lng: number;
};

type Suggestion = {
  id?: string;
  description: string;
};

type SearchAddressProps = {
  panTo: (latLng: LatLng) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
};

const SearchAddress: React.FC<SearchAddressProps> = ({
  panTo,
  setFieldValue,
}: SearchAddressProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const {
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 } as any,
      radius: 200 * 1000,
    },
  });

  const onSelectSuggestion = async ({ value }: { value: string }) => {
    setValue(value, false);

    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setFieldValue('address', value);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
    setValue(value);
  };

  return (
    <div className="search">
      <Select
        inputValue={inputValue}
        onInputChange={onInputChange}
        onChange={onSelectSuggestion}
        options={
          status === 'OK'
            ? data.map(({ id, description }: Suggestion) => ({
                value: description,
                label: description,
              }))
            : []
        }
        placeholder="Enter an address"
      />
    </div>
  );
};

export default SearchAddress;
