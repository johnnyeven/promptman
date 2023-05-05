import { ClientSafeProvider } from "next-auth/react/types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface IProviderData {
    providers: ClientSafeProvider[]
    setProviders: Dispatch<SetStateAction<ClientSafeProvider[]>>
}

export const ProviderData = createContext<IProviderData>({
    providers: [],
    setProviders: () => { }
})

export const ProviderDataContext = (props: { children: any; }) => {
    const { children } = props
    const [providers, setProviders] = useState([] as ClientSafeProvider[])

    return (
        <ProviderData.Provider value={{ providers, setProviders }}>
            {children}
        </ProviderData.Provider>
    )
}
