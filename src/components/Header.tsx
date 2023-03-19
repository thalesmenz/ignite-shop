import logoImg from "../assets/logo.svg"
import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import { HeaderContainer } from '@/styles/components/Header'
import { KartContext } from "@/Contexts/KartContext";
import { useContext } from "react";



export default function Header() {

  const  { setOpenSpaceKart, OpenSpaceKart, AmountOfKarts } = useContext(KartContext)

    return (
        <HeaderContainer>
          <Image src={logoImg} alt="" />
          <span>
            <button onClick={() => {
              setOpenSpaceKart(!OpenSpaceKart)
            }}>
              <Handbag size={28} />
              
                {AmountOfKarts.length !== 0 ? <span>{AmountOfKarts.length}</span> : null}
              
            </button>
            
          </span>
        </HeaderContainer>
    )
}