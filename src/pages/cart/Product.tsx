import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export const Product = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-0 items-center w-full p-3 border border-slate-500 rounded">
      <div className="flex w-full sm:w-1/2 gap-2 items-center">
        <img
          className="w-28 sm:w-20 rounded"
          src="https://cdn.discordapp.com/attachments/966433777461129337/1134166397254119554/Baasplea-Crian-as-Esporte-Sapatos-Malha-Respir-vel-Sapatilhas-Casuais-Para-Meninos-Menina-T-nis-De.png"
        />

        <p className="w-full sm:w-4/6 text-base font-medium text-slate-950">
          Sapatos Malha Respirável Sapatilhas Casuais
        </p>
      </div>

      <div className="flex flex-col items-center w-[120px] sm:w-1/4 mr-auto sm:mr-0">
        <div className="w-full max-w-[120px] flex items-center justify-between rounded-sm border border-slate-400">
          <button
            className="text-slate-600 flex"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <Icon icon="ph:minus-fill" width="32" />
          </button>
          <p className="text-lg font-medium text-slate-800">{quantity}</p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-slate-600 flex"
          >
            <Icon icon="ph:plus-fill" width="32" />
          </button>
        </div>

        <button className="text-center text-slate-500 text-sm">Remover</button>
      </div>

      <div className="ml-auto sm:ml-0 sm:w-1/4 flex flex-col gap-1">
        <small className="text-sm text-slate-500 text-end font-medium">
          R$ 20,00
        </small>
        <strong className="text-xl font-bold text-slate-900 text-end">
          $ 68,00
        </strong>
      </div>
    </div>
  );
};
