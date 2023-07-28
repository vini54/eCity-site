import { Icon } from "@iconify-icon/react";
import { Skeleton } from "@mui/material";

type ProductProps = {
  name?: string;
  price?: number;
  imgSource?: string;
  loading?: boolean;
};

export const Product = ({ loading, imgSource, name, price }: ProductProps) => {
  return (
    <div className="flex min-w-[210px] max-w-[220px] w-1/5 flex-col gap-1 p-2 rounded ring-1 ring-slate-400 snap-start hover:ring-palleteOrange10 hover:ring-2 transition">
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={175} />
      ) : (
        <img src={imgSource} />
      )}

      <p className="h-12 mt-1 overflow-hidden text-sm font-semibold flex flex-col">
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
          {loading ? (
            <Skeleton variant="text" width={64} sx={{ fontSize: "0.75rem" }} />
          ) : (
            "R$ 20,00"
          )}
        </p>

        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton variant="text" width="25%" sx={{ fontSize: "1.5rem" }} />
          ) : (
            <h3 className="text-xl font-semibold">$ {price?.toFixed(2)}</h3>
          )}

          <button className="text-xs p-1 px-2 rounded bg-palleteOrange10 text-slate-50 flex items-center gap-1">
            <Icon icon="humbleicons:cart" width="16" /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
