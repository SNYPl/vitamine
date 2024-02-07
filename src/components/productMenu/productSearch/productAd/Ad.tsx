import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

const Ad = () => {
  return (
    <section className={`${styles.ad} adImage`}>
      <div className={styles.adBackground}>
        <Image
          src="/images/home/vit.jfif"
          width={1070}
          height={455}
          alt="img"
          priority
        />
      </div>
      <div className={styles.adInfo}>
        <h4>ტოპ ბრენდები</h4>
        <h2>საუკეთესო ხარისხის პროდუქცია</h2>
        <h3>საუკეთესო ფასად</h3>
        <Link href={"/shop"}>იყიდე</Link>
      </div>
    </section>
  );
};

export default Ad;
