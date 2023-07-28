import { useContext, useEffect, useState } from "react";
import { Product } from "./Product";
import { GlobalContext } from "../../config/Context";
import axios from "axios";

export const Orders = () => {
  const { cartItems } = useContext(GlobalContext);
  const [resumeValue, setResumeValue] = useState(0);

  useEffect(() => {
    let totalValue = 0;
    cartItems.forEach((item) => {
      totalValue = totalValue + item.price * item.quantity;
    });

    setResumeValue(totalValue);
  }, cartItems);

  return (
    <div className="w-full flex flex-col lg:flex-row py-4 gap-4 items-center lg:items-start">
      <div className="flex max-w-3xl w-full lg:w-4/6 flex-col gap-2">
        <div className="hidden sm:flex border-b border-slate-500 text-sm text-slate-500">
          <p className="w-1/2">Produto</p>
          <p className="w-1/4 text-center mr-4">Quantidade</p>
          <p className="w-1/4 text-end">Preço</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {cartItems.map((item) => {
            if (item.isGift && item.quantity == 0) {
              return null;
            } else {
              return (
                <Product
                  id={item.id}
                  key={item.id}
                  imgSource={item.img}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  giftType={item.isGift}
                />
              );
            }
          })}
        </div>
      </div>

      <Resume total={resumeValue} />
    </div>
  );
};

type ResumeProps = {
  total: number;
};

const Resume = ({ total }: ResumeProps) => {
  const [realPrice, setRealPrice] = useState(0);

  useEffect(() => {
    let dollarCot = 0;
    axios
      .get("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then(({ data }) => {
        dollarCot = Number(data.USDBRL.bid);

        setRealPrice((total + 10) * dollarCot);
      });
  }, [total]);

  return (
    <div className="w-full sm:w-2/6 min-w-0 sm:min-w-[305px] flex flex-col gap-2 sm:sticky top-3 order-first sm:order-none">
      <div className="w-full flex flex-col border border-slate-400 rounded-sm">
        <h3 className="w-full py-2 text-center self-center text-lg font-medium border-b border-slate-400">
          Resumo do pedido
        </h3>

        <div className="w-full p-2 flex justify-between border-b border-slate-400">
          <p>Subtotal</p>

          <strong>$ {total.toFixed(2)}</strong>
        </div>

        <div className="w-full p-2 flex justify-between border-b border-slate-400">
          <p>Entrega</p>

          <strong>$ 10,00</strong>
        </div>

        <div className="w-full p-4 px-2 flex items-center justify-between">
          <p className="text-lg">Total</p>

          <div className="flex flex-col gap-1 items-end">
            <strong className="text-palleteBlue10 font-bold text-2xl">
              $ {(total + 10).toFixed(2)}
            </strong>
            <small className="text-lg text-palleteBlue30 font-medium underline opacity-75">
              R$ {realPrice.toFixed(2)}
            </small>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <button className="p-2 px-4 bg-slate-500 hover:bg-slate-700 transition rounded text-sm text-slate-50">
          Adicionar produtos
        </button>
        <button className="p-2 px-4 bg-green-600 hover:bg-green-700 transition rounded text-lg font-medium text-slate-50">
          Fechar Pedido
        </button>
      </div>
    </div>
  );
};
