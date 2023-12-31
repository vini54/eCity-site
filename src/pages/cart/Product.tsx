import { Icon } from "@iconify-icon/react";
import { useContext } from "react";
import { GlobalContext } from "../../config/Context";

type ProductProps = {
  name: string;
  price: number;
  id: number;
  imgSource: string;
  quantity: number;
  isGift?: boolean;
};

export const Product = ({
  name,
  imgSource,
  price,
  id,
  quantity,
  isGift,
}: ProductProps) => {
  const { cartItems, setCartItems, setGiftItems, giftItems, usdBrlCott } =
    useContext(GlobalContext);

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
      if (isGift) {
        setGiftItems(
          giftItems.map((item) => {
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
        isGift
          ? "border-palleteOrange10 border-2 bg-palleteOrange10 bg-opacity-10"
          : "border-slate-500 border"
      }`}
    >
      <div className="flex w-full sm:w-1/2 gap-2 items-center">
        <img
          className="w-28 aspect-square object-cover object-center sm:w-20 rounded"
          src={imgSource}
        />

        <p className="w-full sm:w-4/6 text-sm h-14 overflow-auto font-medium text-slate-950">
          {name}
        </p>
      </div>

      <div className="flex flex-col items-center w-[120px] sm:w-1/4 mr-auto sm:mr-0">
        <div
          className={`w-full max-w-[120px] flex items-center justify-between rounded-sm ${
            !isGift && "border"
          } border-slate-400`}
        >
          {!isGift && (
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
            isGift
              ? "bg-red-600 text-slate-50 p-2 px-3 rounded"
              : "text-slate-500"
          }`}
        >
          Remover
        </button>
      </div>

      <div className="ml-auto sm:ml-0 sm:w-1/4 flex flex-col gap-1">
        <small className="text-sm text-slate-500 text-end font-medium">
          {/* R$ {realPrice.toFixed(2)} */}

          {`R$ ${(price * usdBrlCott).toFixed(2).replace(".", ",")}`}
        </small>
        <strong className="text-xl font-bold text-slate-900 text-end">
          $ {(price * quantity).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};
