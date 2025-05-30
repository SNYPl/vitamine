import Link from "next/link";
import styles from "./style.module.scss";
import Navigation from "./navigation/Navigation";
import Cart from "./cart/Cart";
import MobileMenuOpener from "./mobileMenu/menuOpener/MenuOpener";
import Image from "next/image";
import { getAllWishListProductsIds } from "@/lib/wishlist";

const Menu = async () => {
  const productIds = await getAllWishListProductsIds();

  // Pass the actual length of the wishlist instead of just one item
  const wishlistLength = productIds?.length || 0;

  return (
    <section className={styles.menu}>
      <div className="container">
        <div className="menu-wrapper">
          <MobileMenuOpener />
          <Link href={"/"} className={styles.menuLogo}>
            <Image
              src={"/images/vitvitLogo.jpg"}
              alt="logo"
              width={110}
              height={70}
            />
          </Link>
          <Navigation />
          <Cart wishlistLength={wishlistLength} />
        </div>
      </div>
    </section>
  );
};

export default Menu;
