import { createContext, useContext } from "react";

export interface LayoutContextType {
  showMessage: (msg: string, title?: string) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  showMessage: () => {},
});

export const useLayout = () => useContext(LayoutContext);
