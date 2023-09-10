import React, { useEffect, useState } from "react";
import { PortalLayout } from "~/components/PortalLayout";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

const Settings = () => {
  const { data: riotIdData } = api.riotAccount.get.useQuery();

  const onMutateSuccess = () => {
    setEdited(false);
    toast.dismiss();
    toast.success("Changes saved successfully!");
    void ctx.riotAccount.get.invalidate();
  };

  const { mutate: createMutate } = api.riotAccount.set.useMutation({
    onSuccess: onMutateSuccess,
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  const { mutate: updateMutate } = api.riotAccount.update.useMutation({
    onSuccess: onMutateSuccess,
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  const [riotId, setRiotId] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [riotIdVal, setRiotIdVal] = useState<string>("");
  const [taglineVal, setTaglineVal] = useState<string>("");
  const [edited, setEdited] = useState<boolean>(false);

  const ctx = api.useContext();

  useEffect(() => {
    if (riotIdData) {
      setRiotId(riotIdData.riot_id || "");
      setRiotIdVal(riotIdData.riot_id || "");
      setTagline(riotIdData.tagline || "");
      setTaglineVal(riotIdData.tagline || "");
    }
  }, [riotIdData]);

  const reset = () => {
    setRiotIdVal(riotId);
    setTaglineVal(tagline);
    setEdited(false);
  };
  return (
    <PortalLayout>
      <div className="col-span-3 flex flex-col px-2">
        <div className="mb-12 mt-4">
          <h1 className="text-6xl font-bold">Settings</h1>
        </div>
        <div>
          <h1 className="text-4xl">Riot Id</h1>
          <div className="mt-1 text-xs">This is your Riot Id and Tagline</div>
          <div className="divider" />
          <div className="flex gap-4">
            <div>
              <label htmlFor="riotId" className="label">
                <span className="label-text">Riot Id</span>
              </label>
              <input
                id="riotId"
                className="input input-bordered"
                onChange={(e) => {
                  setRiotIdVal(e.target.value);
                  setEdited(true);
                }}
                value={riotIdVal}
              />
            </div>
            <div>
              <label htmlFor="tagline" className="label">
                <span className="label-text">Tagline</span>
              </label>
              <input
                id="tagline"
                className="input input-bordered"
                onChange={(e) => {
                  setTaglineVal(e.target.value);
                  setEdited(true);
                }}
                value={taglineVal}
              />
            </div>
          </div>
        </div>
        {edited && (
          <div className="alert fixed bottom-4 right-2 mx-auto w-9/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-info"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>You have unsaved changes.</span>
            <div>
              <button
                className="btn btn-sm"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  console.log("tagline", taglineVal);
                  console.log("riotId", riotIdVal);
                  if (!/^\d+$/.test(taglineVal)) {
                    toast.error(
                      "Your tagline should only consist of 4 numbers.",
                    );
                  } else if (riotId) {
                    updateMutate({ riotId: riotIdVal, tagline: taglineVal });
                  } else {
                    createMutate({ riotId: riotIdVal, tagline: taglineVal });
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default Settings;
