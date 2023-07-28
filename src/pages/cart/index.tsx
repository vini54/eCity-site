import { Empty } from "./Empty";
import { useContext } from "react";
import { Orders } from "./Orders";
import { GlobalContext } from "../../config/Context";

export const CartPage = () => {
  const { cartItems } = useContext(GlobalContext);

  return (
    <div className="w-full p flex flex-col gap-2 p-4 sm:p-6 lg:px-8 max-w-7xl">
      <h1 className="text-4xl font-semibold text-palleteBlue10">
        Meu carrinho
      </h1>

      {cartItems.length > 0 ? <Orders /> : <Empty />}
    </div>
  );
};
