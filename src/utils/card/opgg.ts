import { rankInfo } from '@/types/res';
import { getBronzeImg } from '../imgLoader';

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
        class="op-gg-card"
      >
        <style>
          <![CDATA[
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap');
            .op-gg-header {
              font-family: 'Roboto100', sans-serif;
              font-size: 14px;
              padding: 0 12px;
              line-height: 35px;
            }
            .op-gg-card {
              margin-top: 8px;
              border-radius: 4px;
              background-color: #31313c;
              color: white;
            }
            .op-gg-content {
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              padding: 12px;
              border-top-width: 1px;
              border-top-style: solid;
              border-color: #1c1c1f;
            }
            .op-gg-tier-img {
              background-color: #282830;
              border-radius: 50%;
              vertical-align: middle;
            }
            .op-gg-info {
              flex: 1 1 0%;
              position: relative;
              margin-left: 16px;
            }
            .op-gg-info > .tier {
              line-height: 26px;
              font-size: 20px;
              font-weight: bold;
              text-transform: capitalize;
              color: #ffffff;
              font-family: Roboto, sans-serif;
            }
            .op-gg-info > .lp {
              line-height: 16px;
              margin-top: 2px;
              font-size: 12px;
              color: #9e9eb1;
              font-family: Roboto, sans-serif;
            }
            .op-gg-win-loss-container {
              font-size: 12px;
              text-align: right;
              color: #7b7a8e;
            }
            .op-gg-win-loss-container > .win-lose {
              line-height: 26px;
            }
            .op-gg-win-loss-container > .ratio {
              margin-top: 2px;
              line-height: 16px;
            }
          ]]>
        </style>
        <foreignObject x="0" y="0" width="332" height="132">
          <div xmlns="http://www.w3.org/1999/xhtml" class="op-gg-header">
            ${summonerName}
          </div>
          <div xmlns="http://www.w3.org/1999/xhtml" class="op-gg-content">
            <div>
              <img
                class="op-gg-tier-img"
                src="${getBronzeImg()}"
                width="72"
                height="72"
                alt="tier-image"
              />
            </div>
            <div class="op-gg-info">
              <div class="tier">${tierRank}</div>
              <div class="lp">${leaguePoints}LP</div>
            </div>
            <div class="op-gg-win-loss-container">
              <div class="win-loss">
                ${wins}W ${losses}L
              </div>
              <div class="ratio">
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
    class="op-gg-card"
  >
    <foreignObject x="0" y="0" width="332" height="132">
      <div xmlns="http://www.w3.org/1999/xhtml" class="op-gg-header">
        Not Found
      </div>
      <div xmlns="http://www.w3.org/1999/xhtml" class="op-gg-content">
        <div>
          <img
            class="op-gg-tier-img"
            src="${''}"
            width="72"
            height="72"
            alt="tier-image"
          />
        </div>
        <div class="op-gg-info">
          <div class="tier">error</div>
          <div class="lp">error</div>
        </div>
        <div class="op-gg-win-loss-container">
          <div class="win-loss">Error</div>
          <div class="ratio">Error</div>
        </div>
      </div>
    </foreignObject>
  </svg>`;
}
