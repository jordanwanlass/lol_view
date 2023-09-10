import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";

export const getMatchIds = async (puuid: string | null | undefined, count: number): Promise<[]> => {
  let ids: [] = []
  if (puuid) {
    const config = {
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": env.RIOT_API_KEY,
      },
    };
    
    const response: AxiosResponse<[]> = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`,
      config,
    )

    ids = response.data
  }
  return ids;
};
