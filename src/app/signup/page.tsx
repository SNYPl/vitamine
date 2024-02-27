import styles from "./page.module.css";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import SignUp from "@/components/signUp/SignUp";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";

export default function signUp() {
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ParamInfo />
        <SignUp />
        <Companies />
      </div>
    </main>
  );
}
