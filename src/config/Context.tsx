import React, { createContext, useEffect, useState } from "react";
import { MainApi } from "../config/api";
import axios from "axios";

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
  giftItems: CartType[];
  setGiftItems: React.Dispatch<React.SetStateAction<CartType[]>>;
  giftAlert: boolean;
  usdBrlCott: number;
};

export const GlobalContext = createContext({} as GlobalContextProps);

export const ContextProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [giftItems, setGiftItems] = useState<CartType[]>([]);
  const [giftAlert, setGiftAlert] = useState(false);
  const [initRender, setInitRender] = useState(true);
  const [usdBrlCott, setUsdBrlCot] = useState(0);

  useEffect(() => {
    const storageCartItems = localStorage.getItem("@app/cartItems");

    if (storageCartItems !== null) {
      setCartItems(JSON.parse(storageCartItems));
    }

    setInitRender(false);

    type apiData = {
      USDBRL: {
        bid: string;
      };
    };

    axios
      .get<apiData>("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then(({ data }) => {
        setUsdBrlCot(Number(data.USDBRL.bid));
      });
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
          !giftItems.find((item) => item.id === dataItem.product.id)
        ) {
          setGiftItems([
            ...giftItems,
            {
              id: dataItem.product.id,
              img: dataItem.product.img,
              name: dataItem.product.name,
              points: 0,
              price: 0,
              quantity: 1,
            },
          ]);

          setGiftAlert(true);
        }

        if (
          totalPts < dataItem.points &&
          giftItems.find((item) => item.id === dataItem.product.id)
        ) {
          setGiftItems(
            giftItems.filter((item) => item.id !== dataItem.product.id)
          );
        }
      });
    });
  }, [cartItems]);

  useEffect(() => {
    let timer = 0;
    if (giftAlert) {
      timer = setTimeout(() => {
        setGiftAlert(false);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [giftAlert]);

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        giftItems,
        setGiftItems,
        giftAlert,
        usdBrlCott,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
