import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import './Practice.css';

interface mockMatch{
    home_team_name:string;
    away_team_name:string;
    home_team_score:number;
    away_team_score:number;
    home_logo_url:string;
    away_logo_url:string;
    round:number;
};


const mockDate:mockMatch[]=[
    {
        home_team_name:'サンフレッチェ広島',
        away_team_name:'北海道コンサドーレ札幌',
        home_team_score:1,
        away_team_score:0,
        home_logo_url:'sanfrecce-logo.png',
        away_logo_url:'sapporo-logo.png',
        round:1,
    },
    {
        home_team_name:'セレッソ大阪',
        away_team_name:'北海道コンサドーレ札幌',
        home_team_score:3,
        away_team_score:3,
        home_logo_url:'seresso-logo.png',
        away_logo_url:'sapporo-logo.png',
        round:2,
    },
    {
        home_team_name:'北海道コンサドーレ札幌',
        away_team_name:'清水エスパルス',
        home_team_score:1,
        away_team_score:3,
        home_logo_url:'sapporo-logo.png',
        away_logo_url:'shimizu-logo.png',
        round:3,
    }
];

const Practice = () => {
  const navigate=useNavigate();


  const handleChange=()=>{
    navigate('/result');
  }

    return (
    <>
        <ReplyAllIcon onClick={handleChange}/>
        <div className='team'>
        {mockDate.map((item:mockMatch)=>(
            <div className='match'>
                <h4 className='round'>第{item.round}節</h4>
                    <div className='match_detail'>
                        <span className='home_team_name'>{item.home_team_name}</span>
                        <img  key={item.home_team_name} src={`${process.env.PUBLIC_URL}/images/clublogo/${item.home_logo_url}`} className="home_team-logo"/>
                        <span className='home_team_score'>{item.home_team_score}</span>
                        <a className='midle'> - </a>
                        <span className='away_team_score'>{item.away_team_score}</span>
                        <img  key={item.away_team_name} src={`${process.env.PUBLIC_URL}/images/clublogo/${item.away_logo_url}`} className="away_team-logo"/>
                        <span className='away_team_name'>{item.away_team_name}</span>
                    </div>              
            </div>
        ))}
        </div>
    </>
  )
}

export default Practice
