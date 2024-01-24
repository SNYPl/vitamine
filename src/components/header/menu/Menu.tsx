import Link from "next/link";
import styles from "./style.module.scss";
import Navigation from "./navigation/Navigation";
import Cart from "./cart/Cart";
import MobileMenuOpener from "./mobileMenu/menuOpener/MenuOpener";

const Menu = () => {
  return (
    <section className={styles.menu}>
      <div className="container">
        <div className="menu-wrapper">
          <MobileMenuOpener />
          <Link href={"#"} className="menu-logo">
            <img src={"/images/logo.png"} alt=" logo" />
          </Link>
          <Navigation />
          <Cart />
        </div>
      </div>
    </section>
  );
};

export default Menu;
