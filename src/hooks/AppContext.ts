import { createContext, useContext } from "react";
import { AppContextValue } from "../interfaces/types";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const useAppContext = () => {
  return useContext(AppContext);
};
