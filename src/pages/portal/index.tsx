import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
    api.riotId.get.useQuery();
  return (
    <>
      {riotIdData ? (
        <>Success</>
      ) : (
        <div className="flex flex-col col-span-3 px-2">
        <div className="mt-4 mb-12">
          <h1 className="text-6xl font-bold">Individual Stats</h1>
        </div>
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
        </div>
      )}
    </>
  );
};

export default IndividualStats;
