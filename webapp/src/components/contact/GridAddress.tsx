import MembersGrid from "./MembersGrid"

const members = [
      {email: "maxime.stepkowski@edu.univ-paris13.fr", nomPrenom: "Maxime STEPKOWSKI"},
      {email: "teo.lemesle@edu.univ-paris13.fr", nomPrenom: "Téo LEMESLE"},
      {email: "mathew.prades@edu.univ-paris13.fr", nomPrenom: "Mathew PRADES"},
      {email: "ryan.mariapaul@edu.univ-paris13.fr", nomPrenom: "Ryan MARIA PAUL"},
      {email: "mathis.samat@edu.univ-paris13.fr", nomPrenom: "Mathis SAMAT"}
    ];

export default function GridAddress(){
  
  return(
    <>
      <p className="mb-3">email des membres :</p>
      <MembersGrid list={members}/>
    </>
      
  )
}