import { createContext, ReactNode, useState } from "react";

interface KartProviderProps {
    children: ReactNode
}

interface KartContextType {
    AmountOfKarts: Kart[]
    setAmountOfKarts: (data: Kart[]) => void
    OpenSpaceKart: boolean
    setOpenSpaceKart: (data: boolean) => void
    ValueOfKart: number
    setValueOfKart: (data: number) => void
}

interface Kart {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    quantity: number
}

export const KartContext = createContext({} as KartContextType)

export function SpaceKartContext({children}: KartProviderProps) {

    const [AmountOfKarts, setAmountOfKarts] = useState<Kart[]>([])

    const [OpenSpaceKart, setOpenSpaceKart] = useState(false)

    const [ValueOfKart, setValueOfKart] = useState(0)


    return (
        <KartContext.Provider value={{
            OpenSpaceKart, 
            setOpenSpaceKart, 
            AmountOfKarts,
            setAmountOfKarts,
            ValueOfKart,
            setValueOfKart,
            }}
            >
            {children}
        </KartContext.Provider>
    )
}
