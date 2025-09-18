import { useEffect, useState } from "react";
import {  getCoords } from "../services/useLocation";
import '../styles/formStyle.css'

interface InputFieldsProps {
  handleSubmit: (lat: number, lon: number) => void;
}


export default function InputFields({handleSubmit}: InputFieldsProps){
    const [lat, setLat] = useState(0.0);
    const [lon, setLon] = useState(0.0);
    const [location, setLocation] = useState("");
    const [currentLocLabel, setCurrenrLocLabel] = useState("");

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(lat, lon);
    };
    
    // setting browser current's location as coords
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                setCurrenrLocLabel("- Browser location");
            })
        }
    }, []);

    
    useEffect(() => {
        const fillCoords = setTimeout( () => { 
            if (location && location.trim() !== "") {
                getCoords(location).then((coords) => {
                    if (coords) {
                        setLat(parseFloat(coords.lat));
                        setLon(parseFloat(coords.lon));
                        setCurrenrLocLabel("");
                    }
                });
        }
    }, 2000) }, [location]);


    return <>
        <div>
            <h1>SEEWEATHER</h1>
                <form onSubmit={onFormSubmit}>
                    <div className="form-container">
                        <div className="coordinates">
                            <label>Latitude: 
                            <input type="text" 
                                value={lat || ""}
                                onChange={(e)=> {
                                    setLat(parseFloat(e.target.value));
                                    setCurrenrLocLabel("");
                                }} />
                            </label>

                            <label>Longitude: 
                            <input type="text"  
                                value={lon || ""}
                                onChange={(e)=> {
                                    setLon(parseFloat(e.target.value));
                                    setCurrenrLocLabel("");
                                }} />
                            </label>
                        </div>

                        <div className="location">
                            <label>Location: 
                            <input type="text"
                                    value={location || ""}
                                    onChange={(e)=> setLocation(e.target.value)}  />
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit"> Forecast Weather of 7 upcoming days {currentLocLabel} </button>
                </form>
        </div>   
    </>
}