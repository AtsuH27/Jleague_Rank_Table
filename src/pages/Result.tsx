import { InputWrapper } from '@mantine/core';
import { NativeSelect } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'tabler-icons-react';
import sapporo from "../public/images/clublogo/sapporo-logo.png";

interface Data{
  lodo_url:string;
}



const Result: React.FC = () => {
  const [selectYear, setSelectYear] = useState<string>('2023');
  
  const [years, setYears] = useState<string[]>([]);
  const [logos,setLogos] = useState<string[]>([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get('http://localhost:5000/years');
        setYears(response.data);
      } catch (error) {
        console.log('Error fetching years:', error);
      }
    };
    fetchYears();
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
  };

  return (
    <>
      <InputWrapper label="シーズン"/>
        <NativeSelect
          value={selectYear}
          onChange={handleChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </NativeSelect>
      <div>
      
      </div>
    </>
  );
}

export default Result;
