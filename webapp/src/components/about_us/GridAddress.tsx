import MailCard from "./MailCard"

export default function GridAddress(){
    return(
        <div className="">
            <p className="mb-3">Email des membres :</p>
            <div className="grid w-full grid-cols-2 grid-row-3">
                <MailCard Email="maxime.stepkowski@edu.univ-paris13.fr" NomPrenom="Maxime STEPKOWSKI"/>
                <MailCard Email="teo.lemesle@edu.univ-paris13.fr" NomPrenom="Téo LEMESLE"/>
                <MailCard Email="mathew.prades@edu.univ-paris13.fr" NomPrenom="Mathew PRADES"/>
                <MailCard Email="ryan.mariapaul@edu.univ-paris13.fr" NomPrenom="Ryan MARIA PAUL"/>
            </div>
            <MailCard Email="mathis.samat@edu.univ-paris13.fr" NomPrenom="Mathis SAMAT"/>
            
        </div>
        
    )
    }