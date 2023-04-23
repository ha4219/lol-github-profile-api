import { rankInfo } from '@/types/res';
import { getTierImg } from '../imgLoader';
import styled from '@emotion/styled';

const Container = styled.g`
  font-family: Roboto, sans-serif;

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

  .item {
    opacity: 0;
    animation: delayFadeIn 1s ease-in-out forwards;
  }

  & rect {
    fill: #31313c;
  }

  & text {
    fill: #ffffff;
  }

  & line {
    stroke: #1c1c1f;
  }

  & circle {
    fill: #282830;
  }

  & .name {
    font-size: 14px;
    animation: fadeIn 0.8s ease-in-out forwards;
  }

  & .group {
    & .tier {
      font-size: 20px;
      font-weight: bold;
      text-transform: capitalize;
    }

    & .lp {
      fill: #7b7a8e;
      font-size: 12px;
    }

    & .win-loss {
      text-align: right;
      fill: #7b7a8e;
      font-size: 12px;
    }
    & .ratio {
      text-align: right;
      fill: #7b7a8e;
      font-size: 12px;
    }
  }
`;

export function OpggCard({
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

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="332"
      height="132"
      viewBox="0 0 332 132"
    >
      <Container>
        <rect x1={0} y1={0} width={332} height={132} rx={5} ry={5} />

        <text x={12} y={26} className="name">
          {summonerName}
        </text>
        <line x1={0} x2={332} y1={40} y2={40} />
        <circle cx={48} cy={81} r={36} />
        <image href={imgSrc} width={72} height={72} x={12} y={45} />
        <g className="group">
          <text x={100} y={80} className="tier item">
            {tierRank}
          </text>
          <text x={100} y={100} className="lp item">
            {leaguePoints}LP
          </text>
          <text x={320} y={80} textAnchor="end" className="win-loss item">
            {wins}W {losses}L
          </text>
          <text x={320} y={100} textAnchor="end" className="ratio item">
            Win Rate {Math.round((wins / (wins + losses)) * 100)}%
          </text>
        </g>
      </Container>
    </svg>
  );
}

export function OpggNullCard() {
  const imgSrc = getTierImg(null);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="332"
      height="132"
      viewBox="0 0 332 132"
    >
      <Container>
        <rect x1={0} y1={0} width={332} height={132} rx={5} ry={5} />

        <text x={12} y={26}>
          Not Found
        </text>
        <line x1={0} x2={332} y1={40} y2={40} />
        <circle cx={48} cy={81} r={36} />
        <image href={imgSrc} width={72} height={72} x={12} y={45} />
        <g className="group">
          <text x={100} y={75} className="tier">
            Error
          </text>
          <text x={100} y={100} className="lp">
            Error
          </text>
          <text x={248} y={75} className="win-loss">
            Error
          </text>
          <text x={248} y={100} className="ratio">
            Error
          </text>
        </g>
      </Container>
    </svg>
  );
}
