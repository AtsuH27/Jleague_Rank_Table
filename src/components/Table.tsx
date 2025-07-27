import React from "react";
import { Data } from "../pages/Rank/RankData";

interface tableData {
  data: Data[];
  dbClick?: (obj: Object) => void;
}

const Table: React.FC<tableData> = (props) => {
  return (
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
        {props.data.map((item) => (
          <tr
            key={item.team_rank}
            className={`${item.acl_zone ? "acl" : ""}${
              item.play_off_zone ? "play_off" : ""
            }${item.relegation_zone ? "relegation" : ""}`}
            onDoubleClick={() => props.dbClick?.(item)}
          >
            <td>{item.team_rank}</td>
            <td>
              <img
                src={`${process.env.PUBLIC_URL}/images/clublogo/${item.logo_url}`}
                alt={`${item.team_name} Logo`}
                className="logo"
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
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
  );
};

export default Table;
