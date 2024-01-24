import Link from "next/link";
import styles from "./style.module.scss";

const Socials = () => {
  return (
    <ul className={`${styles.icons}`}>
      <li>
        <Link href="#">
          <i className="fab fa-facebook-f"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-twitter"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-invision"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-pinterest-p"></i>
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
