import { Section } from "./Section";
import { Product } from "./Product";
import { useEffect, useState } from "react";
import { MainApi } from "../../config/api";

type ProductType = {
  id: number;
  name: string;
  price: number;
  points: number;
  img: string;
};

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    setIsLoading(true);

    MainApi.get<ProductType[]>("/products").then(({ data }) => {
      setProductList(data);

      setIsLoading(false);
    });
  }, []);
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:pr-16 lg:px-12 w-full max-w-7xl">
      <Section title="Promoções do dia">
        {isLoading ? (
          <>
            <Product loading />
            <Product loading />
            <Product loading />
          </>
        ) : (
          <>
            {productList.map((item) => {
              return (
                <Product
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imgSource={item.img}
                  id={item.id}
                  points={item.points}
                />
              );
            })}
          </>
        )}
      </Section>

      <Section title="Recomendações">
        {isLoading ? (
          <>
            <Product loading />
            <Product loading />
            <Product loading />
          </>
        ) : (
          <>
            {productList.map((item) => {
              return (
                <Product
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imgSource={item.img}
                  id={item.id}
                  points={item.points}
                />
              );
            })}
          </>
        )}
      </Section>
    </div>
  );
};
