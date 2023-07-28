import react from "react";
import { Icon } from "@iconify-icon/react";

type SectionProps = {
  title?: string;
  children: react.ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex items-end gap-2">
        <h2 className="text-lg font-medium">{title ? title : "Ofertas"}</h2>
        <a
          className="text-blue-600 font-medium hover:text-blue-900 hover:underline transition text-sm hidden sm:block"
          href="/"
        >
          Ver tudo
        </a>

        <div className="flex items-center self-center gap-1 ml-auto text-palleteBlue10">
          <button className="flex hover:ring-2 ring-palleteBlue10 transition rounded">
            <Icon icon="ep:arrow-left-bold" width="20" />
          </button>

          <button className="flex hover:ring-2 ring-palleteBlue10 transition rounded">
            <Icon icon="ep:arrow-right-bold" width="20" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 w-full overflow-x-auto p-2 snap-x snap-mandatory scroll-px-1">
        {children}
      </div>
    </section>
  );
};
