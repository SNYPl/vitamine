import styles from "./page.module.css";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import SignUp from "@/components/signUp/SignUp";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import { getCurrentUser } from "@/components/helper/session";
import { redirect } from "next/navigation";

export default async function signUp() {
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
        <SignUp />
        <Companies />
      </div>
    </main>
  );
}
