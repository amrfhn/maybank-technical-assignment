import React from "react";
import { useDispatch } from "react-redux";
import usePlacesAutocomplete, {
  getLatLng,
  getGeocode,
} from "use-places-autocomplete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import addressSlice from "../libs/addressSlice";

export default function Search({ panTo }) {
  const dispatch = useDispatch();
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 3.139003, lng: () => 101.686852 },
      radius: 200 * 1000,
    },
  });

  return (
    <Autocomplete
      freeSolo
      autoComplete
      id="combo-box"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(data) => data}
      options={data}
      filterSelectedOptions
      sx={{ width: 350 }}
      value={data.find((x) => x.description === value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter an address"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
        />
      )}
      onChange={async (e, value) => {
        const address = value && value["description"];
        dispatch(addressSlice.actions.addAddress(address));
        setValue(address, false);
        clearSuggestions();

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = getLatLng(results[0]);
          panTo({ lat, lng });
        } catch (error) {
          console.log(error);
        }
      }}
    />
  );
}
