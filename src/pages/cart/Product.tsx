import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../config/Context";

type ProductProps = {
  name: string;
  price: number;
  id: number;
  imgSource: string;
  quantity: number;
  giftType?: boolean;
};

type apiData = {
  USDBRL: {
    bid: string;
  };
};

export const Product = ({
  name,
  imgSource,
  price,
  id,
  quantity,
  giftType,
}: ProductProps) => {
  const [realPrice, setRealPrice] = useState(0);
  const { cartItems, setCartItems } = useContext(GlobalContext);

  useEffect(() => {
    let dollarCot = 0;
    axios
      .get<apiData>("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then(({ data }) => {
        dollarCot = Number(data.USDBRL.bid);

        setRealPrice(price * quantity * dollarCot);
      });
  }, [quantity]);

  const handleChangeItem = (action: "add" | "sub" | "remove") => {
    if (action === "add") {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      );
    }

    if (action === "sub") {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            };
          } else {
            return item;
          }
        })
      );
    }

    if (action === "remove") {
      if (giftType) {
        setCartItems(
          cartItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: 0 };
            } else {
              return item;
            }
          })
        );
      } else {
        setCartItems(
          cartItems.filter((item) => (item.id === id ? null : item))
        );
      }
    }
  };

  return (
    <div
      className={`flex flex-wrap sm:flex-nowrap gap-4 sm:gap-0 items-center w-full p-3   rounded ${
        giftType
          ? "border-palleteOrange10 border-2 bg-palleteOrange10 bg-opacity-10"
          : "border-slate-500 border"
      }`}
    >
      <div className="flex w-full sm:w-1/2 gap-2 items-center">
        <img className="w-28 sm:w-20 rounded" src={imgSource} />

        <p className="w-full sm:w-4/6 text-base font-medium text-slate-950">
          {name}
        </p>
      </div>

      <div className="flex flex-col items-center w-[120px] sm:w-1/4 mr-auto sm:mr-0">
        <div
          className={`w-full max-w-[120px] flex items-center justify-between rounded-sm ${
            !giftType && "border"
          } border-slate-400`}
        >
          {!giftType && (
            <>
              <button
                className="text-slate-600 flex"
                onClick={() => handleChangeItem("sub")}
              >
                <Icon icon="ph:minus-fill" width="32" />
              </button>
              <p className="text-lg font-medium text-slate-800">{quantity}</p>
              <button
                onClick={() => handleChangeItem("add")}
                className="text-slate-600 flex"
              >
                <Icon icon="ph:plus-fill" width="32" />
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => handleChangeItem("remove")}
          className={`text-center text-sm ${
            giftType
              ? "bg-red-600 text-slate-50 p-2 px-3 rounded"
              : "text-slate-500"
          }`}
        >
          Remover
        </button>
      </div>

      <div className="ml-auto sm:ml-0 sm:w-1/4 flex flex-col gap-1">
        <small className="text-sm text-slate-500 text-end font-medium">
          R$ {realPrice.toFixed(2)}
        </small>
        <strong className="text-xl font-bold text-slate-900 text-end">
          $ {(price * quantity).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};
