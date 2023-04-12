import { rankInfo, summoner } from '@/types/res';

export default function DesignPage({
  userInfo,
  so,
}: {
  userInfo: rankInfo[];
  so: summoner;
}) {
  const name = userInfo[0].summonerName;
  const rank = userInfo[0].rank;
  const tier = userInfo[0].tier;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 120"
        width="240"
        height="120"
      >
        <text x={10} y={20}>
          {name}
        </text>
        <line x1={0} x2={240} y1={30} y2={30} stroke="gray" />
        <image
          href="https://opgg-static.akamaized.net/images/medals_new/challenger.png?image=q_auto,f_webp,w_144&v=1681307259203"
          width={72}
          height={72}
          y={20}
        />
      </svg>
    </>
  );
}

export async function getServerSideProps() {
  const API_KEY = process.env.RIOT_API_KEY as string;
  const API_URL = process.env.RIOT_API_URL as string;

  const so: summoner = await fetch(
    `${API_URL}/summoner/v4/summoners/by-name/괴물쥐`,
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
      so,
      userInfo,
    },
  };
}
