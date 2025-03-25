import React, {useContext, createContext, useState, useEffect} from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const [data, setData] = useState(null);

const fetchData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/habits/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log(data);
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