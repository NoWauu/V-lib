import { cn } from "@/lib/utils";

export default function MailCard ({
  email, 
  nomPrenom, 
  className
}:{
  email:string, 
  nomPrenom:string, 
  className?: string | undefined}){
  return(
    <div className={cn("border border-emerald-800 p-4 rounded-md m-2 grow", className)}>{nomPrenom}<br/>{email}</div>
  )
}