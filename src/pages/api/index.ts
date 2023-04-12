// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getSvg from '../utils/maker';
import { rankInfo, summoner } from '@/types/res';

type Data = {
  name: string;
};

const API_KEY = process.env.RIOT_API_KEY as string;
const API_URL = process.env.RIOT_API_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
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

  console.log(userInfo);

  const svg = getSvg(userInfo[0].summonerName, userInfo[0].tier);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
  );
  return res.end(svg);
}
