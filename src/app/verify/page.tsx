import styles from "./page.module.css";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import VerifyAccount from "@/components/verify/Verify";

export default function Verify() {
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ParamInfo />
        <VerifyAccount />
        <Companies />
      </div>
    </main>
  );
}
