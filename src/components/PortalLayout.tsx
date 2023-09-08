import React from "react";
import { Sidebar } from "./Sidebar";
import PortalHeader from "./PortalHeader";
import { Toaster } from "react-hot-toast";

export const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>
        <PortalHeader />
        <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </main>
    </>
  );
};