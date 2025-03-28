import React, {useContext, createContext, useState, useEffect} from 'react';
import axios from 'axios';
import api from '../services/api';

const HabitContext = createContext();
const API_URL = 'http://10.19.14.105:8000'

export const HabitProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/`);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <HabitContext.Provider value={{ data, fetchData }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabit = () => {
    return useContext(HabitContext);
};