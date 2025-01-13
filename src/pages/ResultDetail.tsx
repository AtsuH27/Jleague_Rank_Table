import React, { useEffect, useState } from 'react'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ResultDetail.css';
import { response } from 'express';

interface matchData{
    home_team_name:string;
    away_team_name:string;
    home_team_score:string;
    away_team_score:string;
    home_team_logo_url:string;
    away_team_logo_url:string;
    round:number;
}

const ResultDetail = () => {
 
    const { id: team_id } = useParams<{ id: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const year = searchParams.get('year');

    const navigate = useNavigate();
    const [matchData,setMatchData]=useState<matchData[]>([]);

    const handleIconClick=()=>{
        navigate('/result');
    };
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await fetch(`/matches?year=${year}&team_id=${team_id}`);
                if (!response.ok) {
                    const errorResponseText = await response.text();
                    console.log('エラーテキスト',errorResponseText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('データのログ data',data);
                setMatchData(data);
            } catch (error) {
                console.log('Error fetching match data:', error);
            }
        };
        if (year && team_id) {
            fetchMatchData();
        }
        console.log('ああteam_id:', team_id);
        console.log('ああteam_id:', team_id);
        console.log('おおyear:', year);
    }, [year, team_id]);

    return (
        <>
        <div className='ReplayIcon'>
        <ReplyAllIcon onClick={handleIconClick}/>
        </div>
        <div className='team'>
            {matchData.length > 0 ?(
            matchData.map((item,index)=>(
                <div key={index} className='match'>
                    <h4>第{item.round}節</h4>
                    <div className='match_detail'>
                            <span className='home_team_name'>{item.home_team_name}</span>
                            <img src={item.home_team_logo_url} className="home_team-logo" alt="home team logo" />
                            <span className='home_team_score'>{item.home_team_score}</span>
                            <a className='midle'> - </a>
                            <span className='away_team_score'>{item.away_team_score}</span>
                            <img src={item.away_team_logo_url} className="away_team-logo" alt="away team logo" />
                            <span className='away_team_name'>{item.away_team_name}</span>
                    </div>
                </div>
            ))
        ):(
                <p>No Match available</p>
            )
        }
        </div>
        </>
  )
}

export default ResultDetail
