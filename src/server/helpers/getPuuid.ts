import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";

type AxiosData = {
  puuid: string
}

export const getPuuid = async (riotId: string, tagline: string): Promise<string> => {
  const config = {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Riot-Token": env.RIOT_API_KEY,
    },
  };
  console.log("config", config)
  const response: AxiosResponse<AxiosData> = await axios.get(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagline}`,
    config,
  )
  return response.data.puuid;
};
