import { useState } from "react";
import NavProvider, { Route } from "./utils/routing";

import LoginPage from "./pages/login/index";
import HomePage from "./pages/home/index";

// ================================================== 

function App() {
  const session = JSON.parse(sessionStorage.getItem("auth") as string);
  const [isAuth, setIsAuth] = useState(session || false);

  return (
    <div className="App">
      <NavProvider>

        <Route href="/">
          <LoginPage isAuth={isAuth} login={() => setIsAuth(true)} />
        </Route>

        <Route href="/home">
          <HomePage isAuth={isAuth} logout={() => setIsAuth(false)} />
        </Route>

      </NavProvider>
    </div>
  );
}

export default App;
