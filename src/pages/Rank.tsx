import { InputWrapper, Title } from '@mantine/core';
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
  relegation_zone:boolean;
  acl_zone:boolean;
  play_off_zone:boolean;
}

const Rank: React.FC = () => {
  const [selectYear, setSelectYear] = useState<string>('2023');
  const [firtereData, setFirterData] = useState<Date[]>([]);
  const [years, setYears] = useState<string[]>();
  const [sortOrder,setSortOrder] = useState<string>('ASC');

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
          params: { year: selectYear, sortOrder: sortOrder }, // ソート順をリクエストに追加
        });
        console.log('Ranking data:', response.data); // デバッグ用
        setFirterData(response.data);
      } catch (error) {
        console.log('Error fetching ranking data:', error);
      }
    };
    fetchRanking();
  }, [selectYear, sortOrder]); // ソート順が変更されたときにもデータをフェッチ

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value);
  };

  const handleSort=()=>{
    setSortOrder(prevOrder=>prevOrder==='ASC'?'DESC':'ASC');
  };

  return (
    <>
      <Title>年間順位</Title>
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
            <th onClick={handleSort} style={{cursor:'pointer'}}>
              順位{sortOrder === 'ASC'?'↑':'↓'}
            </th>
            <th>チーム名</th>
            <th>勝ち点</th>
            <th>勝</th>
            <th>分</th>
            <th>負</th>
          </tr>
        </thead>
        <tbody>
          {firtereData.map((item: Date) => (
            <tr key={item.team_rank} className={`${item.acl_zone ?'acl':''}${item.play_off_zone ?'play_off':''}${item.relegation_zone ?'relegation':''}`}>
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
      <div className='rule'>
        <h3>J1試合方式および勝敗の決定</h3>
        <h4>90分間(前半&後半45分)の試合を行い、勝敗が決しない場合は引き分けとする。</h4>
        <li>勝点</li>
        <h4>勝利 : 3点, 引き分け : 1点, 敗戦 : 0点</h4>
        <h4>ACL出場圏内 プレーオフ出場圏 J2自動降格圏内</h4>
        <li>年間順位の決定</li>
        <ol>
          <li>得失点差</li>
          <li>総得点数</li>
          <li>当該チーム間の対戦成績(イ:勝ち点,ロ:得失点差,ハ:総得点差)</li>
          <li>反則ポイント</li>
          <li>抽選</li>
        </ol>
      </div>
    </>
  );
};

export default Rank;
