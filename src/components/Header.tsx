import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user.name ? `Welcome ${sessionData?.user?.name}` : "LoL View"}
        {sessionData?.user && <div><Link href="/portal">Portal</Link></div>}
      </div>
      
      <div className="flex-none gap-2">
        {sessionData?.user ? (
          <label
            tabIndex={0}
            className="circle avatar btn btn-circle btn-ghost"
            onClick={() => void signOut({ callbackUrl: '/' })}
          >
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
              />
            </div>
          </label>
        ) : (
          <button
            className="btn btn-ghost rounded-btn"
            onClick={() => void signIn('discord',{ callbackUrl: '/portal' })}
          >
             Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;