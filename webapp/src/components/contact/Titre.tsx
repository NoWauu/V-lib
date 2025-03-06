import { Mail } from "lucide-react"

export default function Titre(){
  return(
  <div className="gap-2 flex text-center items-center justify-center">
    <Mail className="size-5" strokeWidth={3}/>
    <span className="text-2xl font-semibold leading-none tracking-tight">Nous contacter</span>
  </div>
  )
}