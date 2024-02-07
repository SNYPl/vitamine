import Link from "next/link";
import styles from "./style.module.scss";
import Navigation from "./navigation/Navigation";
import Cart from "./cart/Cart";
import MobileMenuOpener from "./mobileMenu/menuOpener/MenuOpener";
import Image from "next/image";

const Menu = () => {
  return (
    <section className={styles.menu}>
      <div className="container">
        <div className="menu-wrapper">
          <MobileMenuOpener />
          <Link href={"/"} className={styles.menuLogo}>
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={139}
              height={37}
            />
          </Link>
          <Navigation />
          <Cart />
        </div>
      </div>
    </section>
  );
};

export default Menu;
