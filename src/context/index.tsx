import { useContext } from "react";
import { ProviderData } from "./auth_providers_context";

export const useProviderDataContext = () => useContext(ProviderData)