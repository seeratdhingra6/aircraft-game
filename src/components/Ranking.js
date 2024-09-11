import React from "react";
import "./GameOverScreen.css";

function Ranking({ rankings }) {
  return (
    <div className="ranking-table">
      <h1>Ranking</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time (s)</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((rank, index) => (
            <tr key={rank.id}>
              <td>{index + 1}</td>
              <td>{rank.name}</td>
              <td>{rank.time}</td>
              <td>{rank.stars}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;
