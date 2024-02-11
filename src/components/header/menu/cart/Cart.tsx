import Link from "next/link";
import styles from "./style.module.scss";
import { formatCurrency } from "../../../../common/utils";

const Cart = () => {
  return (
    <section className={styles.cart}>
      <Link href={"#"} className="function-items-item">
        <i className="fa-regular fa-heart"></i>
      </Link>

      <Link href={"#"} className="function-items-item">
        <i className="fa-solid fa-cart-shopping"></i>

        <span>{formatCurrency(0)}</span>
      </Link>
    </section>
  );
};

export default Cart;
