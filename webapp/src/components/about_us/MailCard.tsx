export default function MailCard ({Email, NomPrenom}:{Email:string, NomPrenom:string}){
    return(
        <div className="border border-emerald-800 p-4 rounded-md m-2 grow">{NomPrenom}<br/>{Email}</div>
    )
    }