import { createContext, useContext } from "react";

export interface ScreenContextType {
  showMessage: (msg: string, title?: string) => void;
  confirm: (
    msg: string,
    title: string | undefined,
    onOkClick: () => void,
    onCancelClick?: () => void
  ) => void;
}

export const ScreenContext = createContext<ScreenContextType>({
  showMessage: () => {},
  confirm: () => {},
});

export const useScreen = () => useContext(ScreenContext);
