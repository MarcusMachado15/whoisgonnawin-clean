// app/worldcup/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import '../styles.css';

type Match = { home: string; score: string; away: string };
type Standing = {
  pos: number;
  team: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number; // e.g. 9, -4
  pts: number;
};

/**
 * When standings are empty, we auto-generate rows with the team names (0 pts).
 */
function deriveZeroRows(matches: Match[]): Standing[] {
  const seen = new Map<string, true>();
  for (const m of matches) {
    if (m.home) seen.set(m.home, true);
    if (m.away) seen.set(m.away, true);
  }
  const teams = Array.from(seen.keys()).sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  );

  return teams.map((team, i) => ({
    pos: i + 1,
    team,
    played: 0,
    won: 0,
    draw: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    pts: 0,
  }));
}

const groupsData: Record<string, { title?: string; matches: Match[]; standings: Standing[] }> = {
  'Group A': {
    title: 'Group A — WC Finals 2025',
    matches: [
      { home: '🇦🇷 Argentina',   score: '3-1', away: '🇬🇭 Ghana' },
      { home: '🇨🇭 Switzerland', score: '2-3', away: '🇶🇦 Qatar' },
      { home: '🇦🇷 Argentina',   score: '–', away: '🇶🇦 Qatar' },
      { home: '🇨🇭 Switzerland', score: '–', away: '🇬🇭 Ghana' },
      { home: '🇦🇷 Argentina',   score: '–', away: '🇨🇭 Switzerland' },
      { home: '🇶🇦 Qatar',       score: '–', away: '🇬🇭 Ghana' },
    ],
    standings: [
  { pos: 1, team: '🇦🇷 Argentina',     played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 1, gd:  2, pts: 3 },
  { pos: 2, team: '🇶🇦 Qatar',         played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2, gd:  1, pts: 3 },
  { pos: 3, team: '🇨🇭 Switzerland',   played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 0 },
  { pos: 4, team: '🇬🇭 Ghana',         played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },],
  },

  'Group B': {
    title: 'Group B — WC Finals 2025',
    matches: [
      { home: '🇩🇪 Germany', score: '3-0', away: '🇧🇴 Bolivia' },
      { home: '🏴 Wales',    score: '1-3', away: '🇨🇲 Cameroon' },
      { home: '🇩🇪 Germany', score: '–', away: '🇨🇲 Cameroon' },
      { home: '🏴 Wales',    score: '–', away: '🇧🇴 Bolivia' },
      { home: '🇩🇪 Germany', score: '–', away: '🏴 Wales' },
      { home: '🇨🇲 Cameroon',score: '–', away: '🇧🇴 Bolivia' },
    ],
    standings: [ { pos: 1, team: '🇩🇪 Germany',   played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 0, gd:  3, pts: 3 },
  { pos: 2, team: '🇨🇲 Cameroon',  played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 1, gd:  2, pts: 3 },
  { pos: 3, team: '🏴 Wales',      played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },
  { pos: 4, team: '🇧🇴 Bolivia',   played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 3, gd: -3, pts: 0 },
],
  },

  'Group C': {
    title: 'Group C — WC Finals 2025',
    matches: [
      { home: '🇺🇸 United States', score: '3-1', away: '🇳🇿 New Zealand' },
      { home: '🇺🇦 Ukraine',       score: '3-2', away: '🇨🇱 Chile' },
      { home: '🇺🇸 United States', score: '–', away: '🇨🇱 Chile' },
      { home: '🇺🇦 Ukraine',       score: '–', away: '🇳🇿 New Zealand' },
      { home: '🇺🇸 United States', score: '–', away: '🇺🇦 Ukraine' },
      { home: '🇨🇱 Chile',         score: '–', away: '🇳🇿 New Zealand' },
    ],
    standings: [ { pos: 1, team: '🇺🇸 United States', played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 1, gd:  2, pts: 3 },
  { pos: 2, team: '🇺🇦 Ukraine',       played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2, gd:  1, pts: 3 },
  { pos: 3, team: '🇨🇱 Chile',         played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 0 },
  { pos: 4, team: '🇳🇿 New Zealand',   played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },
],
  },

  'Group D': {
    title: 'Group D — WC Finals 2025',
    matches: [
      { home: '🇮🇹 Italy',   score: '3-2', away: '🇻🇳 Vietnam' },
      { home: '🇳🇴 Norway',  score: '2-0', away: '🇵🇪 Peru' },
      { home: '🇮🇹 Italy',   score: '–', away: '🇵🇪 Peru' },
      { home: '🇳🇴 Norway',  score: '–', away: '🇻🇳 Vietnam' },
      { home: '🇮🇹 Italy',   score: '–', away: '🇳🇴 Norway' },
      { home: '🇵🇪 Peru',    score: '–', away: '🇻🇳 Vietnam' },
    ],
    standings: [  { pos: 1, team: 'No Norway',  played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 0, gd:  2, pts: 3 },
  { pos: 2, team: 'It Italy',   played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2, gd:  1, pts: 3 },
  { pos: 3, team: 'Vn Vietnam', played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 0 },
  { pos: 4, team: 'Pe Peru',    played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
],
  },

  'Group E': {
    title: 'Group E — WC Finals 2025',
    matches: [
      { home: '🇪🇸 Spain',        score: '2-1', away: '🇮🇪 Ireland' },
      { home: '🇯🇵 Japan',        score: '4-3', away: '🇨🇮 Ivory Coast' },
      { home: '🇪🇸 Spain',        score: '–', away: '🇨🇮 Ivory Coast' },
      { home: '🇯🇵 Japan',        score: '–', away: '🇮🇪 Ireland' },
      { home: '🇪🇸 Spain',        score: '–', away: '🇯🇵 Japan' },
      { home: '🇨🇮 Ivory Coast',  score: '–', away: '🇮🇪 Ireland' },
    ],
    standings: [ { pos: 1, team: 'jp Japan',        played: 1, won: 1, draw: 0, lost: 0, gf: 4, ga: 3, gd: +1, pts: 3 },
  { pos: 2, team: 'es Spain',        played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1, gd: +1, pts: 3 },
  { pos: 3, team: 'ci Ivory Coast',  played: 1, won: 0, draw: 0, lost: 1, gf: 3, ga: 4, gd: -1, pts: 0 },
  { pos: 4, team: 'ie Ireland',      played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
],
  },

  'Group F': {
    title: 'Group F — WC Finals 2025',
    matches: [
      { home: '🇺🇾 Uruguay',    score: '0-1', away: '🇬🇳 Guinea' },
      { home: '🇸🇪 Sweden',     score: '2-1', away: '🇺🇿 Uzbekistan' },
      { home: '🇺🇾 Uruguay',    score: '–', away: '🇺🇿 Uzbekistan' },
      { home: '🇸🇪 Sweden',     score: '–', away: '🇬🇳 Guinea' },
      { home: '🇺🇾 Uruguay',    score: '–', away: '🇸🇪 Sweden' },
      { home: '🇺🇿 Uzbekistan', score: '–', away: '🇬🇳 Guinea' },
    ],
    standings: [{ pos: 1, team: 'se Sweden',     played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1, gd: +1, pts: 3 },
  { pos: 2, team: 'gn Guinea',     played: 1, won: 1, draw: 0, lost: 0, gf: 1, ga: 0, gd: +1, pts: 3 },
  { pos: 3, team: 'uy Uruguay',    played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 1, gd: -1, pts: 0 },
  { pos: 4, team: 'uz Uzbekistan', played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
],
  },

  'Group G': {
    title: 'Group G — WC Finals 2025',
    matches: [
      { home: '🇧🇪 Belgium',      score: '0-0', away: '🇹🇭 Thailand' },
      { home: '🇷🇺 Russia',       score: '6-1', away: '🇿🇦 South Africa' },
      { home: '🇧🇪 Belgium',      score: '–', away: '🇿🇦 South Africa' },
      { home: '🇷🇺 Russia',       score: '–', away: '🇹🇭 Thailand' },
      { home: '🇧🇪 Belgium',      score: '–', away: '🇷🇺 Russia' },
      { home: '🇿🇦 South Africa', score: '–', away: '🇹🇭 Thailand' },
    ],
    standings: [ { pos: 1, team: 'ru Russia',        played: 1, won: 1, draw: 0, lost: 0, gf: 6, ga: 1, gd: +5, pts: 3 },
  { pos: 2, team: 'be Belgium',       played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0, gd:  0, pts: 1 },
  { pos: 3, team: 'th Thailand',      played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0, gd:  0, pts: 1 },
  { pos: 4, team: 'za South Africa',  played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 6, gd: -5, pts: 0 },
],
  },

  'Group H': {
    title: 'Group H — WC Finals 2025',
    matches: [
      { home: '🇨🇴 Colombia', score: '6-2', away: '🇮🇱 Israel' },
      { home: '🇨🇦 Canada',   score: '1-2', away: '🇩🇿 Algeria' },
      { home: '🇨🇴 Colombia', score: '–', away: '🇩🇿 Algeria' },
      { home: '🇨🇦 Canada',   score: '–', away: '🇮🇱 Israel' },
      { home: '🇨🇴 Colombia', score: '–', away: '🇨🇦 Canada' },
      { home: '🇩🇿 Algeria',  score: '–', away: '🇮🇱 Israel' },
    ],
    standings: [  { pos: 1, team: 'co Colombia', played: 1, won: 1, draw: 0, lost: 0, gf: 6, ga: 2, gd: +4, pts: 3 },
  { pos: 2, team: 'dz Algeria',  played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1, gd: +1, pts: 3 },
  { pos: 3, team: 'ca Canada',   played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
  { pos: 4, team: 'il Israel',   played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 6, gd: -4, pts: 0 },
],
  },

  'Group I': {
    title: 'Group I — WC Finals 2025',
    matches: [
      { home: '🇫🇷 France',    score: '5-1', away: '🇨🇩 DR Congo' },
      { home: '🇦🇺 Australia', score: '3-1', away: '🇻🇪 Venezuela' },
      { home: '🇫🇷 France',    score: '–', away: '🇻🇪 Venezuela' },
      { home: '🇦🇺 Australia', score: '–', away: '🇨🇩 DR Congo' },
      { home: '🇫🇷 France',    score: '–', away: '🇦🇺 Australia' },
      { home: '🇻🇪 Venezuela', score: '–', away: '🇨🇩 DR Congo' },
    ],
    standings: [ { pos: 1, team: 'fr France',    played: 1, won: 1, draw: 0, lost: 0, gf: 5, ga: 1, gd: +4, pts: 3 },
  { pos: 2, team: 'au Australia', played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 1, gd: +2, pts: 3 },
  { pos: 3, team: 've Venezuela', played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },
  { pos: 4, team: 'cd DR Congo',  played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 5, gd: -4, pts: 0 },
],
  },

  'Group J': {
    title: 'Group J — WC Finals 2025',
    matches: [
      { home: '🇲🇽 Mexico',  score: '2-1', away: '🇦🇪 UAE' },
      { home: '🇸🇳 Senegal', score: '3-3', away: '🇷🇴 Romania' },
      { home: '🇲🇽 Mexico',  score: '–', away: '🇷🇴 Romania' },
      { home: '🇸🇳 Senegal', score: '–', away: '🇦🇪 UAE' },
      { home: '🇲🇽 Mexico',  score: '–', away: '🇸🇳 Senegal' },
      { home: '🇷🇴 Romania', score: '–', away: '🇦🇪 UAE' },
    ],
    standings: [ { pos: 1, team: 'mx Mexico',  played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1, gd: +1, pts: 3 },
  { pos: 2, team: 'sn Senegal', played: 1, won: 0, draw: 1, lost: 0, gf: 3, ga: 3, gd:  0, pts: 1 },
  { pos: 3, team: 'ro Romania', played: 1, won: 0, draw: 1, lost: 0, gf: 3, ga: 3, gd:  0, pts: 1 },
  { pos: 4, team: 'ae UAE',     played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
],
  },

  'Group K': {
    title: 'Group K — WC Finals 2025',
    matches: [
      { home: '🏴 England',     score: '1-1', away: '🇮🇩 Indonesia' },
      { home: '🇪🇬 Egypt',      score: '3-2', away: '🇨🇷 Costa Rica' },
      { home: '🏴 England',     score: '–', away: '🇨🇷 Costa Rica' },
      { home: '🇪🇬 Egypt',      score: '–', away: '🇮🇩 Indonesia' },
      { home: '🏴 England',     score: '–', away: '🇪🇬 Egypt' },
      { home: '🇨🇷 Costa Rica', score: '–', away: '🇮🇩 Indonesia' },
    ],
    standings: [  { pos: 1, team: 'eg Egypt',       played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2, gd: +1, pts: 3 },
  { pos: 2, team: 'gb England',     played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
  { pos: 3, team: 'id Indonesia',   played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
  { pos: 4, team: 'cr Costa Rica',  played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 0 },
],
  },

  'Group L': {
    title: 'Group L — WC Finals 2025',
    matches: [
      { home: '🇲🇦 Morocco',        score: '4-1', away: '🇨🇳 China' },
      { home: '🇪🇨 Ecuador',        score: '1-0', away: '🇨🇿 Czech Republic' },
      { home: '🇲🇦 Morocco',        score: '–', away: '🇨🇿 Czech Republic' },
      { home: '🇪🇨 Ecuador',        score: '–', away: '🇨🇳 China' },
      { home: '🇲🇦 Morocco',        score: '–', away: '🇪🇨 Ecuador' },
      { home: '🇨🇿 Czech Republic', score: '–', away: '🇨🇳 China' },
    ],
    standings: [],
  },
};

export default function WorldCupFinalsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <div className="btn-row">
        {/* Sends to app/page (home) */}
        <Link href="/" className="btn btn-outline">← Go to qualifiers</Link>

        {/* If you want to go to the Qualifiers page instead, use this: */}
        {/* <Link href="/worldcup2025" className="btn btn-outline">← Go to Qualifiers 2025</Link> */}
      </div>

      <h1>World Cup 2025 (Argentina)</h1>

      <div className="flex-container">
        {Object.entries(groupsData).map(([groupKey, group]) => {
          const rowsToShow =
            group.standings.length > 0 ? group.standings : deriveZeroRows(group.matches);

          // Show "Group A — Group Stage", "Group B — Group Stage", etc.
          const heading = `${groupKey} — Group Stage`;

          return (
            <div key={groupKey} className="group-block">
              <div className="matches-block">
                <div className="group-title">{heading}</div>

                {group.matches.length === 0 ? (
                  <p className="no-matches">Nenhum jogo cadastrado ainda</p>
                ) : (
                  <table className="match-table group-stage">
                    <thead>
                      <tr>
                        <th>HOME</th>
                        <th>SCORE</th>
                        <th>AWAY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.matches.map((m, i) => (
                        <tr key={i}>
                          <td>{m.home}</td>
                          <td>{m.score}</td>
                          <td>{m.away}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <StandingsTable groupName={heading} rows={rowsToShow} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StandingsTable({ groupName, rows }: { groupName: string; rows: Standing[] }) {
  return (
    <div className="standings">
      <h3>{groupName} Standings</h3>
      <table className="match-table group-stage standings-table">
        <thead>
          <tr>
            <th>Pos</th><th>Team</th><th>Pts</th>
            <th>Pld</th><th>W</th><th>D</th><th>L</th>
            <th>GF</th><th>GA</th><th>GD</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.team}>
              <td>{r.pos}</td>
              <td>{r.team}</td>
              <td>{r.pts}</td>
              <td>{r.played}</td>
              <td>{r.won}</td>
              <td>{r.draw}</td>
              <td>{r.lost}</td>
              <td>{r.gf}</td>
              <td>{r.ga}</td>
              <td>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
