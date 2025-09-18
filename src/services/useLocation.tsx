export const getLocation = async (lat: number, lon: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "seeweather-app" }
  });
  const data = await response.json();
  return data.display_name;
};


export const getCoords = async (location: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "seeweather-app" }
  });
  const data = await response.json();
  return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
};


export const getLocationSuggestions = async (query: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
  const response = await fetch(url, {
    headers: { "User-Agent": "seeweather-app" }
  });
  return await response.json();
};