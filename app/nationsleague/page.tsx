// app/nationsleague/page.tsx
import React from "react";

/**
 * ✅ COMO ATUALIZAR
 * - Termine o jogo -> ache abaixo a rodada certa -> mude `score: ''` para `score: 'X-Y'` (ex: '2-1') e salve.
 * - Rodada 1 já está preenchida; as demais começam vazias.
 */

// ====== MODELO DOS JOGOS (no seu estilo) ====================================
type NLMatch = { home: string; score: string; away: string };

// ====== TABELA COMPLETA: 11 RODADAS ==========================================
const nlRounds: Record<number, NLMatch[]> = {
  1: [
    { home: 'AR Argentina', score: '0-2', away: 'MA Morocco' },
    { home: 'ES Spain',     score: '2-2', away: 'IT Italy' },
    { home: 'FR France',    score: '0-1', away: 'HR Croatia' },
    { home: 'GB England',   score: '0-1', away: 'DE Germany' },
    { home: 'BR Brazil',    score: '2-3', away: 'BE Belgium' },
    { home: 'PT Portugal',  score: '1-1', away: 'NL Netherlands' },
  ],

  2: [
    { home: 'MA Morocco',    score: '', away: 'ES Spain' },
    { home: 'IT Italy',      score: '', away: 'FR France' },
    { home: 'HR Croatia',    score: '', away: 'GB England' },
    { home: 'DE Germany',    score: '', away: 'BR Brazil' },
    { home: 'BE Belgium',    score: '', away: 'PT Portugal' },
    { home: 'NL Netherlands',score: '', away: 'AR Argentina' },
  ],

  3: [
    { home: 'AR Argentina', score: '', away: 'IT Italy' },
    { home: 'ES Spain',     score: '', away: 'HR Croatia' },
    { home: 'FR France',    score: '', away: 'DE Germany' },
    { home: 'GB England',   score: '', away: 'BE Belgium' },
    { home: 'BR Brazil',    score: '', away: 'NL Netherlands' },
    { home: 'PT Portugal',  score: '', away: 'MA Morocco' },
  ],

  4: [
    { home: 'HR Croatia',    score: '', away: 'AR Argentina' },
    { home: 'DE Germany',    score: '', away: 'ES Spain' },
    { home: 'BE Belgium',    score: '', away: 'FR France' },
    { home: 'NL Netherlands',score: '', away: 'GB England' },
    { home: 'MA Morocco',    score: '', away: 'BR Brazil' },
    { home: 'IT Italy',      score: '', away: 'PT Portugal' },
  ],

  5: [
    { home: 'AR Argentina', score: '', away: 'DE Germany' },
    { home: 'ES Spain',     score: '', away: 'BE Belgium' },
    { home: 'FR France',    score: '', away: 'NL Netherlands' },
    { home: 'GB England',   score: '', away: 'MA Morocco' },
    { home: 'BR Brazil',    score: '', away: 'IT Italy' },
    { home: 'PT Portugal',  score: '', away: 'HR Croatia' },
  ],

  6: [
    { home: 'BE Belgium',    score: '', away: 'AR Argentina' },
    { home: 'NL Netherlands',score: '', away: 'ES Spain' },
    { home: 'MA Morocco',    score: '', away: 'FR France' },
    { home: 'IT Italy',      score: '', away: 'GB England' },
    { home: 'HR Croatia',    score: '', away: 'BR Brazil' },
    { home: 'DE Germany',    score: '', away: 'PT Portugal' },
  ],

  7: [
    { home: 'AR Argentina', score: '', away: 'NL Netherlands' },
    { home: 'ES Spain',     score: '', away: 'MA Morocco' },
    { home: 'FR France',    score: '', away: 'IT Italy' },
    { home: 'GB England',   score: '', away: 'HR Croatia' },
    { home: 'BR Brazil',    score: '', away: 'DE Germany' },
    { home: 'PT Portugal',  score: '', away: 'BE Belgium' },
  ],

  8: [
    { home: 'AR Argentina',  score: '', away: 'ES Spain' }, // clássico R8
    { home: 'FR France',     score: '', away: 'PT Portugal' },
    { home: 'GB England',    score: '', away: 'BR Brazil' },
    { home: 'NL Netherlands',score: '', away: 'DE Germany' },
    { home: 'BE Belgium',    score: '', away: 'HR Croatia' },
    { home: 'MA Morocco',    score: '', away: 'IT Italy' },
  ],

  9: [
    { home: 'FR France',     score: '', away: 'AR Argentina' },
    { home: 'GB England',    score: '', away: 'ES Spain' },
    { home: 'BR Brazil',     score: '', away: 'PT Portugal' },
    { home: 'DE Germany',    score: '', away: 'MA Morocco' },
    { home: 'BE Belgium',    score: '', away: 'IT Italy' },
    { home: 'NL Netherlands',score: '', away: 'HR Croatia' },
  ],

  10: [
    { home: 'AR Argentina', score: '', away: 'GB England' },
    { home: 'ES Spain',     score: '', away: 'BR Brazil' },
    { home: 'FR France',    score: '', away: 'PT Portugal' },
    { home: 'HR Croatia',   score: '', away: 'DE Germany' },
    { home: 'IT Italy',     score: '', away: 'BE Belgium' },
    { home: 'MA Morocco',   score: '', away: 'NL Netherlands' },
  ],

  11: [
    { home: 'BR Brazil',     score: '', away: 'AR Argentina' },
    { home: 'PT Portugal',   score: '', away: 'ES Spain' },
    { home: 'FR France',     score: '', away: 'GB England' },
    { home: 'DE Germany',    score: '', away: 'IT Italy' },
    { home: 'BE Belgium',    score: '', away: 'MA Morocco' },
    { home: 'NL Netherlands',score: '', away: 'HR Croatia' },
  ],
};

// ====== PÁGINA ===============================================================
export default function NationsLeaguePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ fontWeight: 800, fontSize: 28 }}>NATIONS LEAGUE 2025</h1>
        <p style={{ opacity: 0.7 }}>eFootball 2026 | PS5</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 16 }}>
        {Object.entries(nlRounds).map(([roundKey, matches]) => {
          const round = Number(roundKey);
          return (
            <section key={round} style={{ background: "#111827", borderRadius: 16, padding: 12 }}>
              <h2 style={{ fontWeight: 700, margin: "4px 0 8px" }}>Rodada {round}</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {matches.map((m: NLMatch, i: number) => (
                  <li
                    key={`${round}-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#0b1220",
                      padding: "8px 10px",
                      borderRadius: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span>{m.home}</span>
                      <span style={{ opacity: 0.6 }}>vs</span>
                      <span>{m.away}</span>
                    </div>
                    <div style={{ fontWeight: 700 }}>
                      {m.score && m.score.trim() !== "" ? m.score : <span style={{ opacity: 0.6 }}>—</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <footer style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
        Dica: só edite o <code>score</code> acima (ex.: <code>'2-1'</code>) e salve.
      </footer>
    </main>
  );
}
