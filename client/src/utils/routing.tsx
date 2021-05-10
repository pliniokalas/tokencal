import { useState, useEffect, useContext, createContext } from "react";

//================================================== 

const NavContext = createContext({ 
  pathname: "", 
  navigate: (pathname: string): void => {},
});

//================================================== 

type NavProps = {
  children: React.ReactNode,
}

function NavProvider({ children }: NavProps) {
  const [pathname, setPathname] = useState(window.location.pathname);

  function navigate(pathname: string): void {
    setPathname(pathname);
    window.history.pushState(null, "", pathname);
  }

  useEffect(() => {
    window.onpopstate = () => {
      setPathname(window.location.pathname)
    }

    return (): void => {
      window.onpopstate = null;
    } 
  }, []);

  const ctx = { pathname, navigate };

  return (
    <NavContext.Provider value={ctx}>
      {children}
    </NavContext.Provider>
  );
}

//================================================== 

type RouteProps = {
  children: React.ReactNode,
  href: string,
}

function Route({ children, href }: RouteProps): any {
  const nav = useContext(NavContext);

  switch(nav.pathname) {
    case href:
      return children;
    default:
      return null;
  }
}

//================================================== 

export { Route, NavContext };
export default NavProvider;
