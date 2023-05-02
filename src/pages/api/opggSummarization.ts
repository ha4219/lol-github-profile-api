// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MatchData,
  OpggSummarization1Type,
  OpggSummarizationType,
  QueueType,
  rankInfo,
  summoner,
} from '@/types/res';
import { OpggNullCard } from '@/utils/card/opgg';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@emotion/server';
import { OpggSummarizatoinCard } from '@/utils/card/opggSummarizaion';

type Data = {
  name: string;
};

const API_KEY = process.env.RIOT_API_KEY as string;
const API_URL = process.env.RIOT_API_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const nullCard = renderStylesToString(renderToString(OpggNullCard()));
  const { name } = req.query;
  const queueType: QueueType =
    (req.query.queueType as QueueType) ?? ('RANKED_SOLO_5x5' as QueueType);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, max-age=3600',
  );

  if (!name) return res.end(nullCard);

  const so: summoner = await fetch(
    `${API_URL}/lol/summoner/v4/summoners/by-name/${name}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());
  const matchInfo: MatchData = await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${so.puuid}/ids?start=0&count=20`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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

  const v = items.reduce(
    (acc, cur) => {
      const prev = { ...acc };
      cur.win ? (prev.wins += 1) : (prev.losses += 1);
      prev.kills += cur.kills;
      prev.deaths += cur.deaths;
      prev.assists += cur.assists;
      const idx = (): number => {
        switch (cur.position) {
          case 'TOP':
            return 0;
          case 'JUNGLE':
            return 1;
          case 'MIDDLE':
            return 2;
          case 'BOT':
            return 3;
          case 'UTILITY':
            return 4;
        }
        return 5;
      };
      prev.roles[idx()] += 1;

      const key = prev.champions.get(cur.champion);
      const champ = key ?? {
        name: cur.champion,
        wins: 0,
        losses: 0,
        kills: 0,
        assits: 0,
        deaths: 0,
      };

      cur.win ? (champ.wins += 1) : (champ.losses += 1);
      champ.kills += cur.kills;
      champ.deaths += cur.deaths;
      champ.assits += cur.assists;
      prev.champions.set(cur.champion, champ);
      return prev;
    },
    {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      roles: [0, 0, 0, 0, 0, 0],
      champions: new Map(),
    } as OpggSummarizationType,
  );

  const sortedChamps = [...v.champions.values()].sort((l, r) =>
    l.wins + l.losses === r.wins + r.losses
      ? 0
      : l.wins + l.losses < r.wins + r.losses
      ? 1
      : -1,
  );

  const item: OpggSummarization1Type = {
    ...v,
    champions: sortedChamps,
  };
  const card = item
    ? renderStylesToString(renderToString(OpggSummarizatoinCard({ ...item })))
    : nullCard;

  return res.end(card);
}
