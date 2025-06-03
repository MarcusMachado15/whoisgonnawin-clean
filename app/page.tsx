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
    { home: '🇷🇸 Serbia', score: '2 - 3',      away: '🇪🇸 Spain' },
    { home: '🇲🇪 Montenegro', score: '1 - 3',      away: '🏴 Wales' },
    { home: '🇪🇸 Spain', score: '3 - 2',      away: '🇲🇪 Montenegro' },
    { home: '🇫🇮 Finland', score: '1 - 1',     away: '🇷🇸 Serbia' },
    { home: '🏴 Wales',   score: '',      away: '🇪🇸 Spain' },
    { home: '🇲🇪 Montenegro', score: '',      away: '🇫🇮 Finland' },
    { home: '🇫🇮 Finland', score: '',     away: '🏴 Wales' },
    { home: '🇷🇸 Serbia', score: '',      away: '🇲🇪 Montenegro' },
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇫🇷 France', score: '3 – 0', away: '🇬🇪 Georgia' },
    { home: '🇸🇪 Sweden', score: '2 – 0', away: '🇵🇱 Poland' },
    { home: '🇵🇱 Poland', score: '1 - 4', away: '🇫🇷 France' },
    { home: '🇬🇧 N. Ireland', score: '2 - 6', away: '🇸🇪 Sweden' },
    { home: '🇫🇷 France', score: '1 - 0', away: '🇬🇧 N. Ireland' },
    { home: '🇬🇪 Georgia', score: '0 - 1', away: '🇵🇱 Poland' },
    { home: '🇸🇪 Sweden', score: '', away: '🇫🇷 France' },
    { home: '🇬🇧 N. Ireland', score: '', away: '🇬🇪 Georgia' },
    { home: '🇬🇪 Georgia', score: '', away: '🇸🇪 Sweden' },
    { home: '🇵🇱 Poland', score: '', away: '🇬🇧 N. Ireland' },
  ],
  'Group C WC Qualifiers Argentina 2025': [
  { home: '🏴 England',        score: '1 – 0', away: '🇲🇰 N. Macedonia' },
  { home: '🇹🇷 Turkey',        score: '1 – 1', away: '🇷🇺 Russia'       },
  { home: '🇷🇺 Russia',        score: '2 - 2',      away: '🏴 England'      },
  { home: '🇮🇸 Iceland',       score: '4 - 0',      away: '🇹🇷 Turkey'      },
  { home: '🏴 England',        score: '1 - 1',      away: '🇮🇸 Iceland'     },
  { home: '🇲🇰 N. Macedonia',  score: '1 - 2',      away: '🇷🇺 Russia'       },
  { home: '🇷🇺 Russia',        score: '',      away: '🇮🇸 Iceland'     },
  { home: '🇹🇷 Turkey',        score: '',      away: '🏴 England'      },
  { home: '🇮🇸 Iceland',       score: '',      away: '🇲🇰 N. Macedonia' },
  { home: '🇲🇰 N. Macedonia',  score: '',      away: '🇹🇷 Turkey'      },
],

  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇳🇱 Netherlands', score: '1 – 0', away: '🇦🇱 Albania' },
    { home: '🇺🇦 Ukraine', score: '2 – 1', away: '🇭🇺 Hungary' },
    { home: '🇭🇺 Hungary', score: '4 - 2', away: '🇳🇱 Netherlands' },
    { home: '🇮🇱 Israel', score: '3 - 0', away: '🇺🇦 Ukraine' },
    { home: '🇳🇱 Netherlands', score: '0 - 2', away: '🇮🇱 Israel' },
    { home: '🇦🇱 Albania', score: '1 - 1', away: '🇭🇺 Hungary' },
    { home: '🇺🇦 Ukraine', score: '', away: '🇳🇱 Netherlands' },
    { home: '🇮🇱 Israel', score: '', away: '🇦🇱 Albania' },
    { home: '🇦🇱 Albania', score: '', away: '🇺🇦 Ukraine' },
    { home: '🇭🇺 Hungary', score: '', away: '🇮🇱 Israel' },
  ],
  'Group E WC Qualifiers Argentina 2025': [
    { home: '🇵🇹 Portugal', score: '1 – 1', away: '🇮🇪 Ireland' },
    { home: '🇦🇹 Austria', score: '1 – 1', away: '🇳🇴 Norway' },
    { home: '🇳🇴 Norway', score: '3 - 2', away: '🇵🇹 Portugal' },
    { home: '🇧🇬 Bulgaria', score: '0 - 1', away: '🇦🇹 Austria' },
    { home: '🇵🇹 Portugal', score: '2 - 4', away: '🇧🇬 Bulgaria' },
    { home: '🇮🇪 Ireland', score: '2 - 2', away: '🇳🇴 Norway' },
    { home: '🇦🇹 Austria', score: '', away: '🇵🇹 Portugal' },
    { home: '🇧🇬 Bulgaria', score: '', away: '🇮🇪 Ireland' },
    { home: '🇮🇪 Ireland', score: '', away: '🇦🇹 Austria' },
    { home: '🇳🇴 Norway', score: '', away: '🇧🇬 Bulgaria' },
  ],
  'Group F WC Qualifiers Argentina 2025': [
    { home: '🇧🇪 Belgium', score: '4 – 0', away: '🇸🇮 Slovenia' },
    { home: '🇩🇰 Denmark', score: '0 – 0', away: '🇨🇿 Czech Rep.' },
    { home: '🇨🇿 Czech Rep.', score: '1 - 2', away: '🇧🇪 Belgium' },
    { home: '🇰🇿 Kazakhstan', score: '3 - 2', away: '🇩🇰 Denmark' },
    { home: '🇧🇪 Belgium', score: '0 - 0', away: '🇰🇿 Kazakhstan' },
    { home: '🇸🇮 Slovenia', score: '1 - 3', away: '🇨🇿 Czech Rep.' },
    { home: '🇩🇰 Denmark', score: '', away: '🇧🇪 Belgium' },
    { home: '🇰🇿 Kazakhstan', score: '', away: '🇸🇮 Slovenia' },
    { home: '🇸🇮 Slovenia', score: '', away: '🇩🇰 Denmark' },
    { home: '🇨🇿 Czech Rep.', score: '', away: '🇰🇿 Kazakhstan' },
  ],
  'Group G WC Qualifiers Argentina 2025': [
    { home: '🇮🇹 Italy', score: '3 – 2', away: '🇸🇰 Slovakia' },
    { home: '🇨🇭 Switzerland', score: '0 – 0', away: '🇬🇷 Greece' },
    { home: '🇬🇷 Greece', score: '0 - 2', away: '🇮🇹 Italy' },
    { home: '🇦🇿 Azerbaijan', score: '2 - 3', away: '🇨🇭 Switzerland' },
    { home: '🇮🇹 Italy', score: '2 - 1', away: '🇦🇿 Azerbaijan' },
    { home: '🇸🇰 Slovakia', score: '1 - 1', away: '🇬🇷 Greece' },
    { home: '🇨🇭 Switzerland', score: '', away: '🇮🇹 Italy' },
    { home: '🇦🇿 Azerbaijan', score: '', away: '🇸🇰 Slovakia' },
    { home: '🇸🇰 Slovakia', score: '', away: '🇨🇭 Switzerland' },
    { home: '🇬🇷 Greece', score: '', away: '🇦🇿 Azerbaijan' },
  ],
  'Group H WC Qualifiers Argentina 2025': [
    { home: '🇩🇪 Germany', score: '1 – 2', away: '🇷🇴 Romania' },
    { home: '🇭🇷 Croatia', score: '2 – 0', away: '🏴 Scotland' },
    { home: '🏴 Scotland', score: '3 - 1', away: '🇩🇪 Germany' },
    { home: '🇨🇾 Cyprus', score: '1 - 1', away: '🇭🇷 Croatia' },
    { home: '🇩🇪 Germany', score: '3 - 1', away: '🇨🇾 Cyprus' },
    { home: '🇷🇴 Romania', score: '2 - 0', away: '🏴 Scotland' },
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
  { home: '🏴 England', score: '1 – 0', away: '🇬🇪 Georgia' },
  { home: '🇵🇱 Poland',  score: '1 – 2', away: '🇷🇺 Russia' },
  { home: '🇷🇺 Russia',  score: '2 – 3', away: '🏴 England' },
  { home: '🇮🇱 Israel',  score: '1 – 1', away: '🇵🇱 Poland' },
  { home: '🏴 England', score: '0 – 1', away: '🇮🇱 Israel' },
  { home: '🇬🇪 Georgia', score: '2 – 0', away: '🇷🇺 Russia' },
  { home: '🇵🇱 Poland',  score: '1 – 3', away: '🏴 England' },
  { home: '🇮🇱 Israel',  score: '1 – 0', away: '🇬🇪 Georgia' },
  { home: '🇬🇪 Georgia', score: '4 – 1', away: '🇵🇱 Poland' },
  { home: '🇷🇺 Russia',  score: '1 – 4', away: '🇮🇱 Israel' },
],

  'Group D WC Qualifiers Turkey 2024': [
  { home: '🇧🇪 Belgium',   score: '2 – 0', away: '🇦🇱 Albania'  },
  { home: '🇺🇦 Ukraine',   score: '1 – 2', away: '🇸🇰 Slovakia' },
  { home: '🇸🇰 Slovakia',  score: '0 – 1', away: '🇧🇪 Belgium'  },
  { home: '🇧🇬 Bulgaria',  score: '2 – 2', away: '🇺🇦 Ukraine'  },
  { home: '🇧🇪 Belgium',   score: '3 – 1', away: '🇧🇬 Bulgaria' },
  { home: '🇦🇱 Albania',   score: '1 – 2', away: '🇸🇰 Slovakia' },
  { home: '🇺🇦 Ukraine',   score: '1 – 1', away: '🇧🇪 Belgium'  },
  { home: '🇧🇬 Bulgaria',  score: '0 – 1', away: '🇦🇱 Albania'  },
  { home: '🇦🇱 Albania',   score: '1 – 2', away: '🇺🇦 Ukraine'  },
  { home: '🇸🇰 Slovakia',  score: '1 – 1', away: '🇧🇬 Bulgaria' },
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
  'Group A WC Qualifiers Nigeria 2021':[
    { home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },
  ],
  'Group B WC Qualifiers Nigeria 2021':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group C WC Qualifiers Nigeria 2021':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group D WC Qualifiers Nigeria 2021':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group E WC Qualifiers Nigeria 2021':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
    'Group A WC Qualifiers Thailand 2020':[
    { home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },
  ],
  'Group B WC Qualifiers Thailand 2020':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group C WC Qualifiers Thailand 2020':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group D WC Qualifiers Thailand 2020':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
  'Group E WC Qualifiers Thailand 2020':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
};

const groupStandingsEurope: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Spain',      played: 3, won: 2, draw: 1, lost: 0, gf:  7, ga: 5,  gd: +2, pts:  7 },
    { pos: 2, team: 'Wales',      played: 2, won: 2, draw: 0, lost: 0, gf:  8, ga: 2,  gd: +6, pts:  6 },
    { pos: 3, team: 'Finland',    played: 2, won: 0, draw: 2, lost: 0, gf:  2, ga: 2,  gd:  0, pts:  2 },
    { pos: 4, team: 'Serbia',     played: 3, won: 0, draw: 1, lost: 2, gf:  3, ga: 9,  gd: -6, pts:  1 },
    { pos: 5, team: 'Montenegro', played: 2, won: 0, draw: 0, lost: 2, gf:  3, ga: 6,  gd: -3, pts:  0 },
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'France',       played: 3, won: 3, draw: 0, lost: 0, gf:  8, ga: 1,  gd: +7, pts:  9 },
    { pos: 2, team: 'Sweden',       played: 2, won: 2, draw: 0, lost: 0, gf:  8, ga: 2,  gd: +6, pts:  6 },
    { pos: 3, team: 'Poland',       played: 3, won: 1, draw: 0, lost: 2, gf:  2, ga: 6,  gd: -4, pts:  3 },
    { pos: 4, team: 'N. Ireland',   played: 2, won: 0, draw: 0, lost: 2, gf:  2, ga: 7,  gd: -5, pts:  0 },
    { pos: 5, team: 'Georgia',      played: 2, won: 0, draw: 0, lost: 2, gf:  0, ga: 4,  gd: -4, pts:  0 },
  ],
  'Group C WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Russia',       played: 3, won: 1, draw: 2, lost: 0, gf:  5, ga: 4,  gd: +1, pts:  5 },
    { pos: 2, team: 'England',      played: 3, won: 1, draw: 2, lost: 0, gf:  4, ga: 3,  gd: +1, pts:  5 },
    { pos: 3, team: 'Iceland',      played: 2, won: 1, draw: 1, lost: 0, gf:  5, ga: 1,  gd: +4, pts:  4 },
    { pos: 4, team: 'Turkey',       played: 2, won: 0, draw: 1, lost: 1, gf:  1, ga: 5,  gd: -4, pts:  1 },
    { pos: 5, team: 'N. Macedonia', played: 2, won: 0, draw: 0, lost: 2, gf:  1, ga: 3,  gd: -2, pts:  0 },
  ],
'Group D WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Israel',       played: 2, won: 2, draw: 0, lost: 0, gf: 5, ga: 0,  gd: +5, pts:  6 },
  { pos: 2, team: 'Hungary',      played: 3, won: 1, draw: 1, lost: 1, gf: 6, ga: 5,  gd: +1, pts:  4 },
  { pos: 3, team: 'Ukraine',      played: 2, won: 1, draw: 0, lost: 1, gf: 2, ga: 4,  gd: -2, pts:  3 },
  { pos: 4, team: 'Netherlands',  played: 3, won: 1, draw: 0, lost: 2, gf: 3, ga: 6,  gd: -3, pts:  3 },
  { pos: 5, team: 'Albania',      played: 2, won: 0, draw: 1, lost: 1, gf: 1, ga: 2,  gd: -1, pts:  1 },
],

'Group E WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Norway',       played: 3, won: 1, draw: 2, lost: 0, gf: 6, ga: 5,  gd: +1, pts:  5 },
  { pos: 2, team: 'Austria',      played: 2, won: 1, draw: 1, lost: 0, gf: 2, ga: 1,  gd: +1, pts:  4 },
  { pos: 3, team: 'Bulgaria',     played: 2, won: 1, draw: 0, lost: 1, gf: 4, ga: 3,  gd: +1, pts:  3 },
  { pos: 4, team: 'Ireland',      played: 2, won: 0, draw: 2, lost: 0, gf: 3, ga: 3,  gd:  0, pts:  2 },
  { pos: 5, team: 'Portugal',     played: 3, won: 0, draw: 1, lost: 2, gf: 5, ga: 8,  gd: -3, pts:  1 },
],
  'Group F WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Belgium',    played: 3, won: 2, draw: 1, lost: 0, gf: 6,  ga: 1,  gd: +5, pts: 7 },
    { pos: 2, team: 'Czech Rep.', played: 3, won: 1, draw: 1, lost: 1, gf: 4,  ga: 3,  gd: +1, pts: 4 },
    { pos: 3, team: 'Kazakhstan', played: 2, won: 1, draw: 1, lost: 0, gf: 3,  ga: 2,  gd: +1, pts: 4 },
    { pos: 4, team: 'Denmark',    played: 2, won: 0, draw: 1, lost: 1, gf: 2,  ga: 3,  gd: -1, pts: 1 },
    { pos: 5, team: 'Slovenia',   played: 2, won: 0, draw: 0, lost: 2, gf: 1,  ga: 7,  gd: -6, pts: 0 },
  ],
  'Group G WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Italy',       played: 3, won: 3, draw: 0, lost: 0, gf: 7,  ga: 3,  gd: +4, pts: 9 },
    { pos: 2, team: 'Switzerland', played: 2, won: 1, draw: 1, lost: 0, gf: 3,  ga: 2,  gd: +1, pts: 4 },
    { pos: 3, team: 'Greece',      played: 3, won: 0, draw: 2, lost: 1, gf: 1,  ga: 3,  gd: -2, pts: 2 },
    { pos: 4, team: 'Slovakia',    played: 2, won: 0, draw: 1, lost: 1, gf: 3,  ga: 4,  gd: -1, pts: 1 },
    { pos: 5, team: 'Azerbaijan',  played: 2, won: 0, draw: 0, lost: 2, gf: 3,  ga: 5,  gd: -2, pts: 0 },
  ],
  'Group H WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Romania',   played: 2, won: 2, draw: 0, lost: 0, gf: 4,  ga: 1,  gd: +3, pts: 6 },
    { pos: 2, team: 'Croatia',   played: 2, won: 1, draw: 1, lost: 0, gf: 3,  ga: 1,  gd: +2, pts: 4 },
    { pos: 3, team: 'Germany',   played: 3, won: 1, draw: 0, lost: 2, gf: 5,  ga: 6,  gd: -1, pts: 3 },
    { pos: 4, team: 'Scotland',  played: 3, won: 1, draw: 0, lost: 2, gf: 3,  ga: 5,  gd: -2, pts: 3 },
    { pos: 5, team: 'Cyprus',    played: 2, won: 0, draw: 1, lost: 1, gf: 2,  ga: 4,  gd: -2, pts: 1 },
  ],
  'Group A WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'France',          played: 4, won: 2, draw: 1, lost: 1, gf:  8, ga: 5, gd:  3, pts:  7 },
    { pos: 2, team: 'Montenegro',      played: 4, won: 2, draw: 1, lost: 1, gf:  7, ga: 4, gd:  3, pts:  7 },
    { pos: 3, team: 'Hungary',         played: 4, won: 1, draw: 2, lost: 1, gf:  3, ga: 3, gd:  0, pts:  5 },
    { pos: 4, team: 'N. Macedonia',    played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga: 7, gd: -2, pts:  4 },
    { pos: 5, team: 'Wales',           played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga: 7, gd: -2, pts:  4 },
  ],
  'Group B WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Spain',        played: 4, won: 3, draw: 1, lost: 0, gf: 5, ga: 2, gd:  3, pts:  8 },
  { pos: 2, team: 'N. Ireland',   played: 4, won: 2, draw: 0, lost: 2, gf: 5, ga: 5, gd:  0, pts:  6 },
  { pos: 3, team: 'Serbia',       played: 4, won: 1, draw: 2, lost: 1, gf: 4, ga: 3, gd:  1, pts:  5 },
  { pos: 4, team: 'Sweden',       played: 4, won: 1, draw: 2, lost: 1, gf: 2, ga: 2, gd:  0, pts:  5 },
  { pos: 5, team: 'Iceland',      played: 4, won: 0, draw: 2, lost: 2, gf: 1, ga: 5, gd: -4, pts:  2 },
],  
'Group C WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Israel',  played: 4, won: 3, draw: 1, lost: 0, gf: 7,  ga: 2,  gd: +5, pts: 10 },
    { pos: 2, team: 'England', played: 4, won: 3, draw: 0, lost: 1, gf: 7,  ga: 4,  gd: +3, pts:  9 },
    { pos: 3, team: 'Georgia', played: 4, won: 2, draw: 0, lost: 2, gf: 6,  ga: 3,  gd: +3, pts:  6 },
    { pos: 4, team: 'Russia',  played: 4, won: 1, draw: 0, lost: 3, gf: 5,  ga: 10, gd: -5, pts:  3 },
    { pos: 5, team: 'Poland',  played: 4, won: 0, draw: 1, lost: 3, gf: 4,  ga: 10, gd: -6, pts:  1 },
  ],
  'Group D WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Belgium',   played: 4, won: 3, draw: 1, lost: 0, gf:  7, ga:  2, gd: +5, pts: 10 },
  { pos: 2, team: 'Slovakia',  played: 4, won: 2, draw: 1, lost: 1, gf:  5, ga:  4, gd: +1, pts:  7 },
  { pos: 3, team: 'Ukraine',   played: 4, won: 1, draw: 2, lost: 1, gf:  6, ga:  6, gd:  0, pts:  5 },
  { pos: 4, team: 'Albania',   played: 4, won: 1, draw: 0, lost: 3, gf:  3, ga:  6, gd: -3, pts:  3 },
  { pos: 5, team: 'Bulgaria',  played: 4, won: 0, draw: 2, lost: 2, gf:  4, ga:  7, gd: -3, pts:  2 },
],
'Group E WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Finland',      played: 4, won: 3, draw: 0, lost: 1, gf:  8, ga:  5, gd: +3, pts:  9 },
  { pos: 2, team: 'Netherlands',  played: 4, won: 1, draw: 3, lost: 0, gf:  4, ga:  2, gd: +2, pts:  6 },
  { pos: 3, team: 'Romania',      played: 4, won: 1, draw: 2, lost: 1, gf:  4, ga:  3, gd: +1, pts:  5 },
  { pos: 4, team: 'Austria',      played: 4, won: 0, draw: 3, lost: 1, gf:  5, ga:  6, gd: -1, pts:  3 },
  { pos: 5, team: 'Kazakhstan',   played: 4, won: 0, draw: 2, lost: 2, gf:  2, ga:  7, gd: -5, pts:  2 },
],
'Group F WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Portugal',    played: 4, won: 2, draw: 1, lost: 1, gf:  4, ga:  4, gd:  0, pts:  7 },
  { pos: 2, team: 'Azerbaijan',  played: 4, won: 2, draw: 0, lost: 2, gf:  5, ga:  4, gd: +1, pts:  6 },
  { pos: 3, team: 'Ireland',     played: 4, won: 1, draw: 2, lost: 1, gf:  3, ga:  2, gd: +1, pts:  5 },
  { pos: 4, team: 'Czech Rep.',  played: 4, won: 1, draw: 2, lost: 1, gf:  3, ga:  3, gd:  0, pts:  5 },
  { pos: 5, team: 'Denmark',     played: 4, won: 0, draw: 3, lost: 1, gf:  3, ga:  5, gd: -2, pts:  3 },
],
'Group G WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Italy',       played: 4, won: 2, draw: 2, lost: 0, gf:  4, ga: 1,  gd: +3, pts:  8 },
    { pos: 2, team: 'Cyprus',      played: 4, won: 1, draw: 3, lost: 0, gf:  1, ga: 0,  gd: +1, pts:  6 },
    { pos: 3, team: 'Greece',      played: 4, won: 1, draw: 2, lost: 1, gf:  3, ga: 2,  gd: +1, pts:  5 },
    { pos: 4, team: 'Scotland',    played: 4, won: 1, draw: 2, lost: 1, gf:  1, ga: 2,  gd: -1, pts:  5 },
    { pos: 5, team: 'Switzerland', played: 4, won: 0, draw: 1, lost: 3, gf:  0, ga: 4,  gd: -4, pts:  1 },
  ],
  'Group H WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Germany',    played: 4, won: 2, draw: 1, lost: 1, gf:  5, ga:  4, gd: +1, pts:  7 },
    { pos: 2, team: 'Malta',      played: 4, won: 2, draw: 1, lost: 1, gf:  5, ga:  4, gd: +1, pts:  7 },
    { pos: 3, team: 'Norway',     played: 4, won: 2, draw: 0, lost: 2, gf:  7, ga:  4, gd: +3, pts:  6 },
    { pos: 4, team: 'Croatia',    played: 4, won: 1, draw: 1, lost: 2, gf:  3, ga:  4, gd: -1, pts:  4 },
    { pos: 5, team: 'Slovenia',   played: 4, won: 1, draw: 1, lost: 2, gf:  4, ga:  8, gd: -4, pts:  4 },
  ],
  'Group A WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Belgium',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 2, team: 'Netherlands',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 3, team: 'Wales',            played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 10 },
    { pos: 4, team: 'Northern Ireland', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  8 },
    { pos: 5, team: 'Iceland',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
  ],
  'Group B WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'France',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 18 },
    { pos: 2, team: 'Finland',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 17 },
    { pos: 3, team: 'Switzerland', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 13 },
    { pos: 4, team: 'Scotland',    played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
    { pos: 5, team: 'Sweden',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  3 },
  ],
  'Group C WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Norway',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 17 },
    { pos: 2, team: 'Germany',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 3, team: 'England',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 4, team: 'Bosnia',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  9 },
    { pos: 5, team: 'Austria',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  3 },
  ],
  'Group D WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Portugal', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 18 },
    { pos: 2, team: 'Israel',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 11 },
    { pos: 3, team: 'Denmark',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 10 },
    { pos: 4, team: 'Slovakia', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  9 },
    { pos: 5, team: 'Ukraine',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  3 },
  ],
  'Group E WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Turkey',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 16 },
    { pos: 2, team: 'Italy',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 3, team: 'Serbia',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 4, team: 'Spain',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 13 },
    { pos: 5, team: 'Luxembourg', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  0 },
  ],
  'Group A WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'Portugal',        played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 16 },
    { pos: 2, team: 'Austria',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 3, team: 'Russia',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 4, team: 'Italy',           played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 10 },
    { pos: 5, team: 'Montenegro',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  6 },
  ],

  'Group B WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'France',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 19 },
    { pos: 2, team: 'Spain',           played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 3, team: 'Czech Republic',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 4, team: 'Ireland',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 10 },
    { pos: 5, team: 'Armenia',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  3 },
  ],

  'Group C WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'England',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 16 },
    { pos: 2, team: 'Netherlands',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 13 },
    { pos: 3, team: 'Bulgaria',        played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 4, team: 'Ukraine',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  6 },
    { pos: 5, team: 'Romania',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  4 },
  ],

  'Group D WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'Belgium',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 2, team: 'Scotland',        played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 13 },
    { pos: 3, team: 'Poland',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 11 },
    { pos: 4, team: 'Germany',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 11 },
    { pos: 5, team: 'N. Macedonia',       played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  6 },
  ],

  'Group E WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'Croatia',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 19 },
    { pos: 2, team: 'Denmark',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 3, team: 'Switzerland',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 10 },
    { pos: 4, team: 'Norway',          played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
    { pos: 5, team: 'Finland',         played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
  ],

};

/** ——— PLACEHOLDERS PARA AS OUTRAS CONFEDERAÇÕES ——— **/
const groupMatchesSouthAmerica: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇦🇷 Argentina', score: '2 - 0', away: '🇵🇾 Paraguay' },
    { home: '🇨🇴 Colombia',  score: '2 - 3', away: '🇪🇨 Ecuador' },
    { home: '🇪🇨 Ecuador',   score: '2 - 2', away: '🇦🇷 Argentina' },
    { home: '🇨🇱 Chile',     score: '0 - 3', away: '🇨🇴 Colombia' },
    { home: '🇦🇷 Argentina', score: '1 - 1', away: '🇨🇱 Chile' },
    { home: '🇵🇾 Paraguay',  score: '0 - 1', away: '🇪🇨 Ecuador' },
    { home: '🇨🇴 Colombia',  score: '', away: '🇦🇷 Argentina' },
    { home: '🇨🇱 Chile',     score: '', away: '🇵🇾 Paraguay' },
    { home: '🇵🇾 Paraguay',  score: '', away: '🇨🇴 Colombia' },
    { home: '🇪🇨 Ecuador',   score: '', away: '🇨🇱 Chile' },
  ],
  
  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇧🇷 Brazil',    score: '1 - 1', away: '🇻🇪 Venezuela' },
    { home: '🇺🇾 Uruguay',   score: '3 - 0', away: '🇵🇪 Peru' },
    { home: '🇵🇪 Peru',      score: '3 - 1', away: '🇧🇷 Brazil' },
    { home: '🇧🇴 Bolivia',   score: '2 - 3', away: '🇺🇾 Uruguay' },
    { home: '🇧🇷 Brazil',    score: '4 - 1', away: '🇧🇴 Bolivia' },
    { home: '🇻🇪 Venezuela', score: '', away: '🇵🇪 Peru' },
    { home: '🇺🇾 Uruguay',   score: '', away: '🇧🇷 Brazil' },
    { home: '🇧🇴 Bolivia',   score: '', away: '🇻🇪 Venezuela' },
    { home: '🇻🇪 Venezuela', score: '', away: '🇺🇾 Uruguay' },
    { home: '🇵🇪 Peru',      score: '', away: '🇧🇴 Bolivia' },
  ],'Group A WC Qualifiers Turkey 2024': [
  { home: '🇦🇷 Argentina',   score: '1 – 2', away: '🇨🇱 Chile'     },
  { home: '🇺🇾 Uruguay',     score: '1 – 1', away: '🇪🇨 Ecuador'   },
  { home: '🇪🇨 Ecuador',     score: '2 – 2', away: '🇦🇷 Argentina' },
  { home: '🇵🇾 Paraguay',    score: '1 – 2', away: '🇺🇾 Uruguay'   },
  { home: '🇦🇷 Argentina',   score: '3 – 1', away: '🇵🇾 Paraguay'  },
  { home: '🇨🇱 Chile',       score: '0 – 2', away: '🇪🇨 Ecuador'   },
  { home: '🇺🇾 Uruguay',     score: '1 – 3', away: '🇦🇷 Argentina' },
  { home: '🇵🇾 Paraguay',    score: '1 – 0', away: '🇨🇱 Chile'     },
  { home: '🇨🇱 Chile',       score: '0 – 2', away: '🇺🇾 Uruguay'   },
  { home: '🇪🇨 Ecuador',     score: '2 – 2', away: '🇵🇾 Paraguay'  },
],

'Group B WC Qualifiers Turkey 2024': [
  { home: '🇧🇷 Brazil',      score: '2 – 0', away: '🇵🇪 Peru'       },
  { home: '🇨🇴 Colombia',    score: '1 – 1', away: '🇻🇪 Venezuela' },
  { home: '🇻🇪 Venezuela',   score: '1 – 2', away: '🇧🇷 Brazil'    },
  { home: '🇧🇴 Bolivia',     score: '0 – 1', away: '🇨🇴 Colombia'  },
  { home: '🇧🇷 Brazil',      score: '1 – 1', away: '🇧🇴 Bolivia'   },
  { home: '🇵🇪 Peru',        score: '1 – 0', away: '🇻🇪 Venezuela' },
  { home: '🇨🇴 Colombia',    score: '2 – 3', away: '🇧🇷 Brazil'    },
  { home: '🇧🇴 Bolivia',     score: '1 – 1', away: '🇵🇪 Peru'      },
  { home: '🇵🇪 Peru',        score: '2 – 1', away: '🇨🇴 Colombia'  },
  { home: '🇻🇪 Venezuela',   score: '3 – 1', away: '🇧🇴 Bolivia'   },
],
'Group A WC Qualifiers Nigeria 2021':[
    { home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },
  ],
  'Group B WC Qualifiers Nigeria 2021':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],
    'Group A WC Qualifiers Thailand 2020':[
    { home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },
  ],
  'Group B WC Qualifiers Thailand 2020':
  [{ home: '',       score: '', away: ''    },
    { home: '',       score: '', away: ''       },
    { home: '',        score: '', away: ''     },
    { home: '',         score: '', away: ''     },
    { home: '',       score: '', away: ''        },
    { home: '',      score: '', away: ''       },
    { home: '',       score: '', away: ''     },
    { home: '',         score: '', away: ''    },
    { home: '',      score: '', away: ''     },
    { home: '',        score: '', away: ''        },],

};
const groupStandingsSouthAmerica: Record<string, Standing[]> = {
    'Group A WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Argentina', played: 2, won: 1, draw: 1, lost: 0, gf: 4, ga: 2, gd:  2, pts: 4 },
    { pos: 2, team: 'Ecuador',   played: 2, won: 1, draw: 1, lost: 0, gf: 5, ga: 4, gd:  1, pts: 4 },
    { pos: 3, team: 'Colombia',  played: 2, won: 1, draw: 0, lost: 1, gf: 5, ga: 3, gd:  2, pts: 3 },
    { pos: 4, team: 'Paraguay',  played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
    { pos: 5, team: 'Chile',     played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 3, gd: -3, pts: 0 },
  ],
  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Uruguay',   played: 2, won: 2, draw: 0, lost: 0, gf: 6, ga: 2, gd:  4, pts: 6 },
    { pos: 2, team: 'Peru',      played: 2, won: 1, draw: 0, lost: 1, gf: 3, ga: 3, gd:  0, pts: 3 },
    { pos: 3, team: 'Venezuela', played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
    { pos: 4, team: 'Brazil',    played: 2, won: 0, draw: 1, lost: 1, gf: 2, ga: 4, gd: -2, pts: 1 },
    { pos: 5, team: 'Bolivia',   played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 0 },
  ],
  'Group A WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Argentina(Q)', played: 4, won: 2, draw: 1, lost: 1, gf:  9, ga:  6, gd:  3, pts:  7 },
  { pos: 2, team: 'Uruguay(Q)',   played: 4, won: 2, draw: 1, lost: 1, gf:  6, ga:  5, gd:  1, pts:  7 },
  { pos: 3, team: 'Ecuador(Q)',   played: 4, won: 1, draw: 3, lost: 0, gf:  7, ga:  5, gd:  2, pts:  6 },
  { pos: 4, team: 'Paraguay',  played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga:  7, gd: -2, pts:  4 },
  { pos: 5, team: 'Chile',     played: 4, won: 1, draw: 0, lost: 3, gf:  2, ga:  6, gd: -4, pts:  3 },
],

'Group B WC Qualifiers Turkey 2024': [
  { pos: 1, team: 'Brazil(Q)',    played: 4, won: 3, draw: 1, lost: 0, gf:  8, ga:  4, gd:  4, pts: 10 },
  { pos: 2, team: 'Peru(Q)',      played: 4, won: 2, draw: 1, lost: 1, gf:  4, ga:  4, gd:  0, pts:  7 },
  { pos: 3, team: 'Venezuela(Q)', played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga:  5, gd:  0, pts:  4 },
  { pos: 4, team: 'Colombia',  played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga:  6, gd: -1, pts:  4 },
  { pos: 5, team: 'Bolivia',   played: 4, won: 0, draw: 2, lost: 2, gf:  3, ga:  6, gd: -3, pts:  2 },
],'Group A WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Brazil(Q)',    played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 17 },
    { pos: 2, team: 'Colombia(Q)',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 3, team: 'Paraguay',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  9 },
    { pos: 4, team: 'Ecuador',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  7 },
    { pos: 5, team: 'Chile',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
  ],
  'Group B WC Qualifiers Nigeria 2021': [
    { pos: 1, team: 'Uruguay(Q)',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 18 },
    { pos: 2, team: 'Argentina(Q)', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 17 },
    { pos: 3, team: 'Bolivia',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 4, team: 'Venezuela', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
    { pos: 5, team: 'Peru',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  1 },
  ],
  'Group A WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'Argentina(Q)', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 15 },
    { pos: 2, team: 'Uruguay(Q)',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 14 },
    { pos: 3, team: 'Venezuela', played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 11 },
    { pos: 4, team: 'Peru',      played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  9 },
    { pos: 5, team: 'Bolivia',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  5 },
  ],
  'Group B WC Qualifiers Thailand 2020': [
    { pos: 1, team: 'Brazil(Q)',    played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 20 },
    { pos: 2, team: 'Colombia(Q)',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 3, team: 'Chile',     played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 12 },
    { pos: 4, team: 'Paraguay',  played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  6 },
    { pos: 5, team: 'Ecuador',   played: 8, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts:  2 },
  ],
};

const groupMatchesAfrica: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇲🇦 Morocco',      score: '1 - 0', away: '🇿🇲 Zambia'     },
    { home: '🇨🇲 Cameroon',     score: '0 - 0', away: '🇲🇱 Mali'       },
    { home: '🇲🇱 Mali',         score: '0 - 4', away: '🇲🇦 Morocco'    },
    { home: '🇰🇪 Kenya',        score: '1 - 2', away: '🇨🇲 Cameroon'   },
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
    { home: '🇿🇦 South Africa', score: '3 - 4', away: '🇸🇳 Senegal'     },
    { home: '🇿🇼 Zimbabwe',     score: '2 - 0', away: '🇹🇳 Tunisia'     },
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
    { home: '🇨🇩 Congo DR',     score: '2 - 0', away: '🇪🇬 Egypt'   },
    { home: '🇧🇼 Botswana',     score: '0 - 2', away: '🇳🇬 Nigeria'      },
    { home: '🇪🇬 Egypt',        score: '1 - 0', away: '🇧🇼 Botswana'   },
    { home: '🇬🇦 Gabon',        score: '', away: '🇨🇩 Congo DR'  },
    { home: '🇳🇬 Nigeria',      score: '', away: '🇪🇬 Egypt'      },
    { home: '🇧🇼 Botswana',     score: '', away: '🇬🇦 Gabon'      },
    { home: '🇬🇦 Gabon',        score: '', away: '🇳🇬 Nigeria'   },
    { home: '🇨🇩 Congo DR',     score: '', away: '🇧🇼 Botswana'   },
  ],

  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇩🇿 Algeria',      score: '3 - 5', away: '🇬🇭 Ghana'       },
    { home: '🇨🇮 Ivory Coast',   score: '0 - 0', away: '🇧🇫 Burkina Faso'},
    { home: '🇧🇫 Burkina Faso', score: '2 - 2', away: '🇩🇿 Algeria'    },
    { home: '🇸🇴 Somalia',      score: '1 - 2', away: '🇨🇮 Ivory Coast'},
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
    { pos: 1, team: 'Morocco',  played: 2, won: 2, draw: 0, lost: 0, gf: 5, ga: 0,  gd: +5, pts:  6 },
    { pos: 2, team: 'Cameroon', played: 2, won: 1, draw: 1, lost: 0, gf: 2, ga: 1,  gd: +1, pts:  4 },
    { pos: 3, team: 'Mali',     played: 2, won: 0, draw: 1, lost: 1, gf: 0, ga: 4,  gd: -4, pts:  1 },
    { pos: 4, team: 'Kenya',    played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2,  gd: -1, pts:  0 },
    { pos: 5, team: 'Zambia',   played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 1,  gd: -1, pts:  0 },
  ],


  'Group B WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Senegal',       played: 2, won: 2, draw: 0, lost: 0, gf: 7, ga: 5, gd: +2, pts:  6 },
    { pos: 2, team: 'South Africa',  played: 2, won: 1, draw: 0, lost: 1, gf: 6, ga: 5, gd: +1, pts:  3 },
    { pos: 3, team: 'Zimbabwe',      played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 0, gd: +2, pts:  3 },
    { pos: 4, team: 'Guinea',        played: 1, won: 0, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts:  0 },
    { pos: 5, team: 'Tunisia',       played: 2, won: 0, draw: 0, lost: 2, gf: 0, ga: 4, gd: -4, pts:  0 },
  ],

  'Group C WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Congo DR',  played: 2, won: 2, draw: 0, lost: 0, gf: 5, ga: 0, gd: +5, pts: 6 },
  { pos: 2, team: 'Egypt',     played: 3, won: 1, draw: 1, lost: 1, gf: 2, ga: 3, gd:  -1, pts: 4 },
  { pos: 3, team: 'Nigeria',   played: 2, won: 1, draw: 0, lost: 1, gf: 2, ga: 3, gd:  -1, pts: 3 },
  { pos: 4, team: 'Gabon',     played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:   0, pts: 1 },
  { pos: 5, team: 'Botswana',  played: 2, won: 0, draw: 0, lost: 2, gf: 0, ga: 3, gd:  -3, pts: 0 },
],
  'Group D WC Qualifiers Argentina 2025': [
    { pos: 1, team: 'Ivory Coast',   played: 2, won: 1, draw: 1, lost: 0, gf: 2, ga: 1, gd: +1, pts:  4 },
    { pos: 2, team: 'Ghana',         played: 1, won: 1, draw: 0, lost: 0, gf: 5, ga: 3, gd: +2, pts:  3 },
    { pos: 3, team: 'Burkina Faso',  played: 2, won: 0, draw: 2, lost: 0, gf: 2, ga: 2, gd:  0, pts:  2 },
    { pos: 4, team: 'Algeria',       played: 2, won: 0, draw: 1, lost: 1, gf: 5, ga: 7, gd: -2, pts:  1 },
    { pos: 5, team: 'Somalia',       played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts:  0 },
  ],
};

const groupMatchesAsia: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇯🇵 Japan',        score: '1 - 0', away: '🇰🇼 Kuwait'       },
    { home: '🇧🇭 Bahrain',      score: '0 - 0', away: '🇳🇿 New Zealand'  },
    { home: '🇳🇿 New Zealand',  score: '1 - 1', away: '🇯🇵 Japan'        },
    { home: '🇵🇭 Philippines',  score: '1 - 1', away: '🇧🇭 Bahrain'      },
    { home: '🇯🇵 Japan',        score: '', away: '🇵🇭 Philippines'  },
    { home: '🇰🇼 Kuwait',       score: '', away: '🇳🇿 New Zealand'  },
    { home: '🇧🇭 Bahrain',      score: '', away: '🇯🇵 Japan'        },
    { home: '🇵🇭 Philippines',  score: '', away: '🇰🇼 Kuwait'       },
    { home: '🇰🇼 Kuwait',       score: '', away: '🇧🇭 Bahrain'      },
    { home: '🇳🇿 New Zealand',  score: '', away: '🇵🇭 Philippines'  },
  ],

  // Group B
  'Group B WC Qualifiers Argentina 2025': [
    { home: '🇮🇷 Iran',         score: '1 - 1', away: '🇲🇾 Malaysia'    },
    { home: '🇴🇲 Oman',         score: '0 - 4', away: '🇨🇳 China'       },
    { home: '🇨🇳 China',        score: '2 - 1', away: '🇮🇷 Iran'         },
    { home: '🇭🇰 Hong Kong',    score: '1 - 3', away: '🇴🇲 Oman'        },
    { home: '🇮🇷 Iran',         score: '', away: '🇭🇰 Hong Kong'  },
    { home: '🇲🇾 Malaysia',     score: '', away: '🇨🇳 China'       },
    { home: '🇴🇲 Oman',         score: '', away: '🇮🇷 Iran'         },
    { home: '🇭🇰 Hong Kong',    score: '', away: '🇲🇾 Malaysia'    },
    { home: '🇲🇾 Malaysia',     score: '', away: '🇴🇲 Oman'        },
    { home: '🇨🇳 China',        score: '', away: '🇭🇰 Hong Kong'  },
  ],

  // Group C
  'Group C WC Qualifiers Argentina 2025': [
    { home: '🇰🇷 South Korea',  score: '4 - 0', away: '🇮🇳 India'       },
    { home: '🇦🇪 UAE',          score: '1 - 3', away: '🇹🇭 Thailand'    },
    { home: '🇹🇭 Thailand',     score: '2 - 1', away: '🇰🇷 South Korea'},
    { home: '🇸🇬 Singapore',    score: '1 - 3', away: '🇦🇪 UAE'         },
    { home: '🇰🇷 South Korea',  score: '', away: '🇸🇬 Singapore'  },
    { home: '🇮🇳 India',        score: '', away: '🇹🇭 Thailand'    },
    { home: '🇦🇪 UAE',          score: '', away: '🇰🇷 South Korea'},
    { home: '🇸🇬 Singapore',    score: '', away: '🇮🇳 India'       },
    { home: '🇮🇳 India',        score: '', away: '🇦🇪 UAE'         },
    { home: '🇹🇭 Thailand',     score: '', away: '🇸🇬 Singapore'  },
  ],

  // Group D
  'Group D WC Qualifiers Argentina 2025': [
    { home: '🇦🇺 Australia',    score: '1 - 2', away: '🇮🇩 Indonesia'  },
    { home: '🇯🇴 Jordan',       score: '3 - 2', away: '🇵🇸 Palestine'   },
    { home: '🇵🇸 Palestine',    score: '1 - 1', away: '🇦🇺 Australia'  },
    { home: '🇲🇲 Myanmar',      score: '2 - 2', away: '🇯🇴 Jordan'      },
    { home: '🇦🇺 Australia',    score: '', away: '🇲🇲 Myanmar'     },
    { home: '🇮🇩 Indonesia',    score: '', away: '🇵🇸 Palestine'   },
    { home: '🇯🇴 Jordan',       score: '', away: '🇦🇺 Australia'  },
    { home: '🇲🇲 Myanmar',      score: '', away: '🇮🇩 Indonesia'  },
    { home: '🇮🇩 Indonesia',    score: '', away: '🇯🇴 Jordan'      },
    { home: '🇵🇸 Palestine',    score: '', away: '🇲🇲 Myanmar'     },
  ],

  // Group E
  'Group E WC Qualifiers Argentina 2025': [
    { home: '🇶🇦 Qatar',        score: '2 - 0', away: '🇰🇵 North Korea'},
    { home: '🇮🇶 Iraq',         score: '1 - 2', away: '🇰🇬 Kyrgyzstan'  },
    { home: '🇰🇬 Kyrgyzstan',   score: '0 - 2', away: '🇶🇦 Qatar'       },
    { home: '🇳🇵 Nepal',        score: '0 - 2', away: '🇮🇶 Iraq'        },
    { home: '🇶🇦 Qatar',        score: '', away: '🇳🇵 Nepal'      },
    { home: '🇰🇵 North Korea',  score: '', away: '🇰🇬 Kyrgyzstan'  },
    { home: '🇮🇶 Iraq',         score: '', away: '🇶🇦 Qatar'       },
    { home: '🇳🇵 Nepal',        score: '', away: '🇰🇵 North Korea'},
    { home: '🇰🇵 North Korea',  score: '', away: '🇮🇶 Iraq'        },
    { home: '🇰🇬 Kyrgyzstan',   score: '', away: '🇳🇵 Nepal'      },
  ],

  // Group F
  'Group F WC Qualifiers Argentina 2025': [
    { home: '🇺🇿 Uzbekistan',   score: '1 - 1', away: '🇱🇧 Lebanon'     },
    { home: '🇸🇦 Saudi Arabia', score: '0 - 1', away: '🇻🇳 Vietnam'     },
    { home: '🇻🇳 Vietnam',      score: '0 - 1', away: '🇺🇿 Uzbekistan' },
    { home: '🇧🇩 Bangladesh',   score: '0 - 0', away: '🇸🇦 Saudi Arabia'},
    { home: '🇺🇿 Uzbekistan',   score: '', away: '🇧🇩 Bangladesh' },
    { home: '🇱🇧 Lebanon',     score: '', away: '🇻🇳 Vietnam'     },
    { home: '🇸🇦 Saudi Arabia', score: '', away: '🇺🇿 Uzbekistan' },
    { home: '🇧🇩 Bangladesh',   score: '', away: '🇱🇧 Lebanon'     },
    { home: '🇱🇧 Lebanon',     score: '', away: '🇸🇦 Saudi Arabia'},
    { home: '🇻🇳 Vietnam',      score: '', away: '🇧🇩 Bangladesh' },
  ],
  'Group A WC Qualifiers Turkey 2024': [
    { home: 'JP Japan',      score: '2 - 1', away: 'ID Indonesia' },
    { home: 'BH Bahrain',    score: '1 - 3', away: 'CN China'       },
    { home: 'CN China',      score: '0 - 1', away: 'JP Japan'     },
    { home: 'MY Malaysia',   score: '2 - 1', away: 'BH Bahrain'   },
    { home: 'JP Japan',      score: '2 - 1', away: 'MY Malaysia'  },
    { home: 'ID Indonesia',  score: '1 - 0', away: 'CN China'     },
    { home: 'BH Bahrain',    score: '0 - 3', away: 'JP Japan'     },
    { home: 'MY Malaysia',   score: '1 - 2', away: 'ID Indonesia' },
    { home: 'ID Indonesia',  score: '1 - 0', away: 'BH Bahrain'   },
    { home: 'CN China',      score: '1 - 1', away: 'MY Malaysia'  }
  ],

  // Grupo B
  'Group B WC Qualifiers Turkey 2024': [
    { home: 'IR Iran',       score: '1 - 0', away: 'IN India'     },
    { home: 'OM Oman',       score: '0 - 1', away: 'SY Syria'     },
    { home: 'SY Syria',      score: '1 - 2', away: 'IR Iran'      },
    { home: 'KW Kuwait',     score: '2 - 4', away: 'OM Oman'      },
    { home: 'IR Iran',       score: '1 - 0', away: 'KW Kuwait'    },
    { home: 'IN India',      score: '1 - 2', away: 'SY Syria'     },
    { home: 'OM Oman',       score: '0 - 0', away: 'IR Iran'      },
    { home: 'KW Kuwait',     score: '1 - 1', away: 'IN India'     },
    { home: 'IN India',      score: '1 - 2', away: 'OM Oman'      },
    { home: 'SY Syria',      score: '1 - 0', away: 'KW Kuwait'    }
  ],

  // Grupo C
  'Group C WC Qualifiers Turkey 2024': [
    { home: 'KR South Korea', score: '4 - 0', away: 'LB Lebanon'    },
    { home: 'AE UAE',         score: '0 - 0', away: 'NZ New Zealand'},
    { home: 'NZ New Zealand', score: '1 - 2', away: 'KR South Korea'},
    { home: 'HK Hong Kong',   score: '2 - 1', away: 'AE UAE'        },
    { home: 'KR South Korea', score: '1 - 1', away: 'HK Hong Kong'  },
    { home: 'LB Lebanon',     score: '0 - 0', away: 'NZ New Zealand'},
    { home: 'AE UAE',         score: '1 - 1', away: 'KR South Korea'},
    { home: 'HK Hong Kong',   score: '2 - 1', away: 'LB Lebanon'    },
    { home: 'LB Lebanon',     score: '1 - 0', away: 'AE UAE'        },
    { home: 'NZ New Zealand', score: '1 - 1', away: 'HK Hong Kong'  }
  ],
  
  'Group D WC Qualifiers Turkey 2024': [
    { home: 'AU Australia',     score: '2 - 0', away: 'VN Vietnam'   },
    { home: 'JO Jordan',        score: '3 - 0', away: 'PS Palestine' },
    { home: 'PS Palestine',     score: '5 - 1', away: 'AU Australia' },
    { home: 'LA Laos',          score: '1 - 1', away: 'JO Jordan'    },
    { home: 'AU Australia',     score: '3 - 1', away: 'LA Laos'      },
    { home: 'VN Vietnam',       score: '0 - 1', away: 'PS Palestine' },
    { home: 'JO Jordan',        score: '0 - 1', away: 'AU Australia' },
    { home: 'LA Laos',          score: '0 - 1', away: 'VN Vietnam'   },
    { home: 'VN Vietnam',       score: '1 - 1', away: 'JO Jordan'    },
    { home: 'PS Palestine',     score: '2 - 1', away: 'LA Laos'      }
  ],

  // Grupo E
  'Group E WC Qualifiers Turkey 2024': [
    { home: 'QA Qatar',          score: '2 - 1', away: 'KP North Korea' },
    { home: 'UZ Uzbekistan',     score: '0 - 1', away: 'TH Thailand'    },
    { home: 'TH Thailand',       score: '0 - 0', away: 'QA Qatar'       },
    { home: 'MM Myanmar',        score: '2 - 0', away: 'UZ Uzbekistan' },
    { home: 'QA Qatar',          score: '2 - 1', away: 'MM Myanmar'     },
    { home: 'KP North Korea',    score: '1 - 0', away: 'TH Thailand'    },
    { home: 'UZ Uzbekistan',     score: '3 - 0', away: 'QA Qatar'       },
    { home: 'MM Myanmar',        score: '1 - 1', away: 'KP North Korea' },
    { home: 'KP North Korea',    score: '0 - 2', away: 'UZ Uzbekistan' },
    { home: 'TH Thailand',       score: '1 - 0', away: 'MM Myanmar'     }
  ],

  // Grupo F
  'Group F WC Qualifiers Turkey 2024': [
    { home: 'IQ Iraq',           score: '1 - 0', away: 'TJ Tajikistan'   },
    { home: 'SA Saudi Arabia',   score: '3 - 1', away: 'KG Kyrgyzstan'   },
    { home: 'KG Kyrgyzstan',     score: '1 - 0', away: 'IQ Iraq'         },
    { home: 'KH Cambodia',       score: '1 - 1', away: 'SA Saudi Arabia' },
    { home: 'IQ Iraq',           score: '2 - 0', away: 'KH Cambodia'     },
    { home: 'TJ Tajikistan',     score: '2 - 0', away: 'KG Kyrgyzstan'   },
    { home: 'SA Saudi Arabia',   score: '4 - 0', away: 'IQ Iraq'         },
    { home: 'KH Cambodia',       score: '0 - 1', away: 'TJ Tajikistan'   },
    { home: 'TJ Tajikistan',     score: '0 - 3', away: 'SA Saudi Arabia' },
    { home: 'KG Kyrgyzstan',     score: '0 - 3', away: 'KH Cambodia'     }
  ],
};

const groupStandingsAsia: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Japan',       played: 2, won: 1, draw: 1, lost: 0, gf: 2, ga: 1, gd: +1, pts: 4 },
  { pos: 2, team: 'Bahrain',     played: 2, won: 0, draw: 2, lost: 0, gf: 0, ga: 0, gd:  0, pts: 2 },
  { pos: 3, team: 'New Zealand', played: 2, won: 0, draw: 2, lost: 0, gf: 1, ga: 1, gd:  0, pts: 2 },
  { pos: 4, team: 'Philippines', played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
  { pos: 5, team: 'Kuwait',      played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 1, gd: -1, pts: 0 },
],

'Group B WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'China',       played: 2, won: 2, draw: 0, lost: 0, gf: 6, ga: 1, gd: +5, pts: 6 },
  { pos: 2, team: 'Oman',        played: 2, won: 1, draw: 0, lost: 1, gf: 3, ga: 4, gd: -1, pts: 3 },
  { pos: 3, team: 'Malaysia',    played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
  { pos: 4, team: 'Iran',        played: 2, won: 0, draw: 1, lost: 1, gf: 2, ga: 3, gd: -1, pts: 1 },
  { pos: 5, team: 'Hong Kong',   played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },
],

  'Group C WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Thailand',     played: 2, won: 2, draw: 0, lost: 0, gf: 5, ga: 2, gd: +3, pts: 6 },
  { pos: 2, team: 'South Korea',  played: 2, won: 1, draw: 0, lost: 1, gf: 5, ga: 2, gd: +3, pts: 3 },
  { pos: 3, team: 'UAE',          played: 2, won: 1, draw: 0, lost: 1, gf: 4, ga: 4, gd:  0, pts: 3 },
  { pos: 4, team: 'Singapore',    played: 1, won: 0, draw: 0, lost: 1, gf: 1, ga: 3, gd: -2, pts: 0 },
  { pos: 5, team: 'India',        played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 4, gd: -4, pts: 0 },
],

'Group D WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Jordan',    played: 2, won: 1, draw: 1, lost: 0, gf: 5, ga: 4, gd: +1, pts: 4 },
  { pos: 2, team: 'Indonesia', played: 1, won: 1, draw: 0, lost: 0, gf: 2, ga: 1, gd: +1, pts: 3 },
  { pos: 3, team: 'Myanmar',   played: 1, won: 0, draw: 1, lost: 0, gf: 2, ga: 2, gd:  0, pts: 1 },
  { pos: 4, team: 'Palestine', played: 2, won: 0, draw: 1, lost: 1, gf: 3, ga: 4, gd: -1, pts: 1 },
  { pos: 5, team: 'Australia', played: 2, won: 0, draw: 1, lost: 1, gf: 2, ga: 3, gd: -1, pts: 1 },
],

  'Group E WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Qatar',       played: 2, won: 2, draw: 0, lost: 0, gf: 4, ga: 0, gd: +4, pts: 6 },
  { pos: 2, team: 'Iraq',        played: 2, won: 1, draw: 0, lost: 1, gf: 3, ga: 3, gd:  0, pts: 3 },
  { pos: 3, team: 'Kyrgyzstan',  played: 2, won: 1, draw: 0, lost: 1, gf: 2, ga: 3, gd: -1, pts: 3 },
  { pos: 4, team: 'Nepal',       played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
  { pos: 5, team: 'North Korea', played: 1, won: 0, draw: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
],

'Group F WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'Uzbekistan',  played: 2, won: 1, draw: 1, lost: 0, gf: 2, ga: 1, gd: +1, pts: 4 },
  { pos: 2, team: 'Vietnam',     played: 2, won: 1, draw: 0, lost: 1, gf: 1, ga: 1, gd:  0, pts: 3 },
  { pos: 3, team: 'Lebanon',     played: 1, won: 0, draw: 1, lost: 0, gf: 1, ga: 1, gd:  0, pts: 1 },
  { pos: 4, team: 'Bangladesh',  played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0, gd:  0, pts: 1 },
  { pos: 5, team: 'Saudi Arabia',played: 2, won: 0, draw: 1, lost: 1, gf: 0, ga: 1, gd: -1, pts: 1 },
],
  
  'Group A WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Japan',      played: 4, won: 4, draw: 0, lost: 0, gf:  8, ga: 2,  gd: +6, pts: 12 },
    { pos: 2, team: 'Indonesia',  played: 4, won: 3, draw: 0, lost: 1, gf:  5, ga: 3,  gd: +2, pts:  9 },
    { pos: 3, team: 'China',      played: 4, won: 1, draw: 1, lost: 2, gf:  4, ga: 4,  gd:  0, pts:  4 },
    { pos: 4, team: 'Malaysia',   played: 4, won: 1, draw: 1, lost: 2, gf:  5, ga: 6,  gd: -1, pts:  4 },
    { pos: 5, team: 'Bahrain',    played: 4, won: 0, draw: 0, lost: 4, gf:  2, ga: 9,  gd: -7, pts:  0 },
  ],

  'Group B WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Iran',       played: 4, won: 3, draw: 1, lost: 0, gf:  4, ga: 1,  gd: +3, pts: 10 },
    { pos: 2, team: 'Syria',      played: 4, won: 3, draw: 0, lost: 1, gf:  5, ga: 3,  gd: +2, pts:  9 },
    { pos: 3, team: 'Oman',       played: 4, won: 2, draw: 1, lost: 1, gf:  6, ga: 4,  gd: +2, pts:  7 },
    { pos: 4, team: 'India',      played: 4, won: 0, draw: 1, lost: 3, gf:  3, ga: 6,  gd: -3, pts:  1 },
    { pos: 5, team: 'Kuwait',     played: 4, won: 0, draw: 1, lost: 3, gf:  3, ga: 7,  gd: -4, pts:  1 },
  ],

  'Group C WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'South Korea',played: 4, won: 2, draw: 2, lost: 0, gf:  8, ga: 3,  gd: +5, pts:  8 },
    { pos: 2, team: 'Hong Kong',  played: 4, won: 2, draw: 2, lost: 0, gf:  6, ga: 4,  gd: +2, pts:  8 },
    { pos: 3, team: 'Lebanon',    played: 4, won: 1, draw: 1, lost: 2, gf:  2, ga: 6,  gd: -4, pts:  4 },
    { pos: 4, team: 'New Zealand',played: 4, won: 0, draw: 3, lost: 1, gf:  2, ga: 3,  gd: -1, pts:  3 },
    { pos: 5, team: 'UAE',        played: 4, won: 0, draw: 2, lost: 2, gf:  2, ga: 4,  gd: -2, pts:  2 },
  ],

  'Group D WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Palestine',  played: 4, won: 3, draw: 0, lost: 1, gf:  8, ga: 5,  gd: +3, pts:  9 },
    { pos: 2, team: 'Australia',  played: 4, won: 3, draw: 0, lost: 1, gf:  7, ga: 6,  gd: +1, pts:  9 },
    { pos: 3, team: 'Jordan',     played: 4, won: 1, draw: 2, lost: 1, gf:  5, ga: 3,  gd: +2, pts:  5 },
    { pos: 4, team: 'Vietnam',    played: 4, won: 1, draw: 1, lost: 2, gf:  2, ga: 4,  gd: -2, pts:  4 },
    { pos: 5, team: 'Laos',       played: 4, won: 0, draw: 1, lost: 3, gf:  3, ga: 7,  gd: -4, pts:  1 },
  ],

  'Group E WC Qualifiers Turkey 2024': [
    { pos: 1, team: 'Thailand',   played: 4, won: 2, draw: 1, lost: 1, gf:  2, ga: 1,  gd: +1, pts:  7 },
    { pos: 2, team: 'Qatar',      played: 4, won: 2, draw: 1, lost: 1, gf:  4, ga: 5,  gd: -1, pts:  7 },
    { pos: 3, team: 'Uzbekistan', played: 4, won: 2, draw: 0, lost: 2, gf:  5, ga: 3,  gd: +2, pts:  6 },
    { pos: 4, team: 'Myanmar',    played: 4, won: 1, draw: 1, lost: 2, gf:  4, ga: 4,  gd:  0, pts:  4 },
    { pos: 5, team: 'North Korea',played: 4, won: 1, draw: 1, lost: 2, gf:  3, ga: 5,  gd: -2, pts:  4 },
],
  };

const groupMatchesNCAmerica: Record<string, Match[]> = {
  'Group A WC Qualifiers Argentina 2025': [
    { home: '🇺🇸 United States', score: '0 - 0', away: '🇵🇦 Panama'      },
    { home: '🇲🇽 Mexico',        score: '1 - 2', away: '🇨🇦 Canada'      },
    { home: '🇨🇦 Canada',        score: '0 - 1', away: '🇺🇸 United States'},
    { home: '🇨🇷 Costa Rica',    score: '0 - 0', away: '🇲🇽 Mexico'      },
    { home: '🇺🇸 United States', score: '', away: '🇨🇷 Costa Rica'  },
    { home: '🇵🇦 Panama',        score: '', away: '🇨🇦 Canada'      },
    { home: '🇲🇽 Mexico',        score: '', away: '🇺🇸 United States'},
    { home: '🇨🇷 Costa Rica',    score: '', away: '🇵🇦 Panama'      },
    { home: '🇵🇦 Panama',        score: '', away: '🇲🇽 Mexico'      },
    { home: '🇨🇦 Canada',        score: '', away: '🇨🇷 Costa Rica'  },
  ],
}; 
const groupStandingsNCAmerica: Record<string, Standing[]> = {
  'Group A WC Qualifiers Argentina 2025': [
  { pos: 1, team: 'United States', played: 2, won: 1, draw: 1, lost: 0, gf: 1, ga: 0, gd: +1, pts: 4 },
  { pos: 2, team: 'Canada',        played: 2, won: 1, draw: 0, lost: 1, gf: 2, ga: 2, gd:  0, pts: 3 },
  { pos: 3, team: 'Costa Rica',    played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0, gd:  0, pts: 1 },
  { pos: 4, team: 'Panama',        played: 1, won: 0, draw: 1, lost: 0, gf: 0, ga: 0, gd:  0, pts: 1 },
  { pos: 5, team: 'Mexico',        played: 2, won: 0, draw: 1, lost: 1, gf: 1, ga: 2, gd: -1, pts: 1 },
],
};

const groupMatchesByRegion: Record<Region, Record<string, Match[]>> = {
  Europe:           groupMatchesEurope,
  'South America':  groupMatchesSouthAmerica,
  Africa:           groupMatchesAfrica,
  Asia:             groupMatchesAsia,
  'N/C America':    groupMatchesNCAmerica,
};

const groupStandingsByRegion: Record<Region, Record<string, Standing[]>> = {
  Europe:          groupStandingsEurope,
  'South America': groupStandingsSouthAmerica,
  Africa:          groupStandingsAfrica,
  Asia:            groupStandingsAsia,
  'N/C America':   groupStandingsNCAmerica,   
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
          const rows = standings[fullGroupName] || [];
          return (
            <div key={fullGroupName} className="group-block">
              <div className="matches-block">
                <div className="group-title">{fullGroupName}</div>
                {gm.length === 0 ? (
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
                      {gm.map((m, i) => (
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

              <StandingsTable groupName={fullGroupName} rows={rows} />
            </div>
          );
        })}
      </div>
    </div>
  );
}