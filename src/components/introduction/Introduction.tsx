import style from "./style.module.scss";
import ProductList from "./productList/ProductList";
import {
  introductionBestSales,
  introductionDaleOfWeek,
  introductionDiscounted,
} from "@/lib/introduction";

export const revalidate = 3600;

const Introduction: React.FC = async ({}) => {
  const bestSellingItems = JSON.parse(await introductionBestSales());
  const daleOfWeek = JSON.parse(await introductionDaleOfWeek());
  const discounted = JSON.parse(await introductionDiscounted());

  return (
    <section className={`${style.introduction}`}>
      <ProductList title="კვირის შემოთავაზება" products={daleOfWeek} />

      <ProductList title="საუკეთესო გაყიდვადი" products={bestSellingItems} />

      <ProductList title="ფასდაკლებული" products={discounted} />
    </section>
  );
};

export default Introduction;
