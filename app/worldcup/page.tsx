'use client';

import React, { useState } from 'react';
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
  gd: number;
  pts: number;
};
type KMatch = { home: string; away: string; score?: string };

/** Gera linhas zeradas quando standings vier vazio */
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

/* ===================== GROUPS (SEU CONTEÚDO) ===================== */
const groupsData: Record<string, { title?: string; matches: Match[]; standings: Standing[] }> = {
  'Group A': {
    title: 'Group A — WC Finals 2025',
    matches: [
      { home: '🇦🇷 Argentina',   score: '3-1', away: '🇬🇭 Ghana' },
      { home: '🇨🇭 Switzerland', score: '2-3', away: '🇶🇦 Qatar' },
      { home: '🇦🇷 Argentina',   score: '2-3', away: '🇶🇦 Qatar' },
      { home: '🇨🇭 Switzerland', score: '1-0', away: '🇬🇭 Ghana' },
      { home: '🇦🇷 Argentina',   score: '3-0', away: '🇨🇭 Switzerland' },
      { home: '🇶🇦 Qatar',       score: '2-3', away: '🇬🇭 Ghana' },
    ],
    standings: [
      { pos: 1, team: 'ar Argentina',    played: 3, won: 2, draw: 0, lost: 1, gf: 8, ga: 4, gd: +4, pts: 6 },
      { pos: 2, team: 'qa Qatar',        played: 3, won: 2, draw: 0, lost: 1, gf: 8, ga: 7, gd: +1, pts: 6 },
      { pos: 3, team: 'gh Ghana',        played: 3, won: 1, draw: 0, lost: 2, gf: 4, ga: 6, gd: -2, pts: 3 },
      { pos: 4, team: 'ch Switzerland',  played: 3, won: 1, draw: 0, lost: 2, gf: 3, ga: 6, gd: -3, pts: 3 },
    ]
  },

  'Group B': {
    title: 'Group B — WC Finals 2025',
    matches: [
      { home: '🇩🇪 Germany', score: '3-0', away: '🇧🇴 Bolivia' },
      { home: '🏴 Wales',    score: '1-3', away: '🇨🇲 Cameroon' },
      { home: '🇩🇪 Germany', score: '1-1', away: '🇨🇲 Cameroon' },
      { home: '🏴 Wales',    score: '1-1', away: '🇧🇴 Bolivia' },
      { home: '🇩🇪 Germany', score: '2-0', away: '🏴 Wales' },
      { home: '🇨🇲 Cameroon',score: '1-0', away: '🇧🇴 Bolivia' },
    ],
    standings: [
      { pos: 1, team: 'de Germany',  played: 3, won: 2, draw: 1, lost: 0, gf: 6, ga: 1, gd: +5, pts: 7 },
      { pos: 2, team: 'cm Cameroon', played: 3, won: 2, draw: 1, lost: 0, gf: 5, ga: 2, gd: +3, pts: 7 },
      { pos: 3, team: '🏴 Wales',    played: 3, won: 0, draw: 1, lost: 2, gf: 2, ga: 6, gd: -4, pts: 1 },
      { pos: 4, team: 'bo Bolivia',  played: 3, won: 0, draw: 1, lost: 2, gf: 1, ga: 5, gd: -4, pts: 1 },
    ],
  },

  'Group C': {
    title: 'Group C — WC Finals 2025',
    matches: [
      { home: '🇺🇸 United States', score: '3-1', away: '🇳🇿 New Zealand' },
      { home: '🇺🇦 Ukraine',       score: '3-2', away: '🇨🇱 Chile' },
      { home: '🇺🇸 United States', score: '0-1', away: '🇨🇱 Chile' },
      { home: '🇺🇦 Ukraine',       score: '3-0', away: '🇳🇿 New Zealand' },
      { home: '🇺🇸 United States', score: '4-2', away: '🇺🇦 Ukraine' },
      { home: '🇨🇱 Chile',         score: '1-1', away: '🇳🇿 New Zealand' },
    ],
    standings: [
      { pos: 1, team: 'us United States', played: 3, won: 2, draw: 0, lost: 1, gf: 7, ga: 4, gd: +3, pts: 6 },
      { pos: 2, team: 'ua Ukraine',       played: 3, won: 2, draw: 0, lost: 1, gf: 8, ga: 6, gd: +2, pts: 6 },
      { pos: 3, team: 'cl Chile',         played: 3, won: 1, draw: 1, lost: 1, gf: 4, ga: 4, gd:  0, pts: 4 },
      { pos: 4, team: 'nz New Zealand',   played: 3, won: 0, draw: 1, lost: 2, gf: 2, ga: 7, gd: -5, pts: 1 },
    ],
  },

  'Group D': {
    title: 'Group D — WC Finals 2025',
    matches: [
      { home: '🇮🇹 Italy',   score: '3-2', away: '🇻🇳 Vietnam' },
      { home: '🇳🇴 Norway',  score: '2-0', away: '🇵🇪 Peru' },
      { home: '🇮🇹 Italy',   score: '1-0', away: '🇵🇪 Peru' },
      { home: '🇳🇴 Norway',  score: '2-1', away: '🇻🇳 Vietnam' },
      { home: '🇮🇹 Italy',   score: '3-2', away: '🇳🇴 Norway' },
      { home: '🇵🇪 Peru',    score: '1-0', away: '🇻🇳 Vietnam' },
    ],
    standings: [
      { pos: 1, team: 'it Italy',   played: 3, won: 3, draw: 0, lost: 0, gf: 7, ga: 4, gd: +3, pts: 9 },
      { pos: 2, team: 'no Norway',  played: 3, won: 2, draw: 0, lost: 1, gf: 6, ga: 4, gd: +2, pts: 6 },
      { pos: 3, team: 'pe Peru',    played: 3, won: 1, draw: 0, lost: 2, gf: 1, ga: 3, gd: -2, pts: 3 },
      { pos: 4, team: 'vn Vietnam', played: 3, won: 0, draw: 0, lost: 3, gf: 3, ga: 6, gd: -3, pts: 0 },
    ],
  },

  'Group E': {
    title: 'Group E — WC Finals 2025',
    matches: [
      { home: '🇪🇸 Spain',        score: '2-1', away: '🇮🇪 Ireland' },
      { home: '🇯🇵 Japan',        score: '4-3', away: '🇨🇮 Ivory Coast' },
      { home: '🇪🇸 Spain',        score: '1-0', away: '🇨🇮 Ivory Coast' },
      { home: '🇯🇵 Japan',        score: '1-2', away: '🇮🇪 Ireland' },
      { home: '🇪🇸 Spain',        score: '4-1', away: '🇯🇵 Japan' },
      { home: '🇨🇮 Ivory Coast',  score: '1-1', away: '🇮🇪 Ireland' },
    ],
    standings: [
      { pos: 1, team: 'es Spain',       played: 3, won: 3, draw: 0, lost: 0, gf: 7, ga: 2, gd: +5, pts: 9 },
      { pos: 2, team: 'ie Ireland',     played: 3, won: 1, draw: 1, lost: 1, gf: 4, ga: 4, gd:  0, pts: 4 },
      { pos: 3, team: 'jp Japan',       played: 3, won: 1, draw: 0, lost: 2, gf: 6, ga: 9, gd: -3, pts: 3 },
      { pos: 4, team: 'ci Ivory Coast', played: 3, won: 0, draw: 1, lost: 2, gf: 4, ga: 6, gd: -2, pts: 1 },
    ],
  },

  'Group F': {
    title: 'Group F — WC Finals 2025',
    matches: [
      { home: '🇺🇾 Uruguay',    score: '0-1', away: '🇬🇳 Guinea' },
      { home: '🇸🇪 Sweden',     score: '2-1', away: '🇺🇿 Uzbekistan' },
      { home: '🇺🇾 Uruguay',    score: '0-0', away: '🇺🇿 Uzbekistan' },
      { home: '🇸🇪 Sweden',     score: '2-0', away: '🇬🇳 Guinea' },
      { home: '🇺🇾 Uruguay',    score: '5-1', away: '🇸🇪 Sweden' },
      { home: '🇺🇿 Uzbekistan', score: '3-2', away: '🇬🇳 Guinea' },
    ],
    standings: [
      { pos: 1, team: 'se Sweden',     played: 3, won: 2, draw: 0, lost: 1, gf: 5, ga: 6, gd: -1, pts: 6 },
      { pos: 2, team: 'uy Uruguay',    played: 3, won: 1, draw: 1, lost: 1, gf: 5, ga: 2, gd: +3, pts: 4 },
      { pos: 3, team: 'uz Uzbekistan', played: 3, won: 1, draw: 1, lost: 1, gf: 4, ga: 4, gd:  0, pts: 4 },
      { pos: 4, team: 'gn Guinea',     played: 3, won: 1, draw: 0, lost: 2, gf: 3, ga: 5, gd: -2, pts: 3 },
    ],
  },

  'Group G': {
    title: 'Group G — WC Finals 2025',
    matches: [
      { home: '🇧🇪 Belgium',      score: '0-0', away: '🇹🇭 Thailand' },
      { home: '🇷🇺 Russia',       score: '6-1', away: '🇿🇦 South Africa' },
      { home: '🇧🇪 Belgium',      score: '3-0', away: '🇿🇦 South Africa' },
      { home: '🇷🇺 Russia',       score: '1-0', away: '🇹🇭 Thailand' },
      { home: '🇧🇪 Belgium',      score: '1-1', away: '🇷🇺 Russia' },
      { home: '🇿🇦 South Africa', score: '2-3', away: '🇹🇭 Thailand' },
    ],
    standings: [
      { pos: 1, team: 'ru Russia',       played: 3, won: 2, draw: 1, lost: 0, gf: 8, ga: 2,  gd: +6, pts: 7 },
      { pos: 2, team: 'be Belgium',      played: 3, won: 1, draw: 2, lost: 0, gf: 4, ga: 1,  gd: +3, pts: 5 },
      { pos: 3, team: 'th Thailand',     played: 3, won: 1, draw: 1, lost: 1, gf: 3, ga: 3,  gd:  0, pts: 4 },
      { pos: 4, team: 'za South Africa', played: 3, won: 0, draw: 0, lost: 3, gf: 3, ga: 12, gd: -9, pts: 0 },
    ],
  },

  'Group H': {
    title: 'Group H — WC Finals 2025',
    matches: [
      { home: '🇨🇴 Colombia', score: '6-2', away: '🇮🇱 Israel' },
      { home: '🇨🇦 Canada',   score: '1-2', away: '🇩🇿 Algeria' },
      { home: '🇨🇴 Colombia', score: '2-2', away: '🇩🇿 Algeria' },
      { home: '🇨🇦 Canada',   score: '2-2', away: '🇮🇱 Israel' },
      { home: '🇨🇴 Colombia', score: '0-2', away: '🇨🇦 Canada' },
      { home: '🇩🇿 Algeria',  score: '2-2', away: '🇮🇱 Israel' },
    ],
    standings: [
      { pos: 1, team: 'dz Algeria',  played: 3, won: 1, draw: 2, lost: 0, gf: 6, ga: 5,  gd: +1, pts: 5 },
      { pos: 2, team: 'co Colombia', played: 3, won: 1, draw: 1, lost: 1, gf: 8, ga: 6,  gd: +2, pts: 4 },
      { pos: 3, team: 'ca Canada',   played: 3, won: 1, draw: 1, lost: 1, gf: 5, ga: 4,  gd: +1, pts: 4 },
      { pos: 4, team: 'il Israel',   played: 3, won: 0, draw: 2, lost: 1, gf: 6, ga: 10, gd: -4, pts: 2 },
    ],
  },

  'Group I': {
    title: 'Group I — WC Finals 2025',
    matches: [
      { home: '🇫🇷 France',    score: '5-1', away: '🇨🇩 DR Congo' },
      { home: '🇦🇺 Australia', score: '3-1', away: '🇻🇪 Venezuela' },
      { home: '🇫🇷 France',    score: '4-1', away: '🇻🇪 Venezuela' },
      { home: '🇦🇺 Australia', score: '2-5', away: '🇨🇩 DR Congo' },
      { home: '🇫🇷 France',    score: '3-1', away: '🇦🇺 Australia' },
      { home: '🇻🇪 Venezuela', score: '3-3', away: '🇨🇩 DR Congo' },
    ],
    standings: [
      { pos: 1, team: 'fr France',     played: 3, won: 3, draw: 0, lost: 0, gf: 12, ga: 3,  gd: +9, pts: 9 },
      { pos: 2, team: 'cd DR Congo',   played: 3, won: 1, draw: 1, lost: 1, gf:  9, ga:10, gd: -1, pts: 4 },
      { pos: 3, team: 'au Australia',  played: 3, won: 1, draw: 0, lost: 2, gf:  6, ga: 9, gd: -3, pts: 3 },
      { pos: 4, team: 've Venezuela',  played: 3, won: 0, draw: 1, lost: 2, gf:  5, ga:10, gd: -5, pts: 1 },
    ],
  },

  'Group J': {
    title: 'Group J — WC Finals 2025',
    matches: [
      { home: '🇲🇽 Mexico',  score: '2-1', away: '🇦🇪 UAE' },
      { home: '🇸🇳 Senegal', score: '3-3', away: '🇷🇴 Romania' },
      { home: '🇲🇽 Mexico',  score: '3-3', away: '🇷🇴 Romania' },
      { home: '🇸🇳 Senegal', score: '3-0', away: '🇦🇪 UAE' },
      { home: '🇲🇽 Mexico',  score: '1-2', away: '🇸🇳 Senegal' },
      { home: '🇷🇴 Romania', score: '0-2', away: '🇦🇪 UAE' },
    ],
    standings: [
      { pos: 1, team: 'sn Senegal',  played: 3, won: 2, draw: 1, lost: 0, gf: 8, ga: 4, gd: +4, pts: 7 },
      { pos: 2, team: 'mx Mexico',   played: 3, won: 1, draw: 1, lost: 1, gf: 6, ga: 6, gd:  0, pts: 4 },
      { pos: 3, team: 'ae UAE',      played: 3, won: 1, draw: 0, lost: 2, gf: 3, ga: 5, gd: -2, pts: 3 },
      { pos: 4, team: 'ro Romania',  played: 3, won: 0, draw: 2, lost: 1, gf: 6, ga: 8, gd: -2, pts: 2 },
    ],
  },

  'Group K': {
    title: 'Group K — WC Finals 2025',
    matches: [
      { home: '🏴 England',     score: '1-1', away: '🇮🇩 Indonesia' },
      { home: '🇪🇬 Egypt',      score: '3-2', away: '🇨🇷 Costa Rica' },
      { home: '🏴 England',     score: '3-0', away: '🇨🇷 Costa Rica' },
      { home: '🇪🇬 Egypt',      score: '1-1', away: '🇮🇩 Indonesia' },
      { home: '🏴 England',     score: '1-1', away: '🇪🇬 Egypt' },
      { home: '🇨🇷 Costa Rica', score: '0-2', away: '🇮🇩 Indonesia' },
    ],
    standings: [
      { pos: 1, team: 'gb England',  played: 3, won: 1, draw: 2, lost: 0, gf: 5, ga: 2, gd: +3, pts: 5 },
      { pos: 2, team: 'id Indonesia', played: 3, won: 1, draw: 2, lost: 0, gf: 4, ga: 2, gd: +2, pts: 5 },
      { pos: 3, team: 'eg Egypt',    played: 3, won: 1, draw: 2, lost: 0, gf: 5, ga: 4, gd: +1, pts: 5 },
      { pos: 4, team: 'cr Costa Rica',played: 3, won: 0, draw: 0, lost: 3, gf: 2, ga: 8, gd: -6, pts: 0 },
    ],
  },

  'Group L': {
    title: 'Group L — WC Finals 2025',
    matches: [
      { home: '🇲🇦 Morocco',        score: '4-1', away: '🇨🇳 China' },
      { home: '🇪🇨 Ecuador',        score: '1-0', away: '🇨🇿 Czech Republic' },
      { home: '🇲🇦 Morocco',        score: '2-0', away: '🇨🇿 Czech Republic' },
      { home: '🇪🇨 Ecuador',        score: '1-2', away: '🇨🇳 China' },
      { home: '🇲🇦 Morocco',        score: '1-0', away: '🇪🇨 Ecuador' },
      { home: '🇨🇿 Czech Republic', score: '2-0', away: '🇨🇳 China' },
    ],
    standings: [
      { pos: 1, team: 'ma Morocco',       played: 3, won: 3, draw: 0, lost: 0, gf: 7, ga: 1, gd:  6, pts: 9 },
      { pos: 2, team: 'ec Ecuador',        played: 3, won: 1, draw: 0, lost: 2, gf: 2, ga: 3, gd: -1, pts: 3 },
      { pos: 3, team: 'cz Czech Republic', played: 3, won: 1, draw: 0, lost: 2, gf: 2, ga: 3, gd: -1, pts: 3 },
      { pos: 4, team: 'cn China',          played: 3, won: 1, draw: 0, lost: 2, gf: 3, ga: 7, gd: -4, pts: 3 },
    ],
  },
};
const knockoutData = {
  roundOf32: [
    { home: '🇦🇷 Argentina', away: '🇦🇪 UAE' },
    { home: '🇫🇷 France',    away: '🇻🇪 Venezuela' },
    { home: '🏴 England',    away: '🇨🇷 Costa Rica' },
    { home: '🇲🇦 Morocco',   away: '🇨🇳 China taipei' },
  ] as KMatch[],
  roundOf16: [] as KMatch[],
  quarterfinals: [] as KMatch[],
  semifinals: [] as KMatch[],
  final: [] as KMatch[],
};

export default function WorldCupFinalsPage() {
  const [tab, setTab] = useState<'group' | 'knockout'>('group');

  return (
    <div style={{ padding: '20px' }}>
      <div className="btn-row">
        <Link href="/" className="btn btn-outline">← Go to qualifiers</Link>
      </div>

      <h1>World Cup 2025 (Argentina)</h1>

      {/* use the segmented class to match the Qualifiers pills */}
      <nav className="segmented" role="tablist" aria-label="World Cup sections">
        <button
          type="button"
          className={`seg-btn ${tab === 'group' ? 'active' : ''}`}
          onClick={() => setTab('group')}
          role="tab"
          aria-selected={tab === 'group'}
        >
          Group Stage
        </button>
        <button
          type="button"
          className={`seg-btn ${tab === 'knockout' ? 'active' : ''}`}
          onClick={() => setTab('knockout')}
          role="tab"
          aria-selected={tab === 'knockout'}
        >
          Knockout Stage
        </button>
      </nav>

      {tab === 'group' ? <GroupStage /> : <KnockoutStage />}
    </div>
  );
}

/* ===== COMPONENTES ===== */
function GroupStage() {
  return (
    <div className="flex-container">
      {Object.entries(groupsData).map(([groupKey, group]) => {
        const rowsToShow =
          group.standings.length > 0 ? group.standings : deriveZeroRows(group.matches);

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
  );
}

function KnockoutStage() {
  return (
    <div className="flex-container">
      <KnockoutTable title="Round of 32 — Fixtures" matches={knockoutData.roundOf32} />
      {knockoutData.roundOf16.length > 0 && (
        <KnockoutTable title="Round of 16 — Fixtures" matches={knockoutData.roundOf16} />
      )}
      {knockoutData.quarterfinals.length > 0 && (
        <KnockoutTable title="Quarter-finals — Fixtures" matches={knockoutData.quarterfinals} />
      )}
      {knockoutData.semifinals.length > 0 && (
        <KnockoutTable title="Semi-finals — Fixtures" matches={knockoutData.semifinals} />
      )}
      {knockoutData.final.length > 0 && (
        <KnockoutTable title="Final" matches={knockoutData.final} />
      )}
    </div>
  );
}

function KnockoutTable({ title, matches }: { title: string; matches: KMatch[] }) {
  return (
    <section className="group-block">
      <div className="group-title">{title}</div>
      <table className="match-table knockout">
        <thead>
          <tr>
            <th>HOME</th>
            <th>SCORE</th>
            <th>AWAY</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>Sem partidas</td>
            </tr>
          ) : (
            matches.map((m, i) => (
              <tr key={i}>
                <td>{m.home}</td>
                <td>{m.score ?? '—'}</td>
                <td>{m.away}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
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