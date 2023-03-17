import { KartContext } from '@/Contexts/KartContext'
import { KartContainer } from '@/styles/components/Kart'
import { useContext } from 'react'

export default function Kart() {

    const  {oi} = useContext(KartContext)

    console.log(oi, 'hhehe')

    return (
        <KartContainer>
            <p>hello word</p>
        </KartContainer>
    )
} 