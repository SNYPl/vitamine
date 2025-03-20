"use client";
import styles from "./style.module.scss";
import Socials from "./socials/Socials";
import LoginBtn from "./authBtns/LoginBtn";
import SignOut from "./authBtns/SignOutBtn";
import { useSession } from "next-auth/react";

const TopNav = () => {
  const { data: session } = useSession();

  const linkComponent = !session?.user ? (
    <LoginBtn />
  ) : (
    <SignOut user={session?.user.name} />
  );

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
                +995 558383881
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.right__item}>
              <Socials />
            </div>

            <div className={`${styles.right__item} ${styles.logo}`}>
              {linkComponent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
