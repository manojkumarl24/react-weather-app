import {useState, useEffect} from 'react';

export default function useWeatherData(lat: number, lon: number){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    useEffect(
        () => {
            if (lat === 0 && lon === 0) return;

            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(apiUrl);
                    
                    if(!response.ok){
                        throw new Error(`HTTP error: Status ${response.status}`);
                    }

                    let weatherData = await response.json();
                    setData(weatherData);
                    console.log(weatherData);
                    setError(null);

                }  catch(err: any){
                    setError(err.message);
                    setData(null);

                }  finally{
                    setLoading(false);
                }
            };

            fetchData()
        }, [lat, lon] );

        return {data, loading, error};

}