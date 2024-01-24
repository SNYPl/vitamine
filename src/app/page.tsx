import Image from "next/image";
import styles from "./page.module.css";
import ProductMenu from "@/components/productMenu/ProductMenu";
import Services from "@/components/services/Services";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={"container"}>
        <ProductMenu />
        <Services />
      </div>
    </main>
  );
}
