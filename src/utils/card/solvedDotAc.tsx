import { rankInfo } from '@/types/res';
import styled from '@emotion/styled';

const BACKGROUND_COLOR = {
  Unknown: ['#AAAAAA', '#666666', '#000000'],
  Unrated: ['#666666', '#2D2D2D', '#040202'],
  BRONZE: ['#F49347', '#984400', '#492000'],
  SILVER: ['#939195', '#6B7E91', '#1F354A'],
  GOLD: ['#FFC944', '#FFAF44', '#FF9632'],
  PLATINUM: ['#8CC584', '#45B2D3', '#51A795'],
  DIAMOND: ['#96B8DC', '#3EA5DB', '#4D6399'],
  MASTER: ['#EA8DF6', '#B173DE', '#A482FA'],
  GRANDMASTER: ['#C45118', '#DB320F', '#D1110F'],
  CHALLENGER: ['#02B884', '#0A77AA', '#091BB8'],
};

const Container = styled.g`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
  @keyframes delayFadeIn {
    0% {
      opacity: 0;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
    100% {
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
`;

export function SovledDotAcCard({
  summonerName,
  rank,
  tier,
  wins,
  losses,
  leaguePoints,
}: rankInfo) {
  const over = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier);
  const tierRank = over ? tier.toLowerCase() : `${tier.toLowerCase()} ${rank}`;

  const bgMap = new Map(Object.entries(BACKGROUND_COLOR));
  const bg: string[] = bgMap.get(tier)
    ? (bgMap.get(tier) as string[])
    : BACKGROUND_COLOR.Unknown;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="350"
      height="170"
      className="op-gg-card"
    >
      <Container>
        <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
            <stop offset="10%" stopColor={bg[0]} />
            <stop offset="55%" stopColor={bg[1]} />
            <stop offset="100%" stopColor={bg[2]} />
          </linearGradient>
        </defs>
        <rect
          xmlns="http://www.w3.org/2000/svg"
          width="350"
          height="170"
          rx="10"
          ry="10"
          className="background"
        />
        <text
          xmlns="http://www.w3.org/2000/svg"
          x="315"
          y="50"
          className="tier-text"
          textAnchor="end"
        >
          {tierRank}
        </text>
        <text
          xmlns="http://www.w3.org/2000/svg"
          x="35"
          y="50"
          className="boj-handle"
        >
          {summonerName}
        </text>
        <g
          xmlns="http://www.w3.org/2000/svg"
          className="item"
          style={{ animationDelay: '200ms' }}
        >
          <text x="35" y="79" className="subtitle">
            rate
          </text>
          <text x="145" y="79" className="rate value">
            {Math.round((wins / (wins + losses)) * 100)}%
          </text>
        </g>
        <g
          xmlns="http://www.w3.org/2000/svg"
          className="item"
          style={{ animationDelay: '400ms' }}
        >
          <text x="35" y="99" className="subtitle">
            wins
          </text>
          <text x="145" y="99" className="solved value">
            {wins}
          </text>
        </g>
        <g
          xmlns="http://www.w3.org/2000/svg"
          className="item"
          style={{ animationDelay: '600ms' }}
        >
          <text x="35" y="119" className="subtitle">
            losses
          </text>
          <text x="145" y="119" className="class value">
            {losses}
          </text>
        </g>
        <g
          xmlns="http://www.w3.org/2000/svg"
          // className="rate-bar"
          style={{ animationDelay: '800ms' }}
        >
          <line
            x1="35"
            y1="142"
            x2={over ? 290 : 35 + (leaguePoints / 100) * 255}
            y2="142"
            strokeWidth="4"
            stroke="floralwhite"
            strokeLinecap="round"
          />
        </g>
        <line
          xmlns="http://www.w3.org/2000/svg"
          x1="35"
          y1="142"
          x2="290"
          y2="142"
          strokeWidth="4"
          strokeOpacity="40%"
          stroke="floralwhite"
          strokeLinecap="round"
        />
        <text
          xmlns="http://www.w3.org/2000/svg"
          x="297"
          y="142"
          alignmentBaseline="middle"
          className="percentage"
        >
          {over ? `${leaguePoints}LP` : `${leaguePoints}%`}
        </text>
        {!over && (
          <text
            xmlns="http://www.w3.org/2000/svg"
            x="293"
            y="157"
            className="progress"
            textAnchor="end"
          >
            {`${leaguePoints}/100`}
          </text>
        )}
      </Container>
    </svg>
  );
}
