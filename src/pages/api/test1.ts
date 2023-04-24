// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SummaryBox } from '@/utils/card/opgg';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@emotion/server';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, max-age=3600',
  );
  const d = renderStylesToString(renderToString(SummaryBox()));
  return res.end(d);
}
