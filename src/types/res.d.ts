export interface summoner {
  id: string;
  accountId: string;
  pudid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export type QueueType = 'RANKED_FLEX_SR' | 'RANKED_SOLO_5x5';

export interface rankInfo {
  leagueId: string;
  queueType: QueueType;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}
