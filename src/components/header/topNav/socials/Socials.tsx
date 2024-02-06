import Link from "next/link";
import styles from "./style.module.scss";

const Socials = () => {
  return (
    <ul className={`${styles.icons}`}>
      <li>
        <Link
          href="https://www.facebook.com/profile.php?id=61555898082492"
          target="_blank"
        >
          <i className="fab fa-facebook-f"></i>
        </Link>
      </li>

      <li>
        <Link href="#">
          <i className="fab fa-invision"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-twitter"></i>
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
