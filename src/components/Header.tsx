import logoImg from "../assets/logo.svg"
import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import { HeaderContainer } from '@/styles/components/Header'
import { KartContext } from "@/Contexts/KartContext";
import { useContext } from "react";



export default function Header() {

  const  {oi} = useContext(KartContext)

  console.log(oi, 'ihih')

    return (
        <HeaderContainer>
          <Image src={logoImg} alt="" />
          <span>
            <button>
              <Handbag size={28} />
              <span>
                {oi} 
              </span>
            </button>
            
          </span>
        </HeaderContainer>
    )
}