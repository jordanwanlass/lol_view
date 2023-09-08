import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2">
      <ul className="menu rounded-box menu-lg bg-base-100">
        <li>
          <Link href="/portal">
            Individual stats
          </Link>
        </li>
        <li>
          <Link href="/portal/groupStats">
            Group stats
          </Link>
        </li>
        <li>
          <Link href="/portal/settings">
            Settings
          </Link>
        </li>
        <li>
          <Link href="#" onClick={() => void signOut({ callbackUrl: '/' })}>
            Logout
          </Link>
        </li>
      </ul>
      <div className="divider" />
    </div>
  );
};