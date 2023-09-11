import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";

type AxiosData = {
  info: MatchInfo;
};

type MatchInfo = {
  gameId: number;
  gameCreation: number;
  participants: Participants[];
};

type Participants = {
  puuid: string,
  kills: number,
  deaths: number,
  assists: number,
  firstBloodKill: boolean,
  firstTowerKill: boolean,
  championName: string,
  goldEarnerd: number,
  magicDamageDealtToChampions: number,
  physicalDamageDealtToChampinos: number,
  visionScore: number,
  win: boolean,
};

export const getMatch = async (id: string | null | undefined) => {
  const config = {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Riot-Token": env.RIOT_API_KEY,
    },
  };

  const response: AxiosResponse<AxiosData> = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
    config,
  );
  return response
};
