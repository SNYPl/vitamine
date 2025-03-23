"use client";
import { memo, useState } from "react";
import { Drawer } from "antd";
import styles from "./style.module.scss";

import MobileNavigator from "../menuNavigation/MenuNavigation";

const MobileMenuOpener = () => {
  const [visible, setVisible] = useState(false);
  const onShowDrawer = () => {
    setVisible(true);
  };
  const onCloseDrawer = () => {
    setVisible(false);
  };
  return (
    <>
      <a onClick={onShowDrawer} className={styles.menuOpener} href="#">
        <i className="fas fa-bars" />
      </a>
      <Drawer
        title="Close"
        // placement="right"
        closable={true}
        onClose={onCloseDrawer}
        open={visible}
        placement="left"
        width={320}
      >
        <MobileNavigator onClose={onCloseDrawer} />
      </Drawer>
    </>
  );
};

export default memo(MobileMenuOpener);
