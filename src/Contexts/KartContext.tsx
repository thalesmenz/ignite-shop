import { createContext, ReactNode, useState } from "react";

interface KartProviderProps {
    children: ReactNode
}

interface KartContextType {
    oi: number
}

export const KartContext = createContext({} as KartContextType)

export function SpaceKartContext({children}: KartProviderProps) {

    const [oi, setOi] = useState(2)


    return (
        <KartContext.Provider value={{oi}}>
            {children}
        </KartContext.Provider>
    )
}
