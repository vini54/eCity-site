import { Outlet, NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useContext, useState } from "react";
import { GlobalContext } from "../config/Context";
import { Alert, Snackbar } from "@mui/material";

export const HeaderLayout = () => {
  const { cartItems, giftItems, giftAlert } = useContext(GlobalContext);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  window.document.addEventListener("scroll", () => {
    if (window.scrollY > 160) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-screen flex flex-col items-center relative">
      <header className="w-full bg-palleteBlue10 gap-4 flex items-center flex-col p-4 sm:pr-6 lg:px-12 lg:pr-20">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-4">
          <img className="w-52" src="/Logo-transparent1.png" alt="" />

          <div className="flex items-center w-full bg-slate-50 rounded-lg overflow-hidden">
            <input
              className="p-2 px-4 outline-none w-full"
              type="text"
              placeholder="Buscar Produtos"
            />

            <button className="flex p-2 gap-2 items-center transition hover:bg-opacity-80 bg-palleteOrange10 text-slate-50 rounded-lg">
              <Icon icon="gg:search" width={24} className="-mb-[2px]" />

              <p className="font-medium">Pesquisar</p>
            </button>
          </div>
        </div>

        <div className="w-full max-w-6xl flex justify-between items-center sm:pl-2">
          <nav className="flex items-center text-slate-50 gap-2 font-medium">
            <NavLink
              className={({ isActive }) =>
                `p-1 px-3 rounded-sm transition ${
                  isActive
                    ? "bg-palleteOrange10 hover:bg-opacity-80"
                    : "hover:underline"
                }`
              }
              to="/"
            >
              Início
            </NavLink>

            <a
              className="p-1 px-2 rounded hover:underline hidden sm:block"
              href="/"
            >
              Categorias
            </a>
            <a
              className="p-1 px-2 rounded hover:underline hidden sm:block"
              href="/"
            >
              Vendas
            </a>
            <a
              className="p-1 px-2 rounded hover:underline hidden sm:block"
              href="/"
            >
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 transition-all hover:ring-2 rounded-md ring-slate-50 text-slate-50 p-1">
              <Icon icon="gg:pin" width="24" />
              <div className="hidden sm:flex flex-col items-start">
                <p className="text-sm">Informe seu</p>
                <strong className="text-base -mt-1 font-medium">Cep</strong>
              </div>
            </button>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex p-1 rounded transition hover:ring-2 ring-slate-50 text-slate-50 relative ${
                  isActive ? "bg-palleteOrange10 bg-opacity-90" : ""
                }`
              }
            >
              <Icon icon="humbleicons:cart" width="36" />

              <span className="text-slate-50 text-xs bg-palleteOrange10 p-1 px-2 rounded-full absolute -top-1 flex -right-1">
                {cartItems.length +
                  giftItems.filter((item) => item.quantity > 0).length}
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="w-full flex justify-center">
        <Outlet />
      </main>

      <Snackbar open={giftAlert} autoHideDuration={2500}>
        <Alert severity="info" variant="filled">
          Você recebeu um brinde!
        </Alert>
      </Snackbar>

      <button
        className={`fixed bottom-4 right-6 text-slate-50 bg-palleteBlue20 transition flex p-2 rounded-full outline-none ${
          showScrollBtn ? "opacity-75 hover:opacity-100" : "opacity-0"
        }`}
        disabled={!showScrollBtn}
        onClick={handleScrollTop}
      >
        <Icon icon="iconamoon:arrow-up-1-fill" width={32} />
      </button>
    </div>
  );
};
