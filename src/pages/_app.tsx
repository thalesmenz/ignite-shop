import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app';
import type { AppProps } from 'next/app'
import { KartContext, SpaceKartContext } from '@/Contexts/KartContext';
import { useContext } from 'react';
import Header from '@/components/Header';
import Kart from '@/components/Kart';



globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
  <SpaceKartContext>
    <Container>
       
       <Header />

        <Component {...pageProps} />

        <Kart />

      </Container>
    </SpaceKartContext>
  )
}
