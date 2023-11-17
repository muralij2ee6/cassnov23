import React, { useState } from 'react';
import './CarDisplay.css'; // Importing the CSS file

function CarDisplay() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log(`node-app:8080/autos`);
    // time to try
    console.log(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_URL_PORT}/autos`);
    const fetchData = async () => {
        setLoading(true);
        try {
            // const response = await fetch(`http://af1ead2fad5e04824b8fa55b6f179425-1250810402.us-west-2.elb.amazonaws.com:8080/autos`);
            const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_URL_PORT}/autos`);
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>Load Cars</button>
            {loading && <p>Loading...</p>}
            <div className="car-container">
                {cars.map((car, index) => (
                    <div key={index} className="car-card">
                        <h3>{car.make} {car.model}</h3>
                        <p>Color: {car.color}</p>
                        <p>VIN: {car.vin}</p>
                        <p>Year: {car.model_year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarDisplay;
