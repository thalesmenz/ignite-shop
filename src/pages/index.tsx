import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from 'next/link';
import Head from 'next/head'
import { Handbag } from "phosphor-react"
import { useContext } from "react";
import { KartContext } from "@/Contexts/KartContext";
import Image from "next/image";


interface homeProps {
  products: {
  id: string,
  name: string,
  imageUrl: string,
  price: string
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

  return (
<>
    <Head>
      <title>home | Ignite Shop</title>
    </Head>

    <HomeContainer ref={sliderRef} className="keen-slider" >
      {products.map(product => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="camiseta" />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <p>{product.price}</p>
              </div>
              <button>
                <Handbag size={28} />
              </button>
            </footer>
            </Product>
        </Link>
        )
      })}

      
    </HomeContainer>


</>
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
