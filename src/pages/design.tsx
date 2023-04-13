import { rankInfo, summoner } from '@/types/res';

export default function DesignPage({ userInfo }: { userInfo: rankInfo[] }) {
  if (userInfo.length) {
    const { summonerName, rank, tier, leaguePoints, wins, losses } =
      userInfo[0];
    const tierRank = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier)
      ? tier.toLowerCase()
      : `${tier.toLowerCase()} ${rank}`;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="332"
        height="132"
        className="op-gg-card"
      >
        <foreignObject x={0} y={0} width={332} height={132}>
          <div className="op-gg-header">{summonerName}</div>
          <div className="op-gg-content">
            <div>
              <img
                className="op-gg-tier-img"
                src={`/assets/${tier.toLowerCase()}.webp`}
                width={72}
                height={72}
                alt="tier-image"
              />
            </div>
            <div className="op-gg-info">
              <div className="tier">{tierRank}</div>
              <div className="lp">{leaguePoints}LP</div>
            </div>
            <div className="op-gg-win-loss-container">
              <div className="win-loss">
                {wins}W {losses}L
              </div>
              <div className="ratio">
                Win Rate {Math.round((wins / (wins + losses)) * 100)}%
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="332"
        height="132"
        className="op-gg-card"
      >
        <foreignObject x={0} y={0} width={332} height={132}>
          <div className="op-gg-header">Not Found</div>
          <div className="op-gg-content">
            <div>
              <img
                className="op-gg-tier-img"
                src={`/assets/logow.png`}
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
      </svg>
    );
  }
}

export async function getServerSideProps() {
  const API_KEY = process.env.RIOT_API_KEY as string;
  const API_URL = process.env.RIOT_API_URL as string;

  const so: summoner = await fetch(
    `${API_URL}/summoner/v4/summoners/by-name/hide on bush`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());
  const userInfo: rankInfo[] = await fetch(
    `${API_URL}/league/v4/entries/by-summoner/${so.id}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());

  return {
    props: {
      userInfo,
    },
  };
}
