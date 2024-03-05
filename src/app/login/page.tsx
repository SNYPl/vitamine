import styles from "./page.module.css";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import LoginComp from "@/components/login/Login";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import { getCurrentUser } from "@/components/helper/session";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return (
    <main className={styles.main}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ParamInfo />
        <LoginComp />
        <Companies />
      </div>
    </main>
  );
}
