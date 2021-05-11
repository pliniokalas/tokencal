import { useState, useContext, useEffect } from "react";
import { NavContext } from "../../utils/routing";

import SideBar from "../../components/sidebar/index";
import Calendar from "../../components/calendar/index";
import Details from "../../components/details/index";

// import styles from "./styles.module.scss";

//================================================== 

type Plan = {
    id: string,
    name: string,
    desc: string,
    start: Date,
    end: Date
}

type HomeProps = {
  isAuth: boolean,
  logout: () => void,
}

export default function HomePage(props: HomeProps) {
  const { isAuth, logout } = props;
  const nav = useContext(NavContext);

  const [details, setDetails] = useState({ show: false, data: undefined as Plan | undefined });

  function handleLogout() {
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("token", "");

    logout();
    nav.navigate("/");
  }

  function handleDetails(data?: Plan) {
    setDetails({ show: true, data: data });
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
        openDetails={handleDetails} 
      /> 
      <Calendar />
      { details.show 
        && <Details 
          close={() => setDetails({ show: false, data: undefined })} 
          data={details.data}
        />
      }
    </>
  );
}


