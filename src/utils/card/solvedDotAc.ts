import { rankInfo } from '@/types/res';
import { getTierImg } from '../imgLoader';

const BACKGROUND_COLOR = {
  Unknown: ['#AAAAAA', '#666666', '#000000'],
  Unrated: ['#666666', '#2D2D2D', '#040202'],
  BRONZE: ['#F49347', '#984400', '#492000'],
  SILVER: ['#939195', '#6B7E91', '#1F354A'],
  GOLD: ['#FFC944', '#FFAF44', '#FF9632'],
  PLATINUM: ['#8CC584', '#45B2D3', '#51A795'],
  DIAMOND: ['#96B8DC', '#3EA5DB', '#4D6399'],
  Ruby: ['#E45B62', '#E14476', '#CA0059'],
  MASTER: ['#83f8fe', '#b297fc', '#fc7ea8'],
};

export function sovledDotAcCard({
  summonerName,
  rank,
  tier,
  wins,
  losses,
  leaguePoints,
}: rankInfo) {
  const tierRank = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier)
    ? tier.toLowerCase()
    : `${tier.toLowerCase()} ${rank}`;

  const imgSrc = getTierImg(tier);
  const bgMap = new Map(Object.entries(BACKGROUND_COLOR));
  const bg: string[] = bgMap.get(tier)
    ? (bgMap.get(tier) as string[])
    : BACKGROUND_COLOR.Unknown;

  return `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="170"
        class="op-gg-card"
      >
        <style type="text/css">
          <![CDATA[
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
            @keyframes delayFadeIn {
                0%{
                    opacity:0
                }
                60%{
                    opacity:0
                }
                100%{
                    opacity:1
                }
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes rateBarAnimation {
                0% {
                    stroke-dashoffset: 108.94999999999999;
                }
                70% {
                    stroke-dashoffset: 108.94999999999999;
                }
                100%{
                    stroke-dashoffset: 35;
                }
            }
            .background {
                fill: url(#grad);
            }
            text {
                fill: white;
                font-family: 'Noto Sans KR', sans-serif;
            }
            text.boj-handle {
                font-weight: 700;
                font-size: 1.45em;
                animation: fadeIn 0.8s ease-in-out forwards;
            }
            text.tier-text {
                font-weight: 700;
                font-size: 1.45em;
                opacity: 55%;
            }
            text.tier-number {
                font-size: 3.1em;
                font-weight: 700;
            }
            .subtitle {
                font-weight: 500;
                font-size: 0.9em;
            }
            .value {
                font-weight: 400;
                font-size: 0.9em;
            }
            .percentage {
                font-weight: 300;
                font-size: 0.8em;
            }
            .progress {
                font-size: 0.7em;
            }
            .item {
                opacity: 0;
                animation: delayFadeIn 1s ease-in-out forwards;
            }
            .rate-bar {
                stroke-dasharray: 108.94999999999999;
                stroke-dashoffset: 108.94999999999999;
                animation: rateBarAnimation 1.5s forwards ease-in-out;
            }
            .solvedac-container {
              padding: 2rem;

            }
          ]]>
        </style>
        <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
              <stop offset="10%" style="stop-color:${bg[0]};stop-opacity:1"/>
              <stop offset="55%" style="stop-color:${bg[1]};stop-opacity:1"/>
              <stop offset="100%" style="stop-color:${bg[2]};stop-opacity:1"/>
          </linearGradient>
        </defs>
        <rect xmlns="http://www.w3.org/2000/svg" width="350" height="170" rx="10" ry="10" class="background"/>
        <foreignObject x="0" y="0" width="350" height="170" class="solvedac-container">
          <text class="boj-handle">
            ${summonerName}
          </text>
          <text class="tier-text">${tierRank}</text>
        </foreignObject>
      </svg>`;
}
