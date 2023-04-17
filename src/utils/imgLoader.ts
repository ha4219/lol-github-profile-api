import { DEFAULT, TIER } from '@/contants';

const HOMEPAGE_URL = process.env.HOMEPAGE_URL;

export const getTierImg = ({ tier }: { tier: string | null }) => {
  return tier && (<any>Object).values(TIER).includes(tier)
    ? `${HOMEPAGE_URL}/assets/${tier.toLowerCase()}.webp`
    : `${HOMEPAGE_URL}/assets/logow.png`;
};
