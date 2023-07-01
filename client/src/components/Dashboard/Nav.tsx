import styles from "./Nav.module.css";

import iconMenu from "../../assets/icons/dashboard/menu.svg";
import { useState } from "react";

export default function Nav() {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [navIn, setNavIn] = useState<any>(null);

  function handleClick() {
    setActiveButton(!activeButton);

    if (activeButton) {
      setNavIn(styles.navIn);
    } else {
      setNavIn(styles.navOut);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions} onClick={() => handleClick()}>
        <img src={iconMenu} />
      </div>
      <nav className={`${styles.navOut} ${navIn}`}>
        <ul>
          <li>Logout</li>
          <li>Movies</li>
          <li>Tv</li>
        </ul>
      </nav>
    </div>
  );
}
