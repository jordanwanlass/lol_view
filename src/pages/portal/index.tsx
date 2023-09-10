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

  const { data: matchIds, isLoading: matchIdsLoading } = api.match.get.useQuery(
    { count: 20 },
  );
  console.log(matchIds);
  return (
    <div className="col-span-3 flex flex-col px-2">
      <div className="mb-12 mt-4">
        <h1 className="text-6xl font-bold">Individual Stats</h1>
      </div>
      {riotIdLoading ? (
        <></>
      ) : riotIdData ? (
        <>
          {matchIds?.map((id) => {
            return <div key={id}>{id}</div>;
          })}
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
