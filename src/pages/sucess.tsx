import { KartContext } from "@/Contexts/KartContext";
import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagensContainer, SucessContainer } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Stripe from "stripe";

interface SucessProps {
    customerName: string,
    products: [{
        name: string;
        imageUrl: string;
        quantity: number;
      }],
    productsQuantity: number,
}

export default function Sucess({ customerName, products, productsQuantity }: SucessProps ) {

  const imagens = products.map(item => {
    return item.imageUrl
  })

  const imagensVizualizator = imagens.map(item => {
    return <Image src={item} width={120} height={110} alt="" />
  })


return (
<>        
        <Head>
            <title>Compra efetuada | Ignite Shop</title>

            <meta name="robots" content="noindex" />
        </Head>

        <SucessContainer>
            <h1>Compra efetuada!</h1>

            {
              imagens.length == 1 
              ?
              <ImageContainer>
                <Image src={imagens[0]} width={120} height={110} alt="" />
              </ImageContainer>
              :
              <ImagensContainer>
                {imagensVizualizator}
              </ImagensContainer>
            }
            

          {
            productsQuantity == 1 
            ? 
            <p>Uhuul <strong>{customerName}</strong>, sua camiseta <strong>{products[0].name}</strong> já está a caminho da sua casa.</p> 
            :
            <p>Uhuul <strong>{customerName}</strong>, sua compra de {productsQuantity} camisetas já está a caminho da sua casa.</p> 
          }
            

            <Link href={"/"}>
                Voltar ao catálogo!
            </Link>
        </SucessContainer>
</>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if(!query.session_id) {
    return {
         redirect: {
            destination: '/',
            permanent: false,
         }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details.name;

  const promises = session.line_items.data.map(async item => {
    const product = item.price.product as Stripe.Product
    const productInfo = {
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
    return productInfo
  })

  const products = await Promise.all(promises)

  const productsQuantity = products.reduce(
    (accumulator, current) => accumulator + current.quantity, 0)

  return {
    props: {
        customerName,
        products,
        productsQuantity,
    }
  }
}