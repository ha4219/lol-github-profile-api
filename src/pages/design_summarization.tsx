import SEO from '@/components/SEO';
import SearchForm from '@/components/SearchForm';
import { MatchData, rankInfo, summoner } from '@/types/res';
import cards from '@/utils/card/cards';
import { renderStylesToString } from '@emotion/server';
import { useRouter } from 'next/router';
import { renderToString } from 'react-dom/server';
import type { QueueType } from '@/types/res';

export default function DesignPage() {
  const router = useRouter();
  // const queueType = router.query.queueType ?? ('RANKED_SOLO_5x5' as QueueType);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    if (!target.search.value) return;
    router.push({
      pathname: `/design`,
      query: { search: target.search.value },
    });
  };

  // const user = userInfo.find((item) => item.queueType === queueType);

  return (
    <>
      <SEO />
      <SearchForm handleSubmit={handleSubmit} />
      {/* {cards.map(({ Main, Null }) => (
        <div
          key={Main.name}
          dangerouslySetInnerHTML={{
            __html: renderStylesToString(
              renderToString(user ? <Main {...user} /> : <Null />),
            ),
          }}
        />
      ))} */}
    </>
  );
}

export async function getServerSideProps(context: {
  query: { search: string };
}) {
  const { search } = context.query;
  const API_KEY = process.env.RIOT_API_KEY as string;
  const API_URL = process.env.RIOT_API_URL as string;

  const so: summoner = await fetch(
    `${API_URL}/lol/summoner/v4/summoners/by-name/${search}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());
  const matchInfo: MatchData = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${so.puuid}/ids?start=0&count=10`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    console.log(matchInfo);
    // const r = await Promise.all(
    //   matchInfo.map(async (matchId: string) => {
    //     await sleep(100);
    //     return fetch(
    //       `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    //       {
    //         headers: {
    //           'X-Riot-Token': API_KEY,
    //         },
    //       },
    //     )
    //       .then((res) => res.json())
    //       .then((item) =>
    //         item.info?.participants.find((i: any) => i.puuid === so.puuid),
    //       );
    //   }),
    // ).catch(console.log);
    const getSerial = async (matchInfo: string[]) => {
      let res = [];
      for (let i = 0; i < matchInfo.length; i++) {
        await sleep(100);
        const r = await fetch(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${matchInfo[i]}`,
          {
            headers: {
              'X-Riot-Token': API_KEY,
            },
          },
        )
          .then((res) => res.json())
          .then((item) =>
            item.info?.participants.find((i: any) => i.puuid === so.puuid),
          );
        r && res.push(r);
      }
      return res;
    };
    const r = await getSerial(matchInfo);
    const items = r.map((item) => ({
      win: item.win,
      champion: item.championName,
      kills: item.kills,
      deaths: item.deaths,
      assists: item.assists,
      position: item.individualPosition,
    }));
    console.log(items);
    console.log(items.reduce((acc, cur) => acc + cur.kills, 0));
  } catch (e) {
    console.log('eee', e);
  }

  // const l = res.info.participants
  //   .filter((item) => item.puuid === so.puuid)
  //   .map((item) => ({
  //     win: item.win,
  //     champion: item.championName,
  //     kills: item.kills,
  //     deaths: item.deaths,
  //     assists: item.assists,
  //   }));
  return {
    props: {
      matchInfo,
    },
  };
}
