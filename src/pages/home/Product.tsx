import { Icon } from "@iconify-icon/react";
import { Skeleton, Tooltip } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../config/Context";

type ProductProps = {
  name?: string;
  price?: number;
  points?: number;
  id?: number;
  imgSource?: string;
  loading?: boolean;
};

type apiData = {
  USDBRL: {
    bid: string;
  };
};

export const Product = ({
  loading,
  imgSource,
  name,
  price,
  id,
  points,
}: ProductProps) => {
  const [realPrice, setRealPrice] = useState<number | undefined>();
  const [addCartAnim, setAddCartAnim] = useState(false);
  const { cartItems, setCartItems } = useContext(GlobalContext);

  useEffect(() => {
    let dollarCot = 0;
    if (!loading) {
      axios
        .get<apiData>("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        .then(({ data }) => {
          dollarCot = Number(data.USDBRL.bid);

          setRealPrice(price! * dollarCot);
        });
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (addCartAnim) {
      timer = setTimeout(() => {
        setAddCartAnim(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [addCartAnim]);

  const handleAddtoCart = () => {
    console.log(cartItems.find((item) => item.id === id));

    if (cartItems.find((item) => item.id === id)) {
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
    } else {
      setCartItems([
        ...cartItems,
        {
          id: id!,
          img: imgSource!,
          name: name!,
          points: points!,
          price: price!,
          quantity: 1,
        },
      ]);
    }
    setAddCartAnim(true);
  };

  return (
    <div className="flex min-w-[210px] max-w-[220px] w-1/5 flex-col gap-1 p-2 rounded ring-1 ring-slate-400 snap-start hover:ring-palleteOrange10 hover:ring-2 transition">
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={175} />
      ) : (
        <img
          className="w-full aspect-square object-cover object-center"
          src={imgSource}
        />
      )}

      <p className="h-10 mt-1 overflow-auto text-sm font-semibold flex flex-col">
        {loading ? (
          <>
            <Skeleton
              variant="text"
              width="100%"
              sx={{ fontSize: "0.75rem" }}
            />
            <Skeleton variant="text" width="70%" sx={{ fontSize: "0.75rem" }} />
          </>
        ) : (
          name
        )}
      </p>

      <div className="flex flex-col">
        <p className="text-sm text-slate-500">
          {realPrice === undefined ? (
            <Skeleton variant="text" width={64} sx={{ fontSize: "0.75rem" }} />
          ) : (
            `R$ ${realPrice.toFixed(2)}`
          )}
        </p>

        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton variant="text" width="25%" sx={{ fontSize: "1.5rem" }} />
          ) : (
            <h3 className="text-xl font-semibold">$ {price?.toFixed(2)}</h3>
          )}

          <Tooltip title="Adicionado ao carrinho!" open={addCartAnim}>
            <button
              onClick={addCartAnim ? () => null : handleAddtoCart}
              className={`text-xs p-1 px-2 rounded transition ${
                addCartAnim ? "bg-green-600" : "bg-palleteOrange10"
              }  text-slate-50 flex items-center gap-1`}
            >
              {addCartAnim ? (
                <Icon icon="mingcute:check-fill" width="16" />
              ) : (
                <Icon icon="humbleicons:cart" width="16" />
              )}
              Adicionar
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
