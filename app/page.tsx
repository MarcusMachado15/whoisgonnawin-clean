import React, { useState } from "react";
import './styles.css';

const stages = {
  "Group Stage": [
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
    // ... continue if needed
  ],
  "Playoff Round of 16": [],
  "Round of 16": [],
  "Quarter Finals": [],
  "Semi Final": [],
  "Final": []
};

const stageNames = Object.keys(stages);

export default function TournamentPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const currentTeams = stages[stageNames[currentStage]];

  const nextStage = () => {
    if (currentStage < stageNames.length - 1) setCurrentStage(currentStage + 1);
  };

  const prevStage = () => {
    if (currentStage > 0) setCurrentStage(currentStage - 1);
  };

  return (
    <div>
      <h1>Champions League Standings 2025</h1>
      <h2>{stageNames[currentStage]}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '15px' }}>
        <button onClick={prevStage} disabled={currentStage === 0}>⬅ Prev</button>
        <button onClick={nextStage} disabled={currentStage === stageNames.length - 1}>Next ➡</button>
      </div>

      <table>
  <thead>
    <tr>
      <th><strong>Pts</strong></th>
      <th>Position</th>
      <th>Team</th>
      <th>Pld</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th>GF</th>
      <th>GA</th>
      <th>GD</th>
    </tr>
  </thead>
  <tbody>
    {currentTeams.map((team, index) => (
      <tr key={index}>
        <td><strong>{team.points}</strong></td>
        <td>{team.position}</td>
        <td>{team.team}</td>
        <td>{team.played}</td>
        <td>{team.won}</td>
        <td>{team.drawn}</td>
        <td>{team.lost}</td>
        <td>{team.goalsFor}</td>
        <td>{team.goalsAgainst}</td>
        <td>{team.goalDifference}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
