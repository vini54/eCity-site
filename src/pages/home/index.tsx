import { Section } from "./Section";
import { Product } from "./Product";
import { useEffect, useState } from "react";
import { MainApi } from "../../config/api";
import axios from "axios";

type ProductType = {
  id: number;
  name: string;
  price: number;
  points: number;
  img: string;
  category?: string;
};

type MainApiReq = {
  id: number;
  name: string;
  price: number;
  points: number;
  img: string;
};

type DummyJsonProducts = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  images: string[];
};

type DummyJsonApiReq = {
  products: DummyJsonProducts[];
};

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const FetchProducts = async () => {
    let newProductList: ProductType[] = [...productList];

    await MainApi.get<MainApiReq[]>("/products").then(({ data }) => {
      newProductList = [...newProductList, ...data];
    });

    await axios
      .get<DummyJsonApiReq>("https://dummyjson.com/products?limit=50")
      .then(({ data }) => {
        const newProduct = data.products.map((item) => {
          return {
            id: item.id * 50,
            name: item.title + " " + item.description,
            price: item.price,
            points: item.rating * item.stock,
            img: item.images[2] ? item.images[2] : item.images[0],
            category: item.category,
          };
        });

        newProductList = [...newProductList, ...newProduct];
      });

    setProductList(newProductList);
  };

  useEffect(() => {
    setIsLoading(true);

    FetchProducts().finally(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:pr-16 lg:px-12 w-full max-w-7xl">
      <Section title="Promoções do dia" isLoading={isLoading}>
        {productList.map((item) => {
          if (!item.category) {
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
          }
        })}
      </Section>

      <Section title="Tecnologia" isLoading={isLoading}>
        {productList.map((item) => {
          if (
            [
              "smartphones",
              "laptops",
              "mens-watches",
              "womens-watches",
              "automotive",
            ].includes(item.category!, 0)
          ) {
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
          }
        })}
      </Section>

      <Section title="Beleza e cuidados" isLoading={isLoading}>
        {productList.map((item) => {
          if (["fragrances", "skincare"].includes(item.category!, 0)) {
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
          }
        })}
      </Section>

      <Section title="Moda" isLoading={isLoading}>
        {productList.map((item) => {
          if (
            [
              "tops",
              "womens-dresses",
              "womens-shoes",
              "mens-shirts",
              "mens-shoes",
              "womens-bags",
              "womens-jewellery",
            ].includes(item.category!, 0)
          ) {
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
          }
        })}
      </Section>

      <Section title="Casa e decorações" isLoading={isLoading}>
        {productList.map((item) => {
          if (
            ["home-decoration", "furniture", "lighting"].includes(
              item.category!,
              0
            )
          ) {
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
          }
        })}
      </Section>
    </div>
  );
};
