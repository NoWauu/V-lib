"use client";

import { useEffect, useState } from "react";
import IResType from "@/types/IResType";
import IUserData from "@/types/IUserData";
import ModifyValue from '@/components/account/ModifyInfo';
import EmailVerified from './EmailVerified';

export default function AccountDetails() {
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);

  // Fetch user data when component loads
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/api/get-user-data");
      const data: IResType = await response.json();

      const userData = data.userData;
      setUserData(userData);
    }
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div className="w-full flex flex-col p-4">
          <h2 className="text-lg font-semibold">Informations personnelles</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 pt-6 place-items-center">
            <ModifyValue label="Prénom" defaultValue={userData.first_name} fieldName="first_name" />
            <ModifyValue label="Nom" defaultValue={userData.last_name} fieldName="last_name" />
            <ModifyValue label="Adresse mail" defaultValue={userData.email} fieldName="email" />
            <ModifyValue label="Numéro de téléphone" defaultValue={userData.phone_number} fieldName="phone_number" />
            <EmailVerified verified={userData.is_email_verified} />
          </div>
        </div>
      ) : (
        <p>Chargement des données utilisateur...</p>
      )}
    </div>
  );
}
