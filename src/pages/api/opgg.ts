// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { rankInfo, summoner } from '@/types/res';
import { opggCard, opggNullCard } from '@/utils/card/opgg';

type Data = {
  name: string;
};

const API_KEY = process.env.RIOT_API_KEY as string;
const API_URL = process.env.RIOT_API_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const nullCard = opggNullCard();
  const { name } = req.query;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, max-age=3600',
  );

  if (!name) return res.end(nullCard);

  const so: summoner = await fetch(
    `${API_URL}/summoner/v4/summoners/by-name/${name}`,
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

  const card = userInfo.length ? opggCard({ ...userInfo[0] }) : nullCard;
  return res.end(card);
}
