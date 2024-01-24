import styles from "./style.module.scss";
import TopNav from "./topNav/TopNav";
import Menu from "./menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <TopNav />
      <Menu />
    </header>
  );
};

export default Header;
