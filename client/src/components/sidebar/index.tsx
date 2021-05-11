import { useState } from "react";
import styles from "./styles.module.scss";

// ================================================== 

type Plan = {
    id: string,
    name: string,
    desc: string,
    start: Date,
    end: Date
}

type SidebarProps = {
  logout: () => void,
  openDetails: (data?: Plan) => void,
}

export default function SideBar(props: SidebarProps) {
  const { logout, openDetails } = props;
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section className={`${styles.sideBar} ${!isVisible ? styles.hidden : ""}`}>
      { isVisible
        ? <SideBarOpen 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          logout={logout}
          openDetails={openDetails}
        />
        : <SideBarClosed 
          toggle={() => setIsVisible((prev: boolean) => !prev)} 
          logout={logout}
          openDetails={openDetails}
        />
      }
    </section>
  );
}

// ================================================== 

type SidebarPropsT = {
  toggle: () => void,
  logout: () => void,
  openDetails: (data?: Plan) => void
}

function SideBarOpen(props: SidebarPropsT) {
  const { toggle, logout, openDetails } = props;
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
          onClick={() => openDetails()}
          className={styles.createPlanBtn}
        >
          <img src={"./assets/plus.svg"} alt="Novo evento" />
        </button>
      </p>

      <ul className={styles.planList}>
        { user.plans.map((item: Plan) =>
          <li key={item.id}>
            <button
              type="button"
              className={styles.planBtn}
              onClick={() => openDetails(item)}
            >
              {item.name}
            </button>
          </li>)
        }
      </ul>
    </>
  )
}

// ================================================== 

function SideBarClosed(props: SidebarPropsT) {
  const { toggle, logout, openDetails } = props;

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
        onClick={() => openDetails()}
        className={styles.createPlanBtn}
      >
        <img src={"./assets/plus.svg"} alt="Novo evento" />
      </button>
    </>
  );
}
