export interface summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export type QueueType = 'RANKED_FLEX_SR' | 'RANKED_SOLO_5x5' | 'RANKED_TFT';

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

export type MatchData = string[];
export type MatchDetail = {};
