// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { rankInfo, summoner } from '@/types/res';
import { OpggCard, OpggNullCard } from '@/utils/card/opgg';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@emotion/server';
import { opggCard } from '@/utils/card/opgg-copy';

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
  // renderToString(opggCard({ ...userInfo[0] }));

  const card = userInfo?.length
    ? renderStylesToString(renderToString(OpggCard({ ...userInfo[0] })))
    : nullCard;
  return res.end(card);
}
