import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";

export const Empty = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-slate-700">
      <Icon icon="mdi:cart-off" width="64" />

      <h2 className="text-lg font-bold">SEU CARRINHO ESTÁ VAZIO</h2>

      <p className="text-slate-950 text-center">
        Navegue agora pelas categorias de nossa loja e escolha os produtos
        desejados para adicionar em seu carrinho de compras
      </p>

      <Link
        to="/"
        className="mt-4 bg-palleteOrange10 transition hover:shadow-slate-900 hover:shadow rounded-md p-2 px-4 text-slate-100 text-lg font-medium"
      >
        Continuar comprando
      </Link>
    </div>
  );
};
