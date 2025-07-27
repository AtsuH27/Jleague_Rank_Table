import { InputWrapper, Title } from "@mantine/core";
import "./RankingTable.css";
import React, { useState } from "react";
// import axios from 'axios';
import { Data, rankData } from "./RankData";
import Select from "../../components/Select";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { modalData, teamModalData } from "../../components/ModalData";
import { HandClick } from "tabler-icons-react";

const Rank: React.FC = () => {
  const years = ["2023", "2022", "2021"];
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  //年度でフィルターをかける
  const filterData = rankData.filter((item) => item.year === selectedYear);

  // const [firtereData, setFirterData] = useState<Data[]>([]);
  // const [years, setYears] = useState<string[]>();
  //仮置きのセレクトボックス
  const [select, setSelect] = useState("");

  const [sortOrder, setSortOrder] = useState<string>("ASC");

  //モーダルの開閉フラグ
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /*バッグエンドでDBからデータを取ってくるのはコメントアウト*/

  // useEffect(() => {
  //   const fetchYears = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/years');
  //       setYears(response.data);
  //     } catch (error) {
  //       console.log('Error fetching years:', error);
  //     }
  //   };
  //   fetchYears();
  // }, []);

  // useEffect(() => {
  //   const fetchRanking = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/ranking', {
  //         params: { year: selectYear, sortOrder: sortOrder }, // ソート順をリクエストに追加
  //       });
  //       console.log('Ranking data:', response.data); // デバッグ用
  //       setFirterData(response.data);
  //     } catch (error) {
  //       console.log('Error fetching ranking data:', error);
  //     }
  //   };
  //   fetchRanking();
  // }, [selectYear, sortOrder]); // ソート順が変更されたときにもデータをフェッチ

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectYear(e.target.value);
  // };

  // const handleSort=()=>{
  //   setSortOrder(prevOrder=>prevOrder==='ASC'?'DESC':'ASC');
  // };

  const filterdModalData = teamModalData
    .filter((modal) => modal.year === selectedYear)
    .sort((a, b) => a.rank - b.rank); //ランク昇順に並べる

  console.log(filterdModalData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  //ダブルクリックした行をモーダル表示
  const dbClick = (obj: object) => {
    //テーブルのデータ
    const row = obj as Data;
    //モーダルのデータ
    const index = filterdModalData.findIndex(
      (modal) => modal.year === row.year && modal.teamName === row.team_name
    );
    //選択した行と、モーダルの年度＆＆チーム名がマッチしていた時に、モーダルを開く。
    if (index !== 1) {
      setSelectedIndex(index);
      setIsModalOpen(true);
    }
  };

  const selectedTeam =
    selectedIndex !== null ? filterdModalData[selectedIndex] : undefined;
  console.log(selectedTeam);

  return (
    <>
      <Title>年間順位</Title>
      <InputWrapper label="シーズン" />
      {/*セレクトボックスは仮置き*/}
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Select
          style={{ padding: "15px", width: "120px" }}
          onChange={setSelectedYear}
          selectedYear={selectedYear}
          years={years}
        />
      </div>
      {/*テーブルの値*/}
      <Table
        data={filterData}
        /*ダブルクリックした時の処理はここに記載する。*/
        dbClick={dbClick}
      />
      {/*モーダルの呼び出し*/}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setIsModalOpen(true)}>モーダルボタン</button>
        <Modal
          modal={{ isModalOpen, setIsModalOpen }}
          //参考演算子でデータがある場合（配列にする）とデータがない場合で空（配列で空）で判定する。
          data={selectedTeam ? [selectedTeam] : []}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          dataList={filterdModalData}
        />
      </div>

      {/*リーグ規則のガイダンス*/}
      <div className="rule" style={{ marginTop: "50px", padding: "20px" }}>
        <h3>J1試合方式および勝敗の決定</h3>
        <h4>
          90分間(前半&後半45分)の試合を行い、勝敗が決しない場合は引き分けとする。
        </h4>
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
