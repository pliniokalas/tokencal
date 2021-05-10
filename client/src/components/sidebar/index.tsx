import { useState } from "react";
import styles from "./styles.module.scss";

type Plan = {
  name: string,
  start: Date,
  end: Date
}

type SidebarProps = {
  logout: () => void,
  addPlan: () => void,
  user: {
    name: string,
    plans: [Plan],
    planList: [string]
  }
}

export default function SideBar(props: SidebarProps) {
  const { user, logout, addPlan } = props;
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section className={`${styles.sideBar} ${!isVisible ? styles.hidden : ""}`}>
      { isVisible
        ? <SideBarOpen 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          logout={logout}
          addPlan={addPlan}
          userName={user.name}
          planList={user.planList}
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
  userName?: string,
  planList?: Array<string>,
  logout: () => void,
  addPlan: () => void
}

function SideBarOpen(props: SidebarPropsT) {
  const { 
    toggle, 
    userName, 
    planList,
    logout,
    addPlan
  } = props;

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
        { planList?.map((item) => 
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
