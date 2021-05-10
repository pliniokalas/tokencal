import { useContext, useEffect } from "react";
import { NavContext } from "../../utils/routing";

import SideBar from "../../components/sidebar/index";
import Calendar from "../../components/calendar/index";

// import styles from "./styles.module.scss";

type HomeProps = {
  isAuth: boolean,
  logout: () => void,
}

export default function HomePage(props: HomeProps) {
  const { isAuth, logout } = props;
  const nav = useContext(NavContext);

  const user = JSON.parse(sessionStorage.getItem("user") as string);

  function handleLogout() {
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("token", "");

    logout();
    nav.navigate("/");
  }

  function handleAddPlan() {
  }

  useEffect(() => {
    if (!isAuth) {
      nav.navigate("/");
    }
  },[isAuth]);

  return (
    <>
      <SideBar 
        logout={handleLogout} 
        addPlan={handleAddPlan} 
        user={user} 
      /> 
      <Calendar />
    </>
  );
}


