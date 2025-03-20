"use client";

import { Suspense, useState } from "react";

import clsx from "clsx";

import AccountDetails from "@/components/account/AccountDetails";
import DeleteAccount from "./DeleteAccount";
import AccountHistory from "@/components/account/AccountHistory";
import AccountFavorites from "@/components/account/AccountFavorites";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function AccountTabs() {
  const [tab, setTab] = useState("information");

  return (
    <div className="mt-8 px-4 flex flex-col md:flex-row gap-10">
      <Select value={tab} onValueChange={(value) => setTab(value)}>
        <SelectTrigger className="max-w-[300px] md:hidden mx-auto">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="information">Informations</SelectItem>
            <SelectItem value="history">Historique</SelectItem>
            <SelectItem value="favorites">Favoris</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex-col hidden md:flex items-center justify-center border-e-2 border-primary py-4 px-6 h-48 gap-2">
        <button
          className={clsx(
            `w-full py-2 px-4 rounded-sm transition-all duration-100`,
            {
              "bg-primary text-background": tab === "information",
              "text-primary hover:bg-gray-100": tab !== "information",
            }
          )}
          onClick={() => setTab("information")}
        >
          Informations
        </button>
        <button
          className={clsx(
            `w-full py-2 px-4 rounded-sm transition-all duration-200`,
            {
              "bg-primary text-background": tab === "history",
              "text-primary hover:bg-gray-100": tab !== "history",
            }
          )}
          onClick={() => setTab("history")}
        >
          Historique
        </button>
        <button
          className={clsx(
            `w-full py-2 px-4 rounded-sm transition-all duration-200`,
            {
              "bg-primary text-background": tab === "favorite",
              "text-primary hover:bg-gray-100": tab !== "favorite",
            }
          )}
          onClick={() => setTab("favorite")}
        >
          Favoris
        </button>
        <DeleteAccount />
      </div>
      <div className="w-full">
        <Suspense>
          {tab === "information" && <AccountDetails />}
          {tab === "history" && <AccountHistory />}
          {tab === "favorite" && <AccountFavorites />}
        </Suspense>
      </div>
      {tab === "information" && (
        <div className="md:hidden flex flex-col items-center justify-center mb-12">
          <DeleteAccount />
        </div>
      )}
    </div>
  );
}
