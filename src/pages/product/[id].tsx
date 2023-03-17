import { stripe } from "@/lib/stripe"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { ProductContainer, ImgContainer, ProductDetails } from '../../styles/pages/product'
import axios from 'axios'
import { useContext, useState } from "react"
import Head from "next/head"
import { KartContext } from "@/Contexts/KartContext"


interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}

export default function Product({ product }: ProductProps) {

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId 
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (err) {
           // Conectar com uma ferramenta de observabilidade ( Datadog / Sentry)
           setIsCreatingCheckoutSession(false)
            alert('falha ao redirecionar ao checkout')
        }
    }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading...</p>
    }


    const  {oi} = useContext(KartContext)


    console.log(oi, 'oi')
    
    return (
<>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        
        <ProductContainer>
            <ImgContainer>
                <img src={product.imageUrl} width={520} height={480} alt="" />   
            </ImgContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                    Comprar agora
                </button>

            </ProductDetails>
        </ProductContainer>
</>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NV6mI0O5y2JQfO'} }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
        const productId = params.id

        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        })
    

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(price.unit_amount as number / 100 ),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // 1 hora
    }
}
