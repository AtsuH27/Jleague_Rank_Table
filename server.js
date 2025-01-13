const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const { error } = require('console');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

// データベースを指定する
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'f8tpa5sfAtsu',
    database: 'Jleague_Jp'
});

// データベースの接続
db.connect((err) => {
    if (err) throw err; // エラーが発生したときにエラーを投げる
    console.log('Connected to MySQL');
});

// 全てのテーブルのエンドポイントを取得する
app.get('/tables', (req, res) => {
    const sql = 'SHOW TABLES';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching tables:', err);
            res.status(500).send('Error fetching tables');
            return;
        }
        const tables = results.map(row => Object.values(row)[0]);
        res.json(tables);
    });
});

// セレクトボックスの年度を取得する
app.get('/years', (req, res) => {
    const sql = 'SELECT DISTINCT year FROM Jleague_Jp.rank';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching years:', err);
            res.status(500).send('Error fetching years');
            return;
        }
        const years = results.map(row => row.year);
        res.json(years);
    });
});

//ロゴだけ持ってくる

app.get('/logo',(req,res) => {
    const sql ='SELECT logo_url FROM Jleague_Jp.logo';
    db.query(sql,(err,results)=>{
        if(err){
            console.error('Error fetching logos:', err);
            res.status(500).send('Error fetching logos');
            return;
        }
        const logos = results.map(row => row.logo_url);
        res.json(logos);
    });
});



// ランキングデータを取得する
app.get('/ranking', (req, res) => {
    const year = req.query.year;
    const sortOrder = req.query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
    const sql = `
    SELECT
        rk.team_rank,
        ls.logo_url,
        t.team_name,
        rk.winnerpoint,
        rk.win,
        rk.draw,
        rk.lose,
        rk.acl_zone,
        rk.relegation_zone,
        rk.play_off_zone
    FROM
       Jleague_Jp.team AS t
    INNER JOIN
       Jleague_Jp.rank AS rk
    ON
        t.team_id = rk.team_id
    INNER JOIN
       Jleague_Jp.logo AS ls
    ON
        t.team_id = ls.team_id
    WHERE
        rk.year = ?
    ORDER BY
        rk.team_rank ${sortOrder}
    `;
    db.query(sql, [year], (err, results) => {
        if (err) {
            console.error('Error fetching ranking data:', err);
            res.status(500).send('Error fetching ranking data');
            return;
        }
        res.json(results);
    });
});

app.get('/teams', (req, res) => {
    const year = req.query.year;
    const sql = `
      SELECT
        t.team_id,
        t.team_name,
        l.logo_url
      FROM
        Jleague_Jp.team AS t
      INNER JOIN
        Jleague_Jp.logo AS l
      ON
        t.team_id = l.team_id
      INNER JOIN
        Jleague_Jp.rank AS r
      ON
        t.team_id = r.team_id
      WHERE
        r.year = ?;
    `;
    db.query(sql, [year], (err, results) => {
      if (err) {
        console.error('Error fetching teams:', err);
        res.status(500).send('Error fetching teams');
        return;
      }
      res.json(results);
    });
  });

  app.get('/matches', (req, res) => {
    const year = req.query.year;
    const teamId = req.query.team_id; // home_team_id または away_team_id を指定

    console.log(`データ year :${year},データteamId:${teamId}`);

    const sql = `
      SELECT
        home_team.team_name AS home_team_name,
        away_team.team_name AS away_team_name,
        home_logo.logo_url AS home_team_logo_url,
        away_logo.logo_url AS away_team_logo_url,
        m.home_team_score,
        m.away_team_score,
        m.round
      FROM
        Jleague_Jp.match AS m
      INNER JOIN
        Jleague_Jp.team AS home_team
      ON
        m.home_team_id = home_team.team_id
      INNER JOIN
        Jleague_Jp.team AS away_team
      ON
        m.away_team_id = away_team.team_id
      INNER JOIN
        Jleague_Jp.logo AS home_logo
      ON
        home_logo.team_id = home_team.team_id
      INNER JOIN
        Jleague_Jp.logo AS away_logo
      ON
        away_logo.team_id = away_team.team_id
      WHERE
        m.year = ?
      AND
        (m.home_team_id = ? OR m.away_team_id = ?);
    `;

    db.query(sql, [year, teamId, teamId], (err, results) => {
      if (err) {
        console.error('Error fetching match data:', err);
        res.status(500).send('Error fetching match data');
        return;
      }
      console.log('データ!results:',results);
      res.json(results);
    });
});



  // PORT番号を指定する
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
