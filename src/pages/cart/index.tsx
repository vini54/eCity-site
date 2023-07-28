// import { Empty } from "./Empty";
import { Orders } from "./Orders";

export const CartPage = () => {
  return (
    <div className="w-full p flex flex-col gap-2 p-4 sm:p-6 lg:px-8 max-w-7xl">
      <h1 className="text-4xl font-semibold text-palleteBlue10">
        Meu carrinho
      </h1>

      {/* <Empty /> */}

      <Orders />
    </div>
  );
};
