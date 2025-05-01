import React from "react";
import './styles.css';

const teams = [
  { position: 1, team: "Real Madrid", played: 8, won: 7, drawn: 0, lost: 1, goalsFor: 19, goalsAgainst: 8, goalDifference: "+11", points: 21 },
  { position: 2, team: "SL Benfica", played: 8, won: 6, drawn: 2, lost: 0, goalsFor: 13, goalsAgainst: 6, goalDifference: "+7", points: 20 },
  { position: 3, team: "Manchester City", played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 10, goalDifference: "+11", points: 17 },
  { position: 4, team: "Borussia Dortmund", played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 19, goalsAgainst: 11, goalDifference: "+8", points: 17 },
  { position: 5, team: "Stade Brestois 29", played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 16, goalsAgainst: 11, goalDifference: "+5", points: 16 },
  { position: 6, team: "Internazionale Milan", played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 13, goalsAgainst: 9, goalDifference: "+4", points: 16 },
  { position: 7, team: "Paris SG", played: 8, won: 4, drawn: 3, lost: 1, goalsFor: 17, goalsAgainst: 12, goalDifference: "+5", points: 15 },
  { position: 8, team: "Arsenal", played: 8, won: 4, drawn: 3, lost: 1, goalsFor: 17, goalsAgainst: 12, goalDifference: "+5", points: 15 },
  { position: 9, team: "Liverpool", played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 17, goalsAgainst: 13, goalDifference: "+4", points: 14 },
  { position: 10, team: "Atlético de Madrid", played: 8, won: 4, drawn: 1, lost: 3, goalsFor: 15, goalsAgainst: 10, goalDifference: "+5", points: 13 },
  { position: 11, team: "AS Monaco", played: 8, won: 4, drawn: 1, lost: 3, goalsFor: 16, goalsAgainst: 12, goalDifference: "+4", points: 13 },
  { position: 12, team: "AC Milan", played: 8, won: 3, drawn: 4, lost: 1, goalsFor: 15, goalsAgainst: 13, goalDifference: "+2", points: 13 },
  { position: 13, team: "Bayer Leverkusen", played: 8, won: 3, drawn: 4, lost: 1, goalsFor: 13, goalsAgainst: 10, goalDifference: "+3", points: 13 },
  { position: 14, team: "Celtic", played: 8, won: 4, drawn: 1, lost: 3, goalsFor: 15, goalsAgainst: 14, goalDifference: "+1", points: 13 },
  { position: 15, team: "VfB Stuttgart", played: 8, won: 3, drawn: 1, lost: 4, goalsFor: 12, goalsAgainst: 13, goalDifference: "-1", points: 13 },
  { position: 16, team: "Juventus", played: 8, won: 3, drawn: 1, lost: 4, goalsFor: 15, goalsAgainst: 14, goalDifference: "+1", points: 13 },
  { position: 17, team: "FC Bayern München", played: 8, won: 3, drawn: 3, lost: 2, goalsFor: 11, goalsAgainst: 8, goalDifference: "+3", points: 12 },
  { position: 18, team: "RB Leipzig", played: 8, won: 3, drawn: 2, lost: 3, goalsFor: 15, goalsAgainst: 14, goalDifference: "+1", points: 11 },
  { position: 19, team: "FC Barcelona", played: 8, won: 3, drawn: 2, lost: 3, goalsFor: 12, goalsAgainst: 11, goalDifference: "+1", points: 11 },
  { position: 20, team: "BSC Young Boys", played: 8, won: 3, drawn: 2, lost: 3, goalsFor: 12, goalsAgainst: 12, goalDifference: "0", points: 11 },
  { position: 21, team: "Girona FC", played: 8, won: 3, drawn: 1, lost: 4, goalsFor: 12, goalsAgainst: 14, goalDifference: "-2", points: 10 },
  { position: 22, team: "Sporting CP", played: 8, won: 2, drawn: 4, lost: 2, goalsFor: 10, goalsAgainst: 13, goalDifference: "-3", points: 10 },
  { position: 23, team: "PSV", played: 8, won: 2, drawn: 1, lost: 5, goalsFor: 14, goalsAgainst: 12, goalDifference: "+2", points: 10 },
  { position: 24, team: "Shakhtar Donetsk", played: 8, won: 2, drawn: 3, lost: 3, goalsFor: 12, goalsAgainst: 14, goalDifference: "-2", points: 9 },
  { position: 25, team: "Club Brugge", played: 8, won: 2, drawn: 3, lost: 3, goalsFor: 14, goalsAgainst: 17, goalDifference: "-3", points: 9 },
  { position: 26, team: "Sparta Praha", played: 8, won: 3, drawn: 0, lost: 5, goalsFor: 12, goalsAgainst: 15, goalDifference: "-3", points: 9 },
  { position: 27, team: "Feyenoord", played: 8, won: 2, drawn: 3, lost: 3, goalsFor: 10, goalsAgainst: 13, goalDifference: "-3", points: 9 },
  { position: 28, team: "Aston Villa", played: 8, won: 1, drawn: 5, lost: 2, goalsFor: 11, goalsAgainst: 12, goalDifference: "-1", points: 8 },
  { position: 29, team: "LOSC Lille", played: 8, won: 2, drawn: 2, lost: 4, goalsFor: 12, goalsAgainst: 17, goalDifference: "-5", points: 8 },
  { position: 30, team: "Bologna", played: 8, won: 2, drawn: 2, lost: 4, goalsFor: 9, goalsAgainst: 14, goalDifference: "-5", points: 8 },
  { position: 31, team: "Atalanta", played: 8, won: 2, drawn: 0, lost: 6, goalsFor: 12, goalsAgainst: 15, goalDifference: "-3", points: 6 },
  { position: 32, team: "RB Salzburg", played: 8, won: 1, drawn: 2, lost: 5, goalsFor: 9, goalsAgainst: 17, goalDifference: "-8", points: 5 },
  { position: 33, team: "Dinamo Zagreb", played: 8, won: 1, drawn: 2, lost: 5, goalsFor: 10, goalsAgainst: 18, goalDifference: "-8", points: 5 },
  { position: 34, team: "SK Sturm Graz", played: 8, won: 1, drawn: 0, lost: 7, goalsFor: 9, goalsAgainst: 20, goalDifference: "-11", points: 3 },
  { position: 35, team: "Rosenborg BK", played: 8, won: 0, drawn: 1, lost: 7, goalsFor: 8, goalsAgainst: 21, goalDifference: "-13", points: 1 },
  { position: 36, team: "FC Luzern", played: 8, won: 0, drawn: 0, lost: 8, goalsFor: 9, goalsAgainst: 21, goalDifference: "-12", points: 0 }
];

export default function TournamentPage() {
  return (
    <div>
      <h1>Champions League Standings</h1>

      <a href="https://your-site-url" target="_blank">
        <button style={{ padding: '10px 20px', backgroundColor: '#0044cc', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }}>
          Check out the Champions League standings here!
        </button>
      </a>

      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Pld</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.position}</td>
              <td>{team.team}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
