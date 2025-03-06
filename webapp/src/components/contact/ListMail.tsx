import MailCard from "./MailCard";
import GridAddress from "./GridAddress";

export default function ListMail(){
  return (
    <>
      <MailCard email="equipevlib@gmail.com" nomPrenom="Email de l'équipe"/>
      <GridAddress/>
    </>
  );
}