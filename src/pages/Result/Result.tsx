import { InputWrapper } from '@mantine/core';
import { NativeSelect } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Result.css';

interface Team {
  team_id: number;
  team_name: string;
  logo_url: string;
}

const Result: React.FC = () => {
  const [selectYear, setSelectYear] = useState<string>('2023');
  const [years, setYears] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
  };


  //デーベースへの接続をいったんコメントアウト

  // useEffect(() => {
  //   const fetchYears = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/years');
  //       setYears(response.data);
  //     } catch (error) {
  //       console.error('Error fetching years:', error);
  //     }
  //   };
  //   fetchYears();
  // }, []);

  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/teams', {
  //         params: { year: selectYear },
  //       });
  //       setTeams(response.data);
  //     } catch (error) {
  //       console.error('Error fetching teams:', error);
  //     }
  //   };
  //   fetchTeams();
  // }, [selectYear]);

  // const handleLogoClick = (team_id: number) => {
  //   window.location.href = `/result/${team_id}?year=${selectYear}`;
  // };

  return (
    <>
      <InputWrapper label="シーズン" />
      <NativeSelect
        id="year-select"
        value={selectYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </NativeSelect>
      <div className="logos">
        {teams.map((team) => (
          <td>
          <img
            key={team.team_id}
            src={`${process.env.PUBLIC_URL}/images/clublogo/${team.logo_url}`}
            alt={team.team_name}
            // onClick={()=>handleLogoClick(team.team_id)}
            className="team-logo"

          />
          <a href={`result/${team.team_id}?year=${selectYear}`} font-size='10px'>{team.team_name}</a>
          
          </td>
        ))}
      </div>
    </>
  );
};

export default Result;