import NavProvider, { Route } from "./utils/routing";

import LoginPage from "./pages/login/index";
import HomePage from "./pages/home/index";

// ================================================== 

function App() {
  return (
    <div className="App">
      <NavProvider>

        <Route href="/">
          <LoginPage />
        </Route>

        <Route href="/home">
          <HomePage />
        </Route>

      </NavProvider>
    </div>
  );
}

export default App;
