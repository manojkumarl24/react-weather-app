import { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

const fetchCitySuggestions = async (query: string) => {
  if (!query) return [];

  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=20&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, { headers: { "User-Agent": "mui-autocomplete-demo" } });
  const data = await res.json();

  return data
    .filter((item: any) => 
      item.address && (item.address.city || item.address.town || item.address.village)
    )
    .map((item: any) => {
      const city = item.address.city || item.address.town || item.address.village || "";
      const state = item.address.state || "";
      const country = item.address.country || "";

      return {
        label: `${city}${state ? ", " + state : ""}${country ? ", " + country : ""}`,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      };
    });
};


export default function CityAutocompleteMUI() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue || inputValue.length < 2) {
      setOptions([]);
      return;
    }

    let active = true;
    setLoading(true);

    const timer = setTimeout(async () => {
      const results = await fetchCitySuggestions(inputValue);
      if (active) setOptions(results);
      setLoading(false);
    }, 300); 

    return () => {
      clearTimeout(timer);
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      sx={{ width: 300, margin: "50px auto" }}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      onChange={(event, value) => {
        if (value) {
          console.log("Selected city:", value.label, "Lat:", value.lat, "Lon:", value.lon);
        }
      }}
      onInputChange={(event, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type city"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
