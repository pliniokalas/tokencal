import { useState } from "react";
import styles from "./styles.module.scss";

type SidebarProps = {
  logout: () => void,
  addPlan: () => void,
}

export default function SideBar(props: SidebarProps) {
  const { logout, addPlan } = props;
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section className={`${styles.sideBar} ${!isVisible ? styles.hidden : ""}`}>
      { isVisible
        ? <SideBarOpen 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          logout={logout}
          addPlan={addPlan}
        />
        : <SideBarClosed 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          logout={logout}
          addPlan={addPlan}
        />
      }
    </section>
  );
}

type SidebarPropsT = {
  toggle: () => void,
  logout: () => void,
  addPlan: () => void
}

function SideBarOpen(props: SidebarPropsT) {
  const { toggle, logout, addPlan } = props;
  const user = JSON.parse(sessionStorage.getItem("user") as string);

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
      <p className={styles.userName}>{user.name}
        <button 
          type="button"
          onClick={logout}
          className={styles.logoutBtn}
        >
          <img src={"./assets/logout.svg"} alt="Sair" />
        </button>
      </p>

      <p className={styles.listTitle}>Esse mês
        <button
          type="button"
          onClick={addPlan}
          className={styles.createPlanBtn}
        >
          <img src={"./assets/plus.svg"} alt="Novo evento" />
        </button>
      </p>

      <ul className={styles.planList}>
        { user.planList.map((item: any) => 
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

function SideBarClosed(props: SidebarPropsT) {
  const { toggle, logout, addPlan } = props;

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
        onClick={logout}
        className={styles.logoutBtn}
      >
        <img src={"./assets/logout.svg"} alt="Sair" />
      </button>

      <button
        type="button"
        onClick={addPlan}
        className={styles.createPlanBtn}
      >
        <img src={"./assets/plus.svg"} alt="Novo evento" />
      </button>
    </>
  );
}
