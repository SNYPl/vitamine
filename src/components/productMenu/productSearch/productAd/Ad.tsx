import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button/Button";

const Ad = () => {
  return (
    <section className={styles.ad}>
      <div className={styles.adBackground}>
        <Image
          src="/images/home/adBgrnd.png"
          width={1070}
          height={405}
          alt="img"
          priority
        />
      </div>
      <div className={styles.adInfo}>
        <h4>FRUIT FRESH</h4>
        <h2>Orange Lemon</h2>
        <h3>13$</h3>
        <Link href={"#"}>Shop Now</Link>
      </div>
    </section>
  );
};

export default Ad;
