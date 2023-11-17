import React, { useState } from 'react';
import axios from 'axios';
import './AutomobileForm.css'; // Adjust the path as necessary

function AutomobileForm() {
    const [formData, setFormData] = useState({
        color: '',
        make: '',
        model: '',
        vin: '',
        model_year: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // console.log(`http://af1ead2fad5e04824b8fa55b6f179425-1250810402.us-west-2.elb.amazonaws.com:8080/add-automobile`);
    console.log(`POST request: ${process.env.REACT_APP_HOST}:${process.env.REACT_APP_URL_PORT}/add-automobile`);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post(`http://af1ead2fad5e04824b8fa55b6f179425-1250810402.us-west-2.elb.amazonaws.com:8080/add-automobile`, formData);
            const response = await axios.post(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_URL_PORT}/add-automobile`, formData);
            console.log(response.data); // handle success
        } catch (error) {
            console.error(error); // handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
            />
            <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="Make"
            />
            <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Model"
            />
            <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="VIN"
            />
            <input
                type="number"
                name="model_year"
                value={formData.model_year}
                onChange={handleChange}
                placeholder="Model Year"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AutomobileForm;