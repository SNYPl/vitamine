import Link from "next/link";
import styles from "./style.module.scss";
import Socials from "./socials/Socials";

const TopNav = () => {
  return (
    <section className={styles.topNav}>
      <div className={`container `}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <ul>
              <li>
                <i className="fas fa-envelope" />
                info.deercreative@gmail.com
              </li>
              <li>
                <i className="fas fa-phone-alt" />
                +65 11.188.888
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.right__item}>
              <Socials />
            </div>

            <div className={`${styles.right__item} ${styles.logo}`}>
              <Link href="#">
                <i className="fas fa-user" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
