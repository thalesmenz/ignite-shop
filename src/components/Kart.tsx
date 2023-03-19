import { KartContext } from '@/Contexts/KartContext'
import { Content, KartContainer, ProductInKart, ShoppingContent } from '@/styles/components/Kart'
import axios from 'axios'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'

export default function Kart() {

  const  { setOpenSpaceKart, OpenSpaceKart, AmountOfKarts, setAmountOfKarts, ValueOfKart } = useContext(KartContext)


  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
        setIsCreatingCheckoutSession(true)


        const result = AmountOfKarts.reduce((acc, current) => {
            const foundProduct = acc.find(product => product.defaultPriceId === current.defaultPriceId);
            
            if (!foundProduct) {
              acc.push(current);
            } else {
              foundProduct.quantity += 1;
            }
            
            return acc;
          }, []);

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

    function handleRemoveItem(indexRemove) {
        const array = AmountOfKarts.filter((item, index) => {
            return index !== indexRemove;
        })

        setAmountOfKarts(array)
        console.log(array)
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
                <ShoppingContent>

                <div>
                    <h1>Sacola de compras</h1>
                    <Content>
                         {AmountOfKarts.map((item, index) => (
                            <div key={item.id}>
                            <ProductInKart>
                                <div>
                                    <img src={item.imageUrl} width={75} height={75} alt="camiseta" />
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                    <h3>{item.price}</h3>
                                    <button onClick={() => handleRemoveItem(index)}>Remover</button>
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