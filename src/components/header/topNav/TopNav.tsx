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
                <a href="mailto::vitamine.vitvit@gmail.com">
                  vitamine.vitvit@gmail.com
                </a>
              </li>
              <li>
                <i className="fas fa-phone-alt" />
                +995 557 00 76 37
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.right__item}>
              <Socials />
            </div>

            <div className={`${styles.right__item} ${styles.logo}`}>
              <Link href="/login">
                <i className="fas fa-user" />
                შესვლა
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
