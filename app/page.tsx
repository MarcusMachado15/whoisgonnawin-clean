'use client';
import React, { useState } from "react";
import './styles.css';

const stages = {
  "Group Stage": [
    { position: 1, team: "Real Madrid", played: 8, won: 7, drawn: 0, lost: 1, goalsFor: 19, goalsAgainst: 8, goalDifference: "+11", points: 21 },
    { position: 2, team: "SL Benfica", played: 8, won: 6, drawn: 2, lost: 0, goalsFor: 13, goalsAgainst: 6, goalDifference: "+7", points: 20 },
    { position: 3, team: "Manchester City", played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 10, goalDifference: "+11", points: 17 },
    { position: 4, team: "Borussia Dortmund", played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 19, goalsAgainst: 11, goalDifference: "+8", points: 17 },
    { position: 5, team: "Stade Brestois 29", played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 16, goalsAgainst: 11, goalDifference: "+5", points: 16 },
    { position: 6, team: "Internazionale", played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 13, goalsAgainst: 9, goalDifference: "+4", points: 16 },
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
  ],

  "Playoff Round of 16": [
    { home: "FC Barcelona", away: "Liverpool", score: "1 - 0", aggregate: "2-0" },
    { home: "Liverpool", away: "FC Barcelona", score: "0 - 1", aggregate: "Barcelona won 0-2" },
    { home: "RB Leipzig", away: "Atlético de Madrid", score: "2 - 1", aggregate: "3-3" },
    { home: "Atlético de Madrid", away: "RB Leipzig", score: "1 - 1", aggregate: "RB Leipzig won 2-3" },
    { home: "BSC Young Boys", away: "AS Monaco", score: "1 - 2", aggregate: "1-4" },
    { home: "AS Monaco", away: "BSC Young Boys", score: "2 - 0", aggregate: "Monaco won 4-1" },
    { home: "Girona FC", away: "AC Milan", score: "1 - 1", aggregate: "2-1" },
    { home: "AC Milan", away: "Girona FC", score: "0 - 1", aggregate: "Girona won 1-2" },
    { home: "Shakhtar Donetsk", away: "Leverkusen", score: "0 - 0", aggregate: "0-2" },
    { home: "Leverkusen", away: "Shakhtar Donetsk", score: "2 - 1", aggregate: "Leverkusen won 2-1" },
    { home: "Sporting CP", away: "Celtic", score: "1 - 0", aggregate: "2-1" },
    { home: "Celtic", away: "Sporting CP", score: "1 - 1", aggregate: "Sporting won 1-2" },
    { home: "PSV", away: "VfB Stuttgart", score: "1 - 0", aggregate: "1-1 (4-3 pens)" },
    { home: "VfB Stuttgart", away: "PSV", score: "1 - 0", aggregate: "Stuttgart won 1-1 (4-3 pens)" },
    { home: "FC Bayern München", away: "Juventus", score: "2 - 1", aggregate: "3-1" },
    { home: "Juventus", away: "FC Bayern München", score: "0 - 1", aggregate: "Bayern Munchen won 1-3" }
  ],

  "Round of 16": [
    { home: "Sporting CP", away: "Borussia Dortmund" , score: "1 - 1"},
    { home: "Borussia Dortmund", away: "Sporting CP", score: "1 - 1", aggregate: "Dortmund won 1 - 1 (5-3 pens)"},
    { home: "Leverkusen", away: "Internazionale" , score: "0 - 0"},
    { home: "Internazionale", away: "Leverkusen" },
    { home: "Girona FC", away: "Manchester City" , score: "0 - 0"},
    { home: "Manchester City", away: "Girona FC" },
    { home: "FC Bayern München", away: "Stade Brestois 29" , score: "3 - 0"},
    { home: "Stade Brestois 29", away: "FC Bayern München" },
    { home: "AS Monaco", away: "Real Madrid" , score: "0 - 1"},
    { home: "Real Madrid", away: "AS Monaco" , score: "2 - 0", aggregate: "Real Madrid won 3 - 0"},
    { home: "VfB Stuttgart", away: "Arsenal" , score: "1 - 0"},
    { home: "Arsenal", away: "VfB Stuttgart" , score: "1 - 1", aggregate: "Stuttgart won 1 - 2"},
    { home: "FC Barcelona", away: "SL Benfica" , score: "3 - 0"},
    { home: "SL Benfica", away: "FC Barcelona" , score: "0 - 1", aggregate: "Barcelona won 0 - 4"},
    { home: "RB Leipzig", away: "Paris SG" , score: "0 - 2"},
    { home: "Paris SG", away: "RB Leipzig", score: "2 - 0", aggregate: "PSG won 4 - 0"}
  ],

  "Quarter Finals": [],
  "Semi Final": [],
  "Final": []
};

const stageNames = Object.keys(stages);

export default function TournamentPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const currentData = stages[stageNames[currentStage]];

  return (
    <div>
      <h1>Champions League Standings 2025</h1>

      <div className="tabs">
        {stageNames.map((stage, index) => (
          <button
            key={index}
            onClick={() => setCurrentStage(index)}
            className={currentStage === index ? "active" : ""}
          >
            {stage}
          </button>
        ))}
      </div>

      <h2>{stageNames[currentStage]}</h2>

      {Array.isArray(currentData) && currentData.length > 0 && currentData[0].position !== undefined ? (
        <table className="group-stage">
          <thead>
            <tr>
              <th>Position</th><th>Team</th><th>Pts</th><th>Pld</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((team, index) => (
              <tr key={index}>
                <td>{team.position}</td>
                <td>{team.team}</td>
                <td>{team.points}</td>
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
      ) : (
        <table>
          <thead>
            <tr><th>Home</th><th>Score</th><th>Away</th></tr>
          </thead>
          <tbody>
  {currentData.map((match, index) => (
    <React.Fragment key={index}>
      <tr>
        <td>{match.home}</td>
        <td>{match.score || '-'}</td>
        <td>{match.away}</td>
      </tr>
      {index % 2 === 1 && (
        <>
          <tr className="aggregate-line">
            <td colSpan={3}><strong>Aggregate: {match.aggregate || '-'}</strong></td>
          </tr>
          <tr className="match-divider">
            <td colSpan={3}></td>
          </tr>
        </>
      )}
    </React.Fragment>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}