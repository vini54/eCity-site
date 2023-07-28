import React, { createContext, useEffect, useState } from "react";
import { MainApi } from "../config/api";

type ProviderProps = {
  children: React.ReactNode;
};

type giftDataApi = {
  points: number;
  product: {
    id: number;
    name: string;
    img: string;
  };
};

export type CartType = {
  id: number;
  name: string;
  price: number;
  points: number;
  img: string;
  quantity: number;
  isGift?: boolean;
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

    let totalPts = 0;

    cartItems.forEach((item) => {
      totalPts = totalPts + item.points * item.quantity;
    });

    MainApi.get<giftDataApi[]>("/gifts").then(({ data }) => {
      data.forEach((dataItem) => {
        if (
          dataItem.points <= totalPts &&
          !cartItems.find((item) => item.id === dataItem.product.id)
        ) {
          setCartItems([
            ...cartItems,
            {
              id: dataItem.product.id,
              img: dataItem.product.img,
              name: dataItem.product.name,
              points: 0,
              price: 0,
              quantity: 1,
              isGift: true,
            },
          ]);
        }

        if (
          totalPts < dataItem.points &&
          cartItems.find((item) => item.id === dataItem.product.id)
        ) {
          setCartItems(
            cartItems.filter((item) => item.id !== dataItem.product.id)
          );
        }
      });
    });
  }, [cartItems]);

  return (
    <GlobalContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </GlobalContext.Provider>
  );
};
