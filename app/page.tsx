/// app/worldcup2025/page.tsx
'use client';

import React, { useState } from 'react';
import './styles.css';

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

type Match = {
  home: string;
  score: string;
  away: string;
};

const regions = [
  'Europe',
  'South America',
  'Africa',
  'Asia',
  'N/C America',
] as const;
type Region = typeof regions[number];

/** ——— EUROPE DATA ——— **/
const groupMatchesEurope: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇪🇸 Spain', score: '1 – 1', away: '🇫🇮 Finland' },
    { home: '🏴 Wales',   score: '5 – 1', away: '🇷🇸 Serbia' },
    { home: '🇷🇸 Serbia', score: '',      away: '🇪🇸 Spain' },
    { home: '🇧🇦 Bosnia', score: '',      away: '🏴 Wales' },
    { home: '🇪🇸 Spain', score: '',      away: '🇧🇦 Bosnia' },
    { home: '🇫🇮 Finland', score: '',     away: '🇷🇸 Serbia' },
    { home: '🏴 Wales',   score: '',      away: '🇪🇸 Spain' },
    { home: '🇧🇦 Bosnia', score: '',      away: '🇫🇮 Finland' },
    { home: '🇫🇮 Finland', score: '',     away: '🏴 Wales' },
    { home: '🇷🇸 Serbia', score: '',      away: '🇧🇦 Bosnia' },
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇫🇷 France', score: '3 – 0', away: '🇬🇪 Georgia' },
    { home: '🇸🇪 Sweden', score: '2 – 0', away: '🇵🇱 Poland' },
    { home: '🇵🇱 Poland', score: '', away: '🇫🇷 France' },
    { home: '🇬🇧 N. Ireland', score: '', away: '🇸🇪 Sweden' },
    { home: '🇫🇷 France', score: '', away: '🇬🇧 N. Ireland' },
    { home: '🇬🇪 Georgia', score: '', away: '🇵🇱 Poland' },
    { home: '🇸🇪 Sweden', score: '', away: '🇫🇷 France' },
    { home: '🇬🇧 N. Ireland', score: '', away: '🇬🇪 Georgia' },
    { home: '🇬🇪 Georgia', score: '', away: '🇸🇪 Sweden' },
    { home: '🇵🇱 Poland', score: '', away: '🇬🇧 N. Ireland' },
  ],
  'Group C WC Qualifiers Argentina 2025': [
    { home: '🏴 England', score: '1 – 0', away: '🇲🇰 N. Macedonia' },
    { home: '🇹🇷 Turkey', score: '1 – 1', away: '🇷🇺 Russia' },
    { home: '🏴 England', score: '', away: '🇷🇺 Russia' },
    { home: '🇮🇸 Iceland', score: '', away: '🇹🇷 Turkey' },
    { home: '🇲🇰 N. Macedonia', score: '', away: '🇷🇺 Russia' },
    { home: '🏴 England', score: '', away: '🇮🇸 Iceland' },
    { home: '🇹🇷 Turkey', score: '', away: '🇲🇰 N. Macedonia' },
    { home: '🇮🇸 Iceland', score: '', away: '🇷🇺 Russia' },
    { home: '🇲🇰 N. Macedonia', score: '', away: '🇹🇷 Turkey' },
    { home: '🇷🇺 Russia', score: '', away: '🇮🇸 Iceland' },
  ],
  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇳🇱 Netherlands', score: '1 – 0', away: '🇦🇱 Albania' },
    { home: '🇺🇦 Ukraine', score: '2 – 1', away: '🇭🇺 Hungary' },
    { home: '🇭🇺 Hungary', score: '', away: '🇳🇱 Netherlands' },
    { home: '🇮🇱 Israel', score: '', away: '🇺🇦 Ukraine' },
    { home: '🇳🇱 Netherlands', score: '', away: '🇮🇱 Israel' },
    { home: '🇦🇱 Albania', score: '', away: '🇭🇺 Hungary' },
    { home: '🇺🇦 Ukraine', score: '', away: '🇳🇱 Netherlands' },
    { home: '🇮🇱 Israel', score: '', away: '🇦🇱 Albania' },
    { home: '🇦🇱 Albania', score: '', away: '🇺🇦 Ukraine' },
    { home: '🇭🇺 Hungary', score: '', away: '🇮🇱 Israel' },
  ],
  'Group E WC Qualifiers Argentina 2025': [
    { home: '🇵🇹 Portugal', score: '1 – 1', away: '🇮🇪 Ireland' },
    { home: '🇦🇹 Austria', score: '1 – 1', away: '🇳🇴 Norway' },
    { home: '🇳🇴 Norway', score: '', away: '🇵🇹 Portugal' },
    { home: '🇧🇬 Bulgaria', score: '', away: '🇦🇹 Austria' },
    { home: '🇵🇹 Portugal', score: '', away: '🇧🇬 Bulgaria' },
    { home: '🇮🇪 Ireland', score: '', away: '🇳🇴 Norway' },
    { home: '🇦🇹 Austria', score: '', away: '🇵🇹 Portugal' },
    { home: '🇧🇬 Bulgaria', score: '', away: '🇮🇪 Ireland' },
    { home: '🇮🇪 Ireland', score: '', away: '🇦🇹 Austria' },
    { home: '🇳🇴 Norway', score: '', away: '🇧🇬 Bulgaria' },
  ],
  'Group F WC Qualifiers Argentina 2025': [
    { home: '🇧🇪 Belgium', score: '4 – 0', away: '🇸🇮 Slovenia' },
    { home: '🇩🇰 Denmark', score: '0 – 0', away: '🇨🇿 Czech Rep.' },
    { home: '🇨🇿 Czech Rep.', score: '', away: '🇧🇪 Belgium' },
    { home: '🇰🇿 Kazakhstan', score: '', away: '🇩🇰 Denmark' },
    { home: '🇧🇪 Belgium', score: '', away: '🇰🇿 Kazakhstan' },
    { home: '🇸🇮 Slovenia', score: '', away: '🇨🇿 Czech Rep.' },
    { home: '🇩🇰 Denmark', score: '', away: '🇧🇪 Belgium' },
    { home: '🇰🇿 Kazakhstan', score: '', away: '🇸🇮 Slovenia' },
    { home: '🇸🇮 Slovenia', score: '', away: '🇩🇰 Denmark' },
    { home: '🇨🇿 Czech Rep.', score: '', away: '🇰🇿 Kazakhstan' },
  ],
  'Group G WC Qualifiers Argentina 2025': [
    { home: '🇮🇹 Italy', score: '3 – 2', away: '🇸🇰 Slovakia' },
    { home: '🇨🇭 Switzerland', score: '0 – 0', away: '🇬🇷 Greece' },
    { home: '🇬🇷 Greece', score: '', away: '🇮🇹 Italy' },
    { home: '🇦🇿 Azerbaijan', score: '', away: '🇨🇭 Switzerland' },
    { home: '🇮🇹 Italy', score: '', away: '🇸🇰 Slovakia' },
    { home: '🇨🇭 Switzerland', score: '', away: '🇦🇿 Azerbaijan' },
    { home: '🇬🇷 Greece', score: '', away: '🇮🇹 Italy' },
    { home: '🇸🇰 Slovakia', score: '', away: '🇨🇭 Switzerland' },
    { home: '🇦🇿 Azerbaijan', score: '', away: '🇬🇷 Greece' },
    { home: '🇮🇹 Italy', score: '', away: '🇨🇭 Switzerland' },
  ],
  'Group H WC Qualifiers Argentina 2025': [
    { home: '🇩🇪 Germany', score: '1 – 2', away: '🇷🇴 Romania' },
    { home: '🇭🇷 Croatia', score: '2 – 0', away: '🏴 Scotland' },
    { home: '🏴 Scotland', score: '', away: '🇩🇪 Germany' },
    { home: '🇨🇾 Cyprus', score: '', away: '🇭🇷 Croatia' },
    { home: '🇩🇪 Germany', score: '', away: '🇨🇾 Cyprus' },
    { home: '🇷🇴 Romania', score: '', away: '🏴 Scotland' },
    { home: '🇭🇷 Croatia', score: '', away: '🇩🇪 Germany' },
    { home: '🇨🇾 Cyprus', score: '', away: '🇷🇴 Romania' },
    { home: '🇷🇴 Romania', score: '', away: '🇭🇷 Croatia' },
    { home: '🏴 Scotland', score: '', away: '🇨🇾 Cyprus' },
  ],

  'Group A WC Qualifiers Turkey 2024': [
    { home: '🇫🇷 France',         score: '4 – 2', away: '🇲🇰 N. Macedonia' },
    { home: '🏴 Wales',           score: '2 – 0', away: '🇭🇺 Hungary'        },
    { home: '🇭🇺 Hungary',        score: '2 – 0', away: '🇫🇷 France'        },
    { home: '🇲🇪 Montenegro',     score: '4 – 1', away: '🏴 Wales'          },
    { home: '🇫🇷 France',         score: '2 – 1', away: '🇲🇪 Montenegro'     },
    { home: '🇲🇰 N. Macedonia',   score: '1 – 1', away: '🇭🇺 Hungary'        },
    { home: '🏴 Wales',           score: '2 – 2', away: '🇫🇷 France'        },
    { home: '🇲🇪 Montenegro',     score: '2 – 1', away: '🇲🇰 N. Macedonia'   },
    { home: '🇲🇰 N. Macedonia',   score: '1 – 0', away: '🏴 Wales'          },
    { home: '🇭🇺 Hungary',        score: '0 – 0', away: '🇲🇪 Montenegro'     },
  ],

  'Group B WC Qualifiers Turkey 2024': [
    { home: '🇪🇸 Spain',         score: '1 – 1', away: '🇮🇸 Iceland'      },
    { home: '🇸🇪 Sweden',        score: '0 – 0', away: '🇷🇸 Serbia'       },
    { home: '🇷🇸 Serbia',        score: '1 – 1', away: '🇪🇸 Spain'        },
    { home: '🇳🇮 N. Ireland',    score: '1 – 2', away: '🇸🇪 Sweden'       },
    { home: '🇪🇸 Spain',         score: '2 – 0', away: '🇳🇮 N. Ireland'   },
    { home: '🇮🇸 Iceland',       score: '0 – 2', away: '🇷🇸 Serbia'       },
    { home: '🇸🇪 Sweden',        score: '0 – 1', away: '🇪🇸 Spain'        },
    { home: '🇳🇮 N. Ireland',    score: '2 – 0', away: '🇮🇸 Iceland'      },
    { home: '🇮🇸 Iceland',       score: '0 – 0', away: '🇸🇪 Sweden'       },
    { home: '🇷🇸 Serbia',        score: '1 – 2', away: '🇳🇮 N. Ireland'   },
  ],

  'Group C WC Qualifiers Turkey 2024': [
    { home: '🏴 England',        score: '1 – 0', away: '🇬🇪 Georgia'      },
    { home: '🇵🇱 Poland',        score: '1 – 2', away: '🇷🇺 Russia'       },
    { home: '🇷🇺 Russia',        score: '2 – 3', away: '🏴 England'      },
    { home: '🏴 England',        score: '0 – 1', away: '🇮🇱 Israel'       },
    { home: '🇬🇪 Georgia',       score: '2 – 0', away: '🇷🇺 Russia'       },
    { home: '🇵🇱 Poland',        score: '1 – 3', away: '🏴 England'      },
    { home: '🇮🇱 Israel',        score: '1 – 0', away: '🇬🇪 Georgia'      },
    { home: '🇬🇪 Georgia',       score: '4 – 1', away: '🇵🇱 Poland'       },
    { home: '🇷🇺 Russia',        score: '1 – 4', away: '🇮🇱 Israel'       },
    { home: '🇮🇱 Israel',        score: '',      away: '🇵🇱 Poland'       }, 
  ],

  'Group D WC Qualifiers Turkey 2024': [
    { home: '🇧🇪 Belgium',       score: '2 – 0', away: '🇦🇱 Albania'     },
    { home: '🇺🇦 Ukraine',       score: '1 – 2', away: '🇸🇰 Slovakia'    },
    { home: '🇸🇰 Slovakia',      score: '0 – 1', away: '🇧🇪 Belgium'     },
    { home: '🇧🇬 Bulgaria',      score: '2 – 2', away: '🇺🇦 Ukraine'     },
    { home: '🇧🇪 Belgium',       score: '3 – 1', away: '🇧🇬 Bulgaria'    },
    { home: '🇦🇱 Albania',       score: '1 – 2', away: '🇸🇰 Slovakia'    },
    { home: '🇺🇦 Ukraine',       score: '1 – 1', away: '🇧🇪 Belgium'     },
    { home: '🇧🇬 Bulgaria',      score: '0 – 1', away: '🇦🇱 Albania'     },
    { home: '🇸🇰 Slovakia',      score: '1 – 2', away: '🇧🇬 Bulgaria'    },
    { home: '🇦🇱 Albania',       score: '',      away: '🇺🇦 Ukraine'     }, // preencha quando souber
  ],

  'Group E WC Qualifiers Turkey 2024': [
    { home: '🇳🇱 Netherlands',   score: '3 – 1', away: '🇫🇮 Finland'     },
    { home: '🇦🇹 Austria',       score: '1 – 1', away: '🇷🇴 Romania'     },
    { home: '🇷🇴 Romania',       score: '0 – 0', away: '🇳🇱 Netherlands' },
    { home: '🇰🇿 Kazakhstan',    score: '2 – 2', away: '🇦🇹 Austria'      },
    { home: '🇳🇱 Netherlands',   score: '0 – 0', away: '🇰🇿 Kazakhstan'  },
    { home: '🇫🇮 Finland',       score: '2 – 1', away: '🇷🇴 Romania'     },
    { home: '🇦🇹 Austria',       score: '1 – 1', away: '🇳🇱 Netherlands' },
    { home: '🇰🇿 Kazakhstan',    score: '0 – 3', away: '🇫🇮 Finland'     },
    { home: '🇫🇮 Finland',       score: '2 – 1', away: '🇦🇹 Austria'      },
    { home: '🇷🇴 Romania',       score: '2 – 0', away: '🇰🇿 Kazakhstan'  },
  ],

  'Group F WC Qualifiers Turkey 2024': [
    { home: '🇵🇹 Portugal',      score: '1 – 3', away: '🇮🇪 Ireland'     },
    { home: '🇩🇰 Denmark',       score: '2 – 2', away: '🇨🇿 Czech Rep.'  },
    { home: '🇨🇿 Czech Rep.',    score: '0 – 1', away: '🇵🇹 Portugal'    },
    { home: '🇦🇿 Azerbaijan',    score: '3 – 1', away: '🇩🇰 Denmark'     },
    { home: '🇵🇹 Portugal',      score: '2 – 1', away: '🇦🇿 Azerbaijan'  },
    { home: '🇮🇪 Ireland',       score: '0 – 0', away: '🇨🇿 Czech Rep.'  },
    { home: '🇩🇰 Denmark',       score: '0 – 0', away: '🇵🇹 Portugal'    },
    { home: '🇦🇿 Azerbaijan',    score: '1 – 0', away: '🇮🇪 Ireland'     },
    { home: '🇮🇪 Ireland',       score: '0 – 0', away: '🇩🇰 Denmark'     },
    { home: '🇨🇿 Czech Rep.',    score: '1 – 0', away: '🇦🇿 Azerbaijan'  },
  ],

  'Group G WC Qualifiers Turkey 2024': [
    { home: '🇮🇹 Italy',         score: '2 – 1', away: '🇬🇷 Greece'      },
    { home: '🇨🇭 Switzerland',   score: '0 – 1', away: '🏴 Scotland'     },
    { home: '🏴 Scotland',       score: '0 – 2', away: '🇮🇹 Italy'        },
    { home: '🇨🇾 Cyprus',        score: '1 – 0', away: '🇨🇭 Switzerland' },
    { home: '🇮🇹 Italy',         score: '0 – 0', away: '🇨🇾 Cyprus'       },
    { home: '🇬🇷 Greece',        score: '0 – 0', away: '🏴 Scotland'     },
    { home: '🇨🇭 Switzerland',   score: '0 – 0', away: '🇮🇹 Italy'        },
    { home: '🇨🇾 Cyprus',        score: '0 – 0', away: '🇬🇷 Greece'      },
    { home: '🇬🇷 Greece',        score: '2 – 0', away: '🇨🇭 Switzerland' },
    { home: '🏴 Scotland',       score: '0 – 0', away: '🇨🇾 Cyprus'       },
  ],

  'Group H WC Qualifiers Turkey 2024': [
    { home: '🇭🇷 Croatia',       score: '1 – 1', away: '🇸🇮 Slovenia'    },
    { home: '🇩🇪 Germany',       score: '3 – 2', away: '🇳🇴 Norway'       },
    { home: '🇳🇴 Norway',        score: '0 – 1', away: '🇭🇷 Croatia'     },
    { home: '🇲🇹 Malta',         score: '0 – 0', away: '🇩🇪 Germany'     },
    { home: '🇭🇷 Croatia',       score: '1 – 2', away: '🇲🇹 Malta'        },
    { home: '🇸🇮 Slovenia',      score: '0 – 3', away: '🇳🇴 Norway'       },
    { home: '🇩🇪 Germany',       score: '1 – 0', away: '🇭🇷 Croatia'     },
    { home: '🇲🇹 Malta',         score: '3 – 1', away: '🇸🇮 Slovenia'    },
    { home: '🇸🇮 Slovenia',      score: '2 – 1', away: '🇩🇪 Germany'     },
    { home: '🇳🇴 Norway',        score: '2 – 0', away: '🇲🇹 Malta'        },
  ],
};


const groupStandingsEurope: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Wales',   played: 1, won: 1, draw: 0, lost: 0, gf: 5,  ga: 1,  gd:  4, pts: 3 },
    { pos: 2, team: 'Spain',   played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 3, team: 'Finland', played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 4, team: 'Serbia',  played: 1, won: 0, draw: 0, lost: 1, gf: 1,  ga: 5,  gd: -4, pts: 0 },
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'France',  played: 1, won: 1, draw: 0, lost: 0, gf: 3,  ga: 0,  gd:  3, pts: 3 },
    { pos: 2, team: 'Sweden',  played: 1, won: 1, draw: 0, lost: 0, gf: 2,  ga: 0,  gd:  2, pts: 3 },
    { pos: 3, team: 'Poland',  played: 1, won: 0, draw: 0, lost: 1, gf: 0,  ga: 2,  gd: -2, pts: 0 },
    { pos: 4, team: 'Georgia', played: 1, won: 0, draw: 0, lost: 1, gf: 0,  ga: 3,  gd: -3, pts: 0 },
  ],
  'Group C WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'England',      played: 1, won: 1, draw: 0, lost: 0, gf: 1,  ga: 0,  gd:  1, pts: 3 },
    { pos: 2, team: 'Turkey',       played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 3, team: 'Russia',       played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 4, team: 'N. Macedonia', played: 1, won: 0, draw: 0, lost: 1, gf: 0,  ga: 1,  gd: -1, pts: 0 },
    { pos: 5, team: 'Iceland',      played: 0, won: 0, draw: 0, lost: 0, gf: 0,  ga: 0,  gd:  0, pts: 0 },
  ],
  'Group D WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Ukraine',     played: 1, won: 1, draw: 0, lost: 0, gf: 2,  ga: 1,  gd:  1, pts: 3 },
    { pos: 2, team: 'Netherlands', played: 1, won: 1, draw: 0, lost: 0, gf: 1,  ga: 0,  gd:  1, pts: 3 },
    { pos: 3, team: 'Hungary',     played: 1, won: 0, draw: 0, lost: 1, gf: 1,  ga: 2,  gd: -1, pts: 0 },
    { pos: 4, team: 'Albania',     played: 1, won: 0, draw: 0, lost: 1, gf: 0,  ga: 1,  gd: -1, pts: 0 },
  ],
  'Group E WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Portugal', played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 2, team: 'Austria',  played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 3, team: 'Ireland',  played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
    { pos: 4, team: 'Norway',   played: 1, won: 0, draw: 1, lost: 0, gf: 1,  ga: 1,  gd:  0, pts: 1 },
  ],
  'Group F WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Belgium',    played: 1, won: 1, draw: 0, lost: 0, gf: 4, ga: 0,  gd:  4, pts: 3 },
    { pos: 2, team: 'Denmark',    played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 3, team: 'Czech Rep.', played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 4, team: 'Slovenia',   played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 4,  gd: -4, pts: 0 },
  ],
  'Group G WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Italy',       played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2,  gd:  1, pts: 3 },
    { pos: 2, team: 'Switzerland', played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 3, team: 'Greece',      played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 4, team: 'Slovakia',    played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3,  gd: -1, pts: 0 },
  ],
  'Group H WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Croatia',  played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 0,  gd:  2, pts: 3 },
    { pos: 2, team: 'Romania',  played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1,  gd:  1, pts: 3 },
    { pos: 3, team: 'Germany',  played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2,  gd: -1, pts: 0 },
    { pos: 4, team: 'Scotland', played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2,  gd: -2, pts: 0 },
  ],
  'Group A WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'France',          played: 4, won: 2, draw: 1, lost: 1, gf:  8, ga: 5, gd:  3, pts:  7 },
    { pos: 2, team: 'Montenegro',      played: 4, won: 2, draw: 1, lost: 1, gf:  7, ga: 4, gd:  3, pts:  7 },
    { pos: 3, team: 'Hungary',         played: 4, won: 1, draw: 2, lost: 1, gf:  3, ga: 3, gd:  0, pts:  5 },
    { pos: 4, team: 'N. Macedonia',    played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga: 7, gd: -2, pts:  4 },
    { pos: 5, team: 'Wales',           played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga: 7, gd: -2, pts:  4 },
  ],
};

/** ——— PLACEHOLDERS PARA AS OUTRAS CONFEDERAÇÕES ——— **/
const groupMatchesSouthAmerica: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇦🇷 Argentina', score: '2 - 0', away: '🇵🇾 Paraguay' },
    { home: '🇨🇴 Colombia',  score: '2 - 3', away: '🇪🇨 Ecuador' },
    { home: '🇪🇨 Ecuador',   score: '', away: '🇦🇷 Argentina' },
    { home: '🇨🇱 Chile',     score: '', away: '🇨🇴 Colombia' },
    { home: '🇦🇷 Argentina', score: '', away: '🇨🇱 Chile' },
    { home: '🇵🇾 Paraguay',  score: '', away: '🇪🇨 Ecuador' },
    { home: '🇨🇴 Colombia',  score: '', away: '🇦🇷 Argentina' },
    { home: '🇨🇱 Chile',     score: '', away: '🇵🇾 Paraguay' },
    { home: '🇵🇾 Paraguay',  score: '', away: '🇨🇴 Colombia' },
    { home: '🇪🇨 Ecuador',   score: '', away: '🇨🇱 Chile' },
  ],

  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇧🇷 Brazil',    score: '1 - 1', away: '🇻🇪 Venezuela' },
    { home: '🇺🇾 Uruguay',   score: '3 - 0', away: '🇵🇪 Peru' },
    { home: '🇵🇪 Peru',      score: '', away: '🇧🇷 Brazil' },
    { home: '🇧🇴 Bolivia',   score: '', away: '🇺🇾 Uruguay' },
    { home: '🇧🇷 Brazil',    score: '', away: '🇧🇴 Bolivia' },
    { home: '🇻🇪 Venezuela', score: '', away: '🇵🇪 Peru' },
    { home: '🇺🇾 Uruguay',   score: '', away: '🇧🇷 Brazil' },
    { home: '🇧🇴 Bolivia',   score: '', away: '🇻🇪 Venezuela' },
    { home: '🇻🇪 Venezuela', score: '', away: '🇺🇾 Uruguay' },
    { home: '🇵🇪 Peru',      score: '', away: '🇧🇴 Bolivia' },
  ],
};
const groupStandingsSouthAmerica: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Argentina', played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 0, gd: 2, pts: 3 },
    { pos: 2, team: 'Ecuador',   played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2, gd: 1, pts: 3 },
    { pos: 3, team: 'Chile',     played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: 'Colombia',  played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd:-1, pts: 0 },
    { pos: 5, team: 'Paraguay',  played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2, gd:-2, pts: 0 }
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Uruguay',   played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 0, gd: 3, pts: 3 },
    { pos: 2, team: 'Brazil',    played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 3, team: 'Venezuela', played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 4, team: 'Bolivia',   played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 5, team: 'Peru',      played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 3, gd:-3, pts: 0 }
  ]
};

const groupMatchesAfrica: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇲🇦 Morocco',      score: '1 - 0', away: '🇿🇲 Zambia'     },
    { home: '🇨🇲 Cameroon',     score: '0 - 0', away: '🇲🇱 Mali'       },
    { home: '🇲🇱 Mali',         score: '', away: '🇲🇦 Morocco'    },
    { home: '🇰🇪 Kenya',        score: '', away: '🇨🇲 Cameroon'   },
    { home: '🇲🇦 Morocco',      score: '', away: '🇰🇪 Kenya'      },
    { home: '🇿🇲 Zambia',       score: '', away: '🇲🇱 Mali'       },
    { home: '🇨🇲 Cameroon',     score: '', away: '🇲🇦 Morocco'    },
    { home: '🇰🇪 Kenya',        score: '', away: '🇿🇲 Zambia'     },
    { home: '🇿🇲 Zambia',       score: '', away: '🇨🇲 Cameroon'   },
    { home: '🇲🇱 Mali',         score: '', away: '🇰🇪 Kenya'      },
  ],

  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇸🇳 Senegal',      score: '3 - 2', away: '🇬🇳 Guinea'       },
    { home: '🇹🇳 Tunisia',      score: '1 - 3', away: '🇿🇦 South Africa' },
    { home: '🇿🇦 South Africa', score: '', away: '🇸🇳 Senegal'     },
    { home: '🇿🇼 Zimbabwe',     score: '', away: '🇹🇳 Tunisia'     },
    { home: '🇸🇳 Senegal',      score: '', away: '🇿🇼 Zimbabwe'    },
    { home: '🇬🇳 Guinea',       score: '', away: '🇿🇦 South Africa' },
    { home: '🇹🇳 Tunisia',      score: '', away: '🇸🇳 Senegal'     },
    { home: '🇿🇼 Zimbabwe',     score: '', away: '🇬🇳 Guinea'       },
    { home: '🇬🇳 Guinea',       score: '', away: '🇹🇳 Tunisia'     },
    { home: '🇿🇦 South Africa', score: '', away: '🇿🇼 Zimbabwe'    },
  ],

  'Group C WC Qualifiers Argentina 2025': [
    { home: '🇪🇬 Egypt',        score: '1 - 1', away: '🇬🇦 Gabon'      },
    { home: '🇳🇬 Nigeria',      score: '0 - 3', away: '🇨🇩 Congo DR'  },
    { home: '🇨🇩 Congo DR',     score: '', away: '🇳🇬 Nigeria'   },
    { home: '🇧🇼 Botswana',     score: '', away: '🇪🇬 Egypt'      },
    { home: '🇪🇬 Egypt',        score: '', away: '🇧🇼 Botswana'   },
    { home: '🇬🇦 Gabon',        score: '', away: '🇨🇩 Congo DR'  },
    { home: '🇳🇬 Nigeria',      score: '', away: '🇪🇬 Egypt'      },
    { home: '🇧🇼 Botswana',     score: '', away: '🇬🇦 Gabon'      },
    { home: '🇬🇦 Gabon',        score: '', away: '🇳🇬 Nigeria'   },
    { home: '🇨🇩 Congo DR',     score: '', away: '🇧🇼 Botswana'   },
  ],

  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇩🇿 Algeria',      score: '3 - 5', away: '🇬🇭 Ghana'       },
    { home: '🇨🇮 Ivory Coast',   score: '0 - 0', away: '🇧🇫 Burkina Faso'},
    { home: '🇧🇫 Burkina Faso', score: '', away: '🇩🇿 Algeria'    },
    { home: '🇸🇴 Somalia',      score: '', away: '🇨🇮 Ivory Coast'},
    { home: '🇩🇿 Algeria',      score: '', away: '🇸🇴 Somalia'    },
    { home: '🇬🇭 Ghana',        score: '', away: '🇧🇫 Burkina Faso'},
    { home: '🇨🇮 Ivory Coast',   score: '', away: '🇩🇿 Algeria'    },
    { home: '🇸🇴 Somalia',      score: '', away: '🇬🇭 Ghana'      },
    { home: '🇬🇭 Ghana',        score: '', away: '🇨🇮 Ivory Coast'},
    { home: '🇧🇫 Burkina Faso', score: '', away: '🇸🇴 Somalia'    },
  ],
};

const groupStandingsAfrica: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Morocco',  played: 1, won: 1, draw: 0, lost: 0, gf: 1,  ga: 0,  gd:  1, pts: 3 },
    { pos: 2, team: 'Cameroon', played: 1, won: 0, draw: 1, lost: 0, gf: 0,  ga: 0,  gd:  0, pts: 1 },
    { pos: 3, team: 'Mali',     played: 1, won: 0, draw: 1, lost: 0, gf: 0,  ga: 0,  gd:  0, pts: 1 },
    { pos: 4, team: 'Zambia',   played: 1, won: 0, draw: 0, lost: 1, gf: 0,  ga: 1,  gd: -1, pts: 0 },
    { pos: 5, team: 'Kenya',    played: 0, won: 0, draw: 0, lost: 0, gf: 0,  ga: 0,  gd:  0, pts: 0 },
  ],

  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'South Africa', played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 1,  gd:  2, pts: 3 },
    { pos: 2, team: 'Senegal',      played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 2,  gd:  1, pts: 3 },
    { pos: 3, team: 'Guinea',       played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3,  gd: -1, pts: 0 },
    { pos: 4, team: 'Tunisia',      played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3,  gd: -2, pts: 0 },
    { pos: 5, team: 'Zimbabwe',     played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 0 },
  ],

  'Group C WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Congo DR', played: 1, won: 1, draw: 0, lost: 0, gf: 3, ga: 0,  gd:  3, pts: 3 },
    { pos: 2, team: 'Egypt',    played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1,  gd:  0, pts: 1 },
    { pos: 3, team: 'Gabon',    played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1,  gd:  0, pts: 1 },
    { pos: 4, team: 'Nigeria',  played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 3,  gd: -3, pts: 0 },
    { pos: 5, team: 'Botswana', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 0 },
  ],

  'Group D WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Ghana',          played: 1, won: 1, draw: 0, lost: 0, gf: 5, ga: 3,  gd:  2, pts: 3 },
    { pos: 2, team: 'Burkina Faso',   played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 3, team: 'Ivory Coast',    played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 1 },
    { pos: 4, team: 'Algeria',        played: 1, won: 0, draw: 0, lost: 1, gf: 3, ga: 5,  gd: -2, pts: 0 },
    { pos: 5, team: 'Somalia',        played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0,  gd:  0, pts: 0 },
  ],
};

// Asia Qualifiers
const groupMatchesAsia: Record<string, Match[]> = {
  // Group A
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇯🇵 Japan',        score: '1 - 0', away: '🇰🇼 Kuwait'       },
    { home: '🇧🇭 Bahrain',      score: '0 - 0', away: '🇳🇿 New Zealand'  },
    { home: '🇳🇿 New Zealand',  score: '', away: '🇯🇵 Japan'        },
    { home: '🇵🇭 Philippines',  score: '', away: '🇧🇭 Bahrain'      },
    { home: '🇯🇵 Japan',        score: '', away: '🇵🇭 Philippines'  },
    { home: '🇰🇼 Kuwait',       score: '', away: '🇳🇿 New Zealand'  },
    { home: '🇧🇭 Bahrain',      score: '', away: '🇯🇵 Japan'        },
    { home: '🇵🇭 Philippines',  score: '', away: '🇰🇼 Kuwait'       },
    { home: '🇰🇼 Kuwait',       score: '', away: '🇧🇭 Bahrain'      },
    { home: '🇳🇿 New Zealand',  score: '', away: '🇵🇭 Philippines'  },
  ],

  // Group B
  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇮🇷 Iran',         score: '', away: '🇲🇾 Malaysia'    },
    { home: '🇴🇲 Oman',         score: '', away: '🇨🇳 China'       },
    { home: '🇨🇳 China',        score: '', away: '🇮🇷 Iran'         },
    { home: '🇭🇰 Hong Kong',    score: '', away: '🇴🇲 Oman'        },
    { home: '🇮🇷 Iran',         score: '', away: '🇭🇰 Hong Kong'  },
    { home: '🇲🇾 Malaysia',     score: '', away: '🇨🇳 China'       },
    { home: '🇴🇲 Oman',         score: '', away: '🇮🇷 Iran'         },
    { home: '🇭🇰 Hong Kong',    score: '', away: '🇲🇾 Malaysia'    },
    { home: '🇲🇾 Malaysia',     score: '', away: '🇴🇲 Oman'        },
    { home: '🇨🇳 China',        score: '', away: '🇭🇰 Hong Kong'  },
  ],

  // Group C
  'Group C WC Qualifiers Argentina 2025': [
    { home: '🇰🇷 South Korea',  score: '', away: '🇮🇳 India'       },
    { home: '🇦🇪 UAE',          score: '', away: '🇹🇭 Thailand'    },
    { home: '🇹🇭 Thailand',     score: '', away: '🇰🇷 South Korea'},
    { home: '🇸🇬 Singapore',    score: '', away: '🇦🇪 UAE'         },
    { home: '🇰🇷 South Korea',  score: '', away: '🇸🇬 Singapore'  },
    { home: '🇮🇳 India',        score: '', away: '🇹🇭 Thailand'    },
    { home: '🇦🇪 UAE',          score: '', away: '🇰🇷 South Korea'},
    { home: '🇸🇬 Singapore',    score: '', away: '🇮🇳 India'       },
    { home: '🇮🇳 India',        score: '', away: '🇦🇪 UAE'         },
    { home: '🇹🇭 Thailand',     score: '', away: '🇸🇬 Singapore'  },
  ],

  // Group D
  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇦🇺 Australia',    score: '', away: '🇮🇩 Indonesia'  },
    { home: '🇯🇴 Jordan',       score: '', away: '🇵🇸 Palestine'   },
    { home: '🇵🇸 Palestine',    score: '', away: '🇦🇺 Australia'  },
    { home: '🇲🇲 Myanmar',      score: '', away: '🇯🇴 Jordan'      },
    { home: '🇦🇺 Australia',    score: '', away: '🇲🇲 Myanmar'     },
    { home: '🇮🇩 Indonesia',    score: '', away: '🇵🇸 Palestine'   },
    { home: '🇯🇴 Jordan',       score: '', away: '🇦🇺 Australia'  },
    { home: '🇲🇲 Myanmar',      score: '', away: '🇮🇩 Indonesia'  },
    { home: '🇮🇩 Indonesia',    score: '', away: '🇯🇴 Jordan'      },
    { home: '🇵🇸 Palestine',    score: '', away: '🇲🇲 Myanmar'     },
  ],

  // Group E
  'Group E WC Qualifiers Argentina 2025': [
    { home: '🇶🇦 Qatar',        score: '', away: '🇰🇵 North Korea'},
    { home: '🇮🇶 Iraq',         score: '', away: '🇰🇬 Kyrgyzstan'  },
    { home: '🇰🇬 Kyrgyzstan',   score: '', away: '🇶🇦 Qatar'       },
    { home: '🇳🇵 Nepal',        score: '', away: '🇮🇶 Iraq'        },
    { home: '🇶🇦 Qatar',        score: '', away: '🇳🇵 Nepal'      },
    { home: '🇰🇵 North Korea',  score: '', away: '🇰🇬 Kyrgyzstan'  },
    { home: '🇮🇶 Iraq',         score: '', away: '🇶🇦 Qatar'       },
    { home: '🇳🇵 Nepal',        score: '', away: '🇰🇵 North Korea'},
    { home: '🇰🇵 North Korea',  score: '', away: '🇮🇶 Iraq'        },
    { home: '🇰🇬 Kyrgyzstan',   score: '', away: '🇳🇵 Nepal'      },
  ],

  // Group F
  'Group F WC Qualifiers Argentina 2025': [
    { home: '🇺🇿 Uzbekistan',   score: '', away: '🇱🇧 Lebanon'     },
    { home: '🇸🇦 Saudi Arabia', score: '', away: '🇻🇳 Vietnam'     },
    { home: '🇻🇳 Vietnam',      score: '', away: '🇺🇿 Uzbekistan' },
    { home: '🇧🇩 Bangladesh',   score: '', away: '🇸🇦 Saudi Arabia'},
    { home: '🇺🇿 Uzbekistan',   score: '', away: '🇧🇩 Bangladesh' },
    { home: '🇱🇧 Lebanon',     score: '', away: '🇻🇳 Vietnam'     },
    { home: '🇸🇦 Saudi Arabia', score: '', away: '🇺🇿 Uzbekistan' },
    { home: '🇧🇩 Bangladesh',   score: '', away: '🇱🇧 Lebanon'     },
    { home: '🇱🇧 Lebanon',     score: '', away: '🇸🇦 Saudi Arabia'},
    { home: '🇻🇳 Vietnam',      score: '', away: '🇧🇩 Bangladesh' },
  ],
};

const groupStandingsAsia: Record<string, Standing[]> = {
  'Group A': [ /* TODO: AFC classificação */ ], /* … */
};

const groupMatchesNCAmerica: Record<string, Match[]> = {
  'Group A': [{ home: '🇺🇸 United States', score: '', away: '🇵🇦 Panama'      },
    { home: '🇲🇽 Mexico',        score: '', away: '🇨🇦 Canada'      },
    { home: '🇨🇦 Canada',        score: '', away: '🇺🇸 United States'},
    { home: '🇨🇷 Costa Rica',    score: '', away: '🇲🇽 Mexico'      },
    { home: '🇺🇸 United States', score: '', away: '🇨🇷 Costa Rica'  },
    { home: '🇵🇦 Panama',        score: '', away: '🇨🇦 Canada'      },
    { home: '🇲🇽 Mexico',        score: '', away: '🇺🇸 United States'},
    { home: '🇨🇷 Costa Rica',    score: '', away: '🇵🇦 Panama'      },
    { home: '🇵🇦 Panama',        score: '', away: '🇲🇽 Mexico'      },
    { home: '🇨🇦 Canada',        score: '', away: '🇨🇷 Costa Rica'  },
  ],
}; 
const groupStandingsNCAmerica: Record<string, Standing[]> = {
  'Group A': [ /* TODO: CONCACAF classificação */ ], /* … */
};

const groupMatchesByRegion: Record<Region, Record<string, Match[]>> = {
  Europe:           groupMatchesEurope,
  'South America':  groupMatchesSouthAmerica,
  Africa:           groupMatchesAfrica,
  Asia:             groupMatchesAsia,
  'N/C America':    groupMatchesNCAmerica,
};

const groupStandingsByRegion: Record<Region, Record<string, Standing[]>> = {
  Europe:           groupStandingsEurope,
  'South America':  groupStandingsSouthAmerica,
  Africa:           groupStandingsAfrica,
  Asia:             groupStandingsAsia,
  'N/C America':    groupStandingsNCAmerica,
};

function StandingsTable({
  groupName,
  rows,
}: {
  groupName: string;
  rows: Standing[];
}) {
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
          {rows.map(r => (
            <tr key={r.pos}>
              <td>{r.pos}</td><td>{r.team}</td><td>{r.pts}</td>
              <td>{r.played}</td><td>{r.won}</td><td>{r.draw}</td><td>{r.lost}</td>
              <td>{r.gf}</td><td>{r.ga}</td>
              <td>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WorldCup2025Page() {
  const [activeRegion, setActiveRegion] = useState<Region>('Europe');
  const matches   = groupMatchesByRegion[activeRegion];
  const standings = groupStandingsByRegion[activeRegion];

  return (
    <div style={{ padding: '20px' }}>
      <h1>World Cup Qualifiers 2025</h1>
      <div className="tabs">
        {regions.map(region => (
          <button
            key={region}
            className={region === activeRegion ? 'active' : ''}
            onClick={() => setActiveRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <div className="flex-container">
  {Object.entries(matches).map(([fullGroupName, gm]) => {
    const baseGroup = fullGroupName.split(' ').slice(0, 2).join(' ');
    return (
      <div key={fullGroupName} className="group-block">
        <div className="matches-block">
          <div className="group-title">{fullGroupName}</div>
          <table className="match-table group-stage">
            <thead>
              <tr><th>HOME</th><th>SCORE</th><th>AWAY</th></tr>
            </thead>
            <tbody>
              {gm.map((m, i) => (
                <tr key={i}>
                  <td>{m.home}</td>
                  <td>{m.score}</td>
                  <td>{m.away}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <StandingsTable
          groupName={fullGroupName}
          rows={standings[fullGroupName] || []}
        />
      </div>
    );
  })}
</div>
    </div>
  );
}