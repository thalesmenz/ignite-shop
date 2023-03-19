import { KartContext } from "@/Contexts/KartContext";
import { stripe } from "@/lib/stripe";
import { ImageContainer, SucessContainer } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import Stripe from "stripe";

interface SucessProps {
    customerName: string,
    product: {
        name: string;
        imageUrl: string; 
    }
}

export default function Sucess({ customerName, product }: SucessProps ) {


return (
<>        
        <Head>
            <title>Compra efetuada | Ignite Shop</title>

            <meta name="robots" content="noindex" />
        </Head>

        <SucessContainer>
            <h1>Compra efetuada!</h1>

            <ImageContainer>
                <img src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
        
            <p>
                Uhuul <strong>{customerName}</strong>, sua camiseta <strong>{product.name}</strong> ja está a caminho da sua casa.  
            </p>

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
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
        customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}