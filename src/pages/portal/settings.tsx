import React, { useState } from "react";
import { PortalLayout } from "~/components/PortalLayout";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {

  const [riotId, setRiotId] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [riotIdVal, setRiotIdVal] = useState<string>(riotId);
  const [taglineVal, setTaglineVal] = useState<string>(tagline);
  const [edited, setEdited] = useState<boolean>(false);

  const ctx = api.useContext();
  const { mutate, isLoading } = api.riotId.set.useMutation({
    onSuccess: () => {
      toast.success("Changes saved successfully!")
      void ctx.riotId.get.invalidate();
    },
  });

  const changesToast = () =>
    toast(
      <div className="flex gap-6 items-center justify-between">
        <span className="whitespace-nowrap">You have unsaved changes!</span>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => {
              setEdited(false);
              reset();
            }}
          >
            Reset
          </button>
          <button className="btn btn-primary btn-sm">Save</button>
        </div>
      </div>,
      { position: "bottom-center", id: 'changes', duration: Infinity, style: {maxWidth: "100%"} },
    );
    const reset = () => {
      setRiotIdVal(riotId);
      setTaglineVal(tagline);
      toast.remove()
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
              <label className="label">
                <span className="label-text">Riot Id</span>
              </label>
              <input
                className="input input-bordered"
                onChange={(e) => {
                  changesToast()
                  setRiotIdVal(e.target.value);
                }}
                value={riotIdVal}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Tagline</span>
              </label>
              <input
                className="input input-bordered"
                onChange={(e) => {
                  changesToast()
                  setTaglineVal(e.target.value);
                }}
                value={taglineVal}
                maxLength={4}
              />
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Settings;
