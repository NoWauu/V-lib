"use client";

import {Suspense, useState} from "react";

import clsx from "clsx";

import AccountDetails from "@/components/account/AccountDetails";
import DeleteAccount from './DeleteAccount';
import AccountHistory from "@/components/account/AccountHistory";
import AccountFavorites from "@/components/account/AccountFavorites";

export default function AccountTabs() {
	const [tab, setTab] = useState("information");

	return (
		<div className="mt-12 px-4 flex flex-row gap-10">
			<div className="flex-col flex items-center justify-center border-e-2 border-primary py-4 px-6 h-48 gap-2">
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
						`w-full py-2 px-4 rounded-sm transition-all duration-100`,
						{
							"bg-primary text-background": tab === "favorites",
							"text-primary hover:bg-gray-100": tab !== "favorites",
						}
					)}
					onClick={() => setTab("favorites")}
				>
					Favoris
				</button>
				<DeleteAccount/>
			</div>
			<div className="w-full">
				<Suspense>
					{tab === "information" && <AccountDetails/>}
					{tab === "history" && <AccountHistory/>}
					{tab === "favorites" && <AccountFavorites />}
				</Suspense>
			</div>
		</div>
	);
}
