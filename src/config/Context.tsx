import React, { createContext, useEffect, useState } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export type CartType = {
  id: number;
  name: string;
  price: number;
  points: number;
  img: string;
  quantity: number;
};

type GlobalContextProps = {
  cartItems: CartType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartType[]>>;
};

export const GlobalContext = createContext({} as GlobalContextProps);

export const ContextProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [initRender, setInitRender] = useState(true);

  useEffect(() => {
    const storageCartItems = localStorage.getItem("@app/cartItems");

    if (storageCartItems !== null) {
      setCartItems(JSON.parse(storageCartItems));
    }

    setInitRender(false);
  }, []);

  useEffect(() => {
    !initRender &&
      localStorage.setItem("@app/cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <GlobalContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </GlobalContext.Provider>
  );
};
