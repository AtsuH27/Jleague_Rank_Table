import React from 'react'
import './Select.css'

interface selectData{
    //年度を配列で表示する ※2021 2022 2023など
    years:string[];
    //選択した年度の事
    selectedYear:string;
    //選択した年度がモックデータと同じ場合に、画面の表示切替を行う。
    onChange:(value:string)=>void;
    //CSSのスタイルを当てる。
    style?:React.CSSProperties;
};


const Select:React.FC<selectData> = (props) => {
  return (
    <select
        className='select-box'
        style={props.style}
        value={props.selectedYear}
        onChange={(e)=>props.onChange(e.target.value)}
    >
        {props.years.map((year)=>(
            <option key={year}>
                {year}
            </option>
        ))}
    </select>
  )
}

export default Select
