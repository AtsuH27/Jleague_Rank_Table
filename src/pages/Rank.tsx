import { InputWrapper } from '@mantine/core';
import { NativeSelect } from '@mui/material';
import './RankingTable.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Date {
  team_rank: number;
  team_name: string;
  winnerpoint: number;
  win: number;
  draw: number;
  lose: number;
  year: string;
  logo_url: string;  // ロゴのURLを追加
}

const Rank: React.FC = () => {
  const [selectYear, setSelectYear] = useState<string>('2023');
  const [firtereData, setFirterData] = useState<Date[]>([]);
  const [years, setYears] = useState<string[]>();

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

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ranking', {
          params: { year: selectYear },
        });
        console.log('Ranking data:', response.data); // デバッグ用
        setFirterData(response.data);
      } catch (error) {
        console.log('Error fetching ranking data:', error);
      }
    };
    fetchRanking();
  }, [selectYear]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
  };

  return (
    <>
      <InputWrapper label="シーズン" />
      <NativeSelect value={selectYear} onChange={handleChange}>
        {years?.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </NativeSelect>
      <table>
        <thead>
          <tr>
            <th>順位</th>
            <th>チーム名</th>
            <th>勝ち点</th>
            <th>勝</th>
            <th>分</th> 
            <th>負</th>
          </tr>
        </thead>
        <tbody>
          {firtereData.map((item: Date) => (
            <tr key={item.team_rank}>
              <td>{item.team_rank}</td>
              <td>
                  <img src={`${process.env.PUBLIC_URL}/images/clublogo/${item.logo_url}`} alt={`${item.team_name} Logo`}className='logo' style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  {item.team_name}
                </td>
              <td>{item.winnerpoint}</td>
              <td>{item.win}</td>
              <td>{item.draw}</td>
              <td>{item.lose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Rank;
