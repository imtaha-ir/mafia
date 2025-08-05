import { createContext, useContext } from "react";

export interface ScreenContextType {
  showMessage: (msg: string, title?: string) => void;
}

export const ScreenContext = createContext<ScreenContextType>({
  showMessage: () => {},
});

export const useScreen = () => useContext(ScreenContext);
