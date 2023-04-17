import { DEFAULT, TIER } from '@/contants';

const HOMEPAGE_URL = `https://lol-github-profile-api.vercel.app`;

export const getTierImg = ({ tier }: { tier: string | null }) =>
  tier && (<any>Object).values(TIER).includes(tier)
    ? `${HOMEPAGE_URL}/assets/${tier.toLowerCase()}.webp`
    : `${HOMEPAGE_URL}/assets/logow.png`;
