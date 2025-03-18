import MailCard from "./MailCard";

export default function MembersGrid({list}:{list:Array<{email:string, nomPrenom:string}>}){
  return (
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-4">
    {list.map(member => (
        <MailCard
          className={"last:col-span-1 sm:last:col-span-2"}
          key={member.email}
          email={member.email}
          nomPrenom={member.nomPrenom}
        />
      ))}
    </div>
  );
}