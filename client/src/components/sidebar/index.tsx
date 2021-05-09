import { useState } from "react";
import styles from "./styles.module.scss";

export default function SideBar() {
  const [isVisible, setIsVisible] = useState(true);
  const userName = "Plinio";

  return (
    <section className={`${styles.sideBar} ${!isVisible ? styles.hidden : ""}`}>
      { isVisible
        ? <SideBarOpen 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          userName={userName}
          planList={[]}
        />
        : <SideBarClosed toggle={() => setIsVisible((prev: boolean) => !prev)} />
      }
    </section>
  );
}

function SideBarOpen(props) {
  const { toggle, userName, planList } = props;

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={styles.hideSidebarBtn}
      >
        <img src={"./assets/left.svg"} alt="Esconder" />
      </button>

      <p className={styles.logo}>TokenCal</p>
      <p className={styles.userName}>{userName}
        <button 
          type="button"
          onClick={() => {}}
          className={styles.logoutBtn}
        >
          <img src={"./assets/logout.svg"} alt="Sair" />
        </button>
      </p>

      <p className={styles.listTitle}>Esse mês
        <button
          type="button"
          onClick={() => {}}
          className={styles.createPlanBtn}
        >
          <img src={"./assets/plus.svg"} alt="Novo evento" />
        </button>
      </p>

      <ul className={styles.planList}>
        { planList.map((item) => 
        <li key={item}>
          <button
            type="button"
            className={styles.planBtn}
            onClick={() => {}}
          >
            {item}
          </button>
        </li>)
        }
      </ul>
    </>
  )
}

function SideBarClosed(props) {
  const { toggle } = props;

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={styles.hideSidebarBtn}
      >
        <img src={"./assets/right.svg"} alt="Mostrar" />
      </button>

      <button 
        type="button"
        onClick={() => {}}
        className={styles.logoutBtn}
      >
        <img src={"./assets/logout.svg"} alt="Sair" />
      </button>

      <button
        type="button"
        onClick={() => {}}
        className={styles.createPlanBtn}
      >
        <img src={"./assets/plus.svg"} alt="Novo evento" />
      </button>
    </>
  );
}
