import {useState} from 'react';
import InputFields from "../components/InputFields";
import useWeatherData from "../services/useWeatherData";
import ForecastedData from '../components/ForecastedData';

export default function Home(){
    const [lat, setLat] = useState(0.0);
    const [lon, setLon] = useState(0.0);

    const { data, loading, error }: any = useWeatherData(lat, lon);

    const handleInputSubmit = (latitude: number, longitude: number) => {
        setLat(latitude);
        setLon(longitude);
    };

    return <>
        <div>
            <InputFields handleSubmit={handleInputSubmit} />

            { loading && <p>Loading...</p> }
            { error && <p style={{ color: "red" }}>Error: {error}</p> }
            
            { data && <ForecastedData data={data} /> }

        </div>
    </>
}