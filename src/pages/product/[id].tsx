import { stripe } from "@/lib/stripe"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { ProductContainer, ImgContainer, ProductDetails } from '../../styles/pages/product'
import { useContext } from "react"
import Head from "next/head"
import { KartContext } from "@/Contexts/KartContext"
import Image from "next/image"


interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
        quantity: number
    }
}

export default function Product({ product }: ProductProps) {

    const { AmountOfKarts, setAmountOfKarts, ValueOfKart, setValueOfKart } = useContext(KartContext)


    function handleAddToKart() {
        
        // Desformar o Intl

        const exp = /^\w{0,3}\W?\s?(\d+)[.,](\d+)?,?(\d+)?$/g
        const replacer = (f, group1, group2, group3) => {
        return group3 ? `${group1}${group2}.${group3}` : `${group1}.${group2}` }  
        
        // adicionar ao carrinho 

        const Kart = product
        const ValueOfKart = [...AmountOfKarts, Kart]
        setAmountOfKarts([...AmountOfKarts, Kart])


        // calculo do valor para carrinho e desformatação
            
            const ValueOfSumTheKart = ValueOfKart.map(item => {
                const price = item.price;
                const value = price.replace(exp, replacer)
                const realPrice = Number(value)
                return realPrice;
            });
            
            const price = ValueOfSumTheKart.reduce((acumulador, preco) => {
                return acumulador + preco
        }, 0)

        // Formnatando novamente

        const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(price as number)

         // Setar novo valor aumentado

        setValueOfKart(priceFormatted)

        
    }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading...</p>
    }

    return (
<>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        
        <ProductContainer>
            <ImgContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />   
            </ImgContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button onClick={handleAddToKart}>
                    Colocar no carrinho
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
                defaultPriceId: price.id,
                quantity: 1
            }
        },
        revalidate: 60 * 60 * 1 // 1 hora
    }
}
