import MailCard from "./MailCard";

export default function MembersGrid({list}:{list:Array<{email:string, nomPrenom:string}>}){
  return (
      <div className="grid w-full grid-cols-2 grid-row-3">
    {list.map(member => (
        <MailCard
          className={"last:col-span-2"}
          key={member.email}
          email={member.email}
          nomPrenom={member.nomPrenom}
        />
      ))}
    </div>
  );
}