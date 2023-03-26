import { KartContext } from '@/Contexts/KartContext'
import { Content, KartContainer, ProductInKart, SacolaDeCompras, ShoppingContent } from '@/styles/components/Kart'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'

export default function Kart() {

  const  { setOpenSpaceKart, OpenSpaceKart, AmountOfKarts, setAmountOfKarts, ValueOfKart, setValueOfKart } = useContext(KartContext)


  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
        setIsCreatingCheckoutSession(true)

        // Contagem da quantidade de itens

        const result = AmountOfKarts.reduce((acc, current) => {
            const foundProduct = acc.find(product => product.defaultPriceId === current.defaultPriceId);
            
            if (!foundProduct) {
              acc.push(current);
            } else {
              foundProduct.quantity += 1;
            }
            
            return acc;
          }, []);

          // Manado pra API do stripe

        const response = await axios.post('/api/checkout', {
            Products: result
        })

        const { checkoutUrl } = response.data

        window.location.href = checkoutUrl

    
    } catch (err) {
       // Conectar com uma ferramenta de observabilidade ( Datadog / Sentry)
       setIsCreatingCheckoutSession(false)
        alert('falha ao redirecionar ao checkout')
    }
}

    function handleRemoveItem(productPrice, indexRemove) {
        // Remover da interface o produto
        
        const array = AmountOfKarts.filter((item, index) => {
            return index !== indexRemove;
        })
        
        setAmountOfKarts(array)

        // Desformatar 

        const exp = /^\w{0,3}\W?\s?(\d+)[.,](\d+)?,?(\d+)?$/g
        const replacer = (f, group1, group2, group3) => {
        return group3 ? `${group1}${group2}.${group3}` : `${group1}.${group2}` } 

        const price = Number(ValueOfKart.replace(exp, replacer))
        const productPriceReduced = Number(productPrice.replace(exp, replacer))

        const newPrice = price - productPriceReduced

        console.log(newPrice)

        // Reformatar

        const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(newPrice as number)

          // Setar novo valor reduzido

          setValueOfKart(priceFormatted)
        
    }

    return (
        <>
        
        {
            OpenSpaceKart == true ?
        
        <KartContainer>
            <div>
                <button onClick={() => {
                    setOpenSpaceKart(!OpenSpaceKart)
                }}>
                    <X size={20} />
                </button>
            </div>

            <div>

             <SacolaDeCompras>Sacola de compras</SacolaDeCompras>

                <ShoppingContent>
                    <div>
                        <Content>
                            {AmountOfKarts.map((item, index) => (
                                <div key={index}>
                                    <ProductInKart>
                                        <div>
                                            <Image src={item.imageUrl} width={75} height={75} alt="camiseta" />
                                        </div>
                                        <div>
                                            <p>{item.name}</p>
                                            <h3>{item.price}</h3>
                                            <button onClick={() => handleRemoveItem(item.price, index)}>Remover</button>
                                        </div>
                                    </ProductInKart>
                                </div>
                            ))}
                        </Content>    
                    </div>

                    <div> 
                        <div>
                            <span>quantidade</span>
                            <span>{AmountOfKarts.length} itens</span>
                        </div>
                        <div>
                            <p>valor total</p>
                            <p>{ValueOfKart}</p>
                        </div>
                            
                        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                                Finalizar compra
                        </button>
                    </div>
                </ShoppingContent>
            </div>
        </KartContainer>

        :

        null
        }
        </>
    )
} 