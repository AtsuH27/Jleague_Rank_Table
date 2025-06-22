import React, { Children } from 'react'
import './Modal.css';
import { teamModalData } from './ModalData';
import type { modalData } from './ModalData';



/**
 *ダブルクリックした際に、開かれるモーダル
 *シーズン(年度)
 *チーム名 勝点
 * そのシーズンのチームの画像
 */

 interface modalModo{
  isModalOpen:boolean;
  setIsModalOpen:(flg:boolean)=>void;
 }

 type displayDataModal={
  modal:modalModo,
  data?:modalData[];
 }


const Modal:React.FC<displayDataModal> = (props) => {
  const data =props.data;
  const modal=props.modal;
  
  if(!modal.isModalOpen)
    return null;
  return (
    <div className='modal_wrap'>
      <div id='overlay'>
        <div id='content'>
        {data?.map((item)=>(
        <>
        <div style={{display:'flex'}}>
          <img src={`${process.env.PUBLIC_URL}/images/clublogo/${item.logo_url}`} alt={`${item.teamName} Logo`} className='logo' style={{ marginTop:'30px',width: '120px', height: '120px', marginRight: '8px' }} />
          <div style={{marginLeft:'50px',marginTop:'40px'}}>
            <h1>{item.teamName}</h1>
          </div>
        </div>
        <div className='year' style={{textAlign:'center'}}>
          <h2>{item.year}</h2>
        </div>
        <div style={{textAlign:'right',marginRight:'50px'}}>
          <h3>J1　{item.rank}位</h3>
          </div>
          <div style={{textAlign:'center'}}>
          <img src={`${process.env.PUBLIC_URL}/images/clubImage/${item.year}/${item.photo}`} alt={`${item.teamName}Logo`} style={{ width: '50%'}} />
          </div>
          {item.text}
          <p><button onClick={()=>modal.setIsModalOpen(false)}>close</button></p>
        </>
        ))  
        }
          </div>
      </div>
    </div>
  )
};

export default Modal
