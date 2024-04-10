import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

const Ad = () => {
  const imageUrl =
    "https://vitvit123.s3.eu-north-1.amazonaws.com/offer/offer.jpg";

  const isValidImageUrl = (url: string) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
  };
  return (
    <section className={`${styles.ad} adImage`}>
      <div className={styles.adBackground}>
        {isValidImageUrl(imageUrl) && (
          <img src={imageUrl} width={1040} height={400} alt="" />
        )}
      </div>
    </section>
  );
};

export default Ad;
