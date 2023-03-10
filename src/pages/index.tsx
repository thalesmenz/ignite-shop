import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react"
import camiseta1 from "../assets/camisetas/camiseta1.png"
import camiseta2 from "../assets/camisetas/camiseta2.png"
import camiseta3 from "../assets/camisetas/camiseta3.png"
import camiseta4 from "../assets/camisetas/camiseta4.png"

import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from "react";
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";

interface homeProps {
  products: {
  id: string,
  name: string,
  imageUrl: string,
  price: number
  }[]
}


export default function Home({ products }: homeProps) {

  // const [list, setList] = useState<number[]>()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  // useEffect(() => {
  //   setTimeout(() => {
  //     setList([1, 2, 3])
  //   }, 2000)
  // }, [])

  return (
    <HomeContainer ref={sliderRef} className="keen-slider" >

      {products.map(product => {
        return (
        <Product className="keen-slider__slide" key={product.id}>
        <img src={product.imageUrl} width={520} height={480} alt="camiseta" />

        <footer>
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </footer>
        </Product>
        )
      })}

      
    </HomeContainer>
    
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
  
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100 ),
    }
  })
  
  console.log(response)

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // a cada 2 horas a pagina estatica de cache ira ser gerada novamente   
  }
}
