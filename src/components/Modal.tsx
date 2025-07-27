import React, { Children, useState } from "react";
import "./Modal.css";
import { teamModalData } from "./ModalData";
import type { modalData } from "./ModalData";

/**
 *ダブルクリックした際に、開かれるモーダル
 *シーズン(年度)
 *チーム名 勝点
 * そのシーズンのチームの画像
 */

interface modalModo {
  isModalOpen: boolean;
  setIsModalOpen: (flg: boolean) => void;
}

type displayDataModal = {
  modal: modalModo; //モーダル開閉フラグ
  data?: modalData[]; //モーダルデータ
  dataList: modalData[]; //一覧
  currentIndex: number | null; //現在位置
  setCurrentIndex: (index: number) => void; //前へ次へ移動する
};

const Modal: React.FC<displayDataModal> = (props) => {
  const { modal, data, dataList, currentIndex, setCurrentIndex } = props;

  if (!modal.isModalOpen || currentIndex === null) return null;

  //一覧データ
  const currentData = dataList[currentIndex];
  //前データ
  const isFirst = currentIndex === 0;
  //次データ
  const isLast = currentIndex === dataList.length - 1;
  //前へ
  const handlePrev = () => {
    if (!isFirst) setCurrentIndex(currentIndex - 1);
  };
  //次へ
  const handleNext = () => {
    if (!isLast) setCurrentIndex(currentIndex + 1);
  };

  console.log(currentIndex);
  console.log(isFirst);
  console.log(isLast);

  return (
    <div className="modal_wrap">
      <div id="overlay">
        <div id="content">
          <>
            <div style={{ display: "flex" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/clublogo/${currentData.logo_url}`}
                alt={`${currentData.teamName} Logo`}
                className="logo"
                style={{
                  marginTop: "30px",
                  width: "120px",
                  height: "120px",
                  marginRight: "8px",
                }}
              />
              <div style={{ marginLeft: "50px", marginTop: "40px" }}>
                <h1>{currentData.teamName}</h1>
              </div>
            </div>
            <div className="year" style={{ textAlign: "center" }}>
              <h2>{currentData.year}</h2>
            </div>
            <div style={{ textAlign: "right", marginRight: "50px" }}>
              <h3>J1　{currentData.rank}位</h3>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/clubImage/${currentData.year}/${currentData.photo}`}
                alt={`${currentData.teamName}Logo`}
                style={{ width: "50%" }}
              />
            </div>
            {currentData.text}
            <div
              className="prevNext"
              style={{ display: "flex", marginTop: "20px" }}
            >
              <button
                className={isFirst ? "prevDisabledButton" : "prevButton"}
                style={{ marginRight: "50px" }}
                onClick={handlePrev}
                disabled={isFirst}
              >
                ＜
              </button>
              <button
                className={isLast ? "nextDisabledButton" : "nextButton"}
                disabled={isLast}
                onClick={handleNext}
              >
                ＞
              </button>
            </div>
            {/*Todo closeボタンのスタイリングを見直す*/}
            <div className="button" style={{ textAlign: "right" }}>
              <p>
                <button onClick={() => modal.setIsModalOpen(false)}>
                  close
                </button>
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Modal;
