// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { QueueType, rankInfo, summoner } from '@/types/res';
import { SovledDotAcCard, SovledDotAcNullCard } from '@/utils/card/solvedDotAc';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@emotion/server';

type Data = {
  name: string;
};

const tft: QueueType = 'RANKED_TFT';
const API_KEY = process.env.RIOT_API_KEY as string;
const API_URL = process.env.RIOT_API_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const nullCard = renderStylesToString(renderToString(SovledDotAcNullCard()));
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
  const userInfo: rankInfo[] = await fetch(
    queueType !== tft
      ? `${API_URL}/lol/league/v4/entries/by-summoner/${so.id}`
      : `${API_URL}/tft/league/v1/entries/by-summoner/${so.id}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());

  const user = userInfo.find((item) => item.queueType === queueType);
  // renderToString(opggCard({ ...userInfo[0] }));

  const card = user
    ? renderStylesToString(renderToString(SovledDotAcCard({ ...user })))
    : nullCard;
  return res.end(card);
}
