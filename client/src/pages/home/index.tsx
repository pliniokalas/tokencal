import { useState, useContext, useEffect } from "react";
import { NavContext } from "../../utils/routing";

import SideBar from "../../components/sidebar/index";
import Calendar from "../../components/calendar/index";
import Details from "../../components/details/index";

// import styles from "./styles.module.scss";

type HomeProps = {
  isAuth: boolean,
  logout: () => void,
}

export default function HomePage(props: HomeProps) {
  const { isAuth, logout } = props;
  const nav = useContext(NavContext);

  const [planWindow, setPlanWindow] = useState(false);

  function handleLogout() {
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("token", "");

    logout();
    nav.navigate("/");
  }

  function handleAddPlan() {
    setPlanWindow(true);
  }

  useEffect(() => {
    if (!isAuth) {
      nav.navigate("/");
    }
  },[isAuth]); /* eslint-disable-line */

  return (
    <>
      <SideBar 
        logout={handleLogout} 
        addPlan={handleAddPlan} 
      /> 
      <Calendar />
      { planWindow && <Details close={() => setPlanWindow(false)} /> }
    </>
  );
}


