import React from "react";
import styles from "./style.module.scss";
import NavItems from "./navItems";

function Navigator() {
  return (
    <ul className={`${styles.navigation} nav-menu`}>
      <NavItems />
    </ul>
  );
}

export default React.memo(Navigator);
