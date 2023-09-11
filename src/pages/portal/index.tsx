import { type NextPage } from "next";
import { PortalLayout } from "~/components/PortalLayout";
import { api } from "~/utils/api";

const IndividualStats: NextPage = () => {
  return (
    <PortalLayout>
      <Content />
    </PortalLayout>
  );
};
const Content = () => {
  const { data: riotIdData, isLoading: riotIdLoading } =
    api.riotAccount.get.useQuery();

  const { data: matches, isLoading: matchesLoading } = api.match.get.useQuery({
    count: 20,
  });

  const { data: mostPlayedChamp } = api.match.getMostPlayedChamp.useQuery();

  if (riotIdLoading || matchesLoading) {
    return <></>;
  }

  const winCount = matches?.filter((match) => match.win).length;
  const lossCount = 20 - (winCount ?? 0);
  const champPlayCountMap = new Map<string, number>();
  let avgKda = BigInt(0);
  matches?.map((match) => {
    champPlayCountMap.set(
      match.championName,
      champPlayCountMap.get(match.championName) ?? 1,
    );
    let kda = match.kills + match.assists;
    if (match.deaths !== BigInt(0)) {
      kda = kda / match.deaths;
    }
    console.log(kda);
    avgKda = avgKda + BigInt(kda);
  });
  avgKda = avgKda / BigInt(20);

  return (
    <div className="col-span-3 flex flex-col px-2">
      <div className="mb-12 mt-4">
        <h1 className="text-6xl font-bold">Individual Stats</h1>
      </div>
      {riotIdLoading ? (
        <></>
      ) : riotIdData ? (
        <>
          <div className="stats stats-vertical shadow lg:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Last 20 Win %</div>
              <div className="stat-value">
                {matches
                  ? `${Math.floor(
                      (matches?.filter((match) => match.win).length / 20) * 100,
                    )}%`
                  : "N/A"}
              </div>
              <div className="stat-desc">{`${winCount}W - ${lossCount}L`}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Last 20 Most Played Champion</div>
              <div className="stat-value">
                {mostPlayedChamp?.at(0)?.championName}
              </div>
              <div className="stat-desc">
                {mostPlayedChamp?.at(0)?._count.championName} games played
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Last 20 Avg. KDA</div>
              <div className="stat-value">{avgKda.toString()}</div>
            </div>
          </div>
          <div className="overflow-x-auto my-10">
            <table className="table">
              <thead>
                <tr>
                  <td></td>
                  <td>Champion</td>
                  <td>KDA</td>
                  <td>Total gold Earned</td>
                  <td>Vision Score</td>
                </tr>
              </thead>
              <tbody>
                {matches?.map((match, idx) => (
                  <tr key={match.id}>
                    <td>{idx + 1}</td>
                    <td>{match.championName}</td>
                    <td>{match.kills.toString()}/{match.deaths.toString()}/{match.assists.toString()}</td>
                    <td>{match.goldEarned.toString()}</td>
                    <td>{match.visionScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            To see individual stats, you need to set your Riot Id in your
            settings.
          </span>
        </div>
      )}
    </div>
  );
};

export default IndividualStats;
