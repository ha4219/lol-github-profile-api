import { rankInfo, summoner } from '@/types/res';
import { opggCard, opggNullCard } from '@/utils/card/opgg';

export default function DesignPage({ userInfo }: { userInfo: rankInfo[] }) {
  console.log(userInfo);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: userInfo.length ? opggCard(userInfo[0]) : opggNullCard(),
        }}
      />
    </>
  );
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
