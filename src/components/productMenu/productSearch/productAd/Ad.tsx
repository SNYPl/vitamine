import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

const Ad = () => {
  return (
    <section className={`${styles.ad} adImage`}>
      <div className={styles.adBackground}>
        <Link href="/product?id=65cbe67306970833b5bfc330" target="_blank">
          <Image
            src="/images/offer.jpg"
            width={1040}
            height={400}
            alt="img"
            priority
          />
        </Link>
      </div>
    </section>
  );
};

export default Ad;
