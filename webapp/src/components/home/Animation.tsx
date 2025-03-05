"use client"

import {TypeAnimation} from "react-type-animation";

export default function Animation(){
    return (
      <TypeAnimation
        sequence={[
            "Réservez vos Vélib' SIMPLEMENT !",
            3000,
            "Réservez vos Vélib' RAPIDEMENT !",
            3000,
            "Réservez vos Vélib' EFFICACEMENT !",
            3000,
        ]}
        wrapper="span"
        speed={40}
        style={{ fontSize: '2em', display: 'inline-block' }}
        className="mt-8"
        repeat={Infinity}
      />
    );
}