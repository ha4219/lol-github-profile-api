import { rankInfo } from '@/types/res';

export function opggCard({
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
  return `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="332"
        height="132"
        className="op-gg-card"
      >
        <foreignObject x={0} y={0} width={332} height={132}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="op-gg-header">
            ${summonerName}
          </div>
          <div xmlns="http://www.w3.org/1999/xhtml" className="op-gg-content">
            <div>
              <img
                className="op-gg-tier-img"
                src={"/assets/${tier.toLowerCase()}.webp"}
                width={72}
                height={72}
                alt="tier-image"
              />
            </div>
            <div className="op-gg-info">
              <div className="tier">${tierRank}</div>
              <div className="lp">${leaguePoints}LP</div>
            </div>
            <div className="op-gg-win-loss-container">
              <div className="win-loss">
                ${wins}W ${losses}L
              </div>
              <div className="ratio">
                Win Rate ${Math.round((wins / (wins + losses)) * 100)}%
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>`;
}

export function opggNullCard() {
  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="332"
    height="132"
    className="op-gg-card"
  >
    <foreignObject x={0} y={0} width={332} height={132}>
      <div xmlns="http://www.w3.org/1999/xhtml" className="op-gg-header">
        Not Found
      </div>
      <div xmlns="http://www.w3.org/1999/xhtml" className="op-gg-content">
        <div>
          <img
            className="op-gg-tier-img"
            src={"/assets/logow.png"}
            width={72}
            height={72}
            alt="tier-image"
          />
        </div>
        <div className="op-gg-info">
          <div className="tier">error</div>
          <div className="lp">error</div>
        </div>
        <div className="op-gg-win-loss-container">
          <div className="win-loss">Error</div>
          <div className="ratio">Error</div>
        </div>
      </div>
    </foreignObject>
  </svg>`;
}
