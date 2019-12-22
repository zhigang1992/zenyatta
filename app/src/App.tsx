import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypeScriptPage from "./pages/TypeScriptPage";
import { Store, StoreContext } from "./mobx/store";

const App: React.FC = () => {
  return (
    <StoreContext.Provider value={new Store()}>
      <Router>
        <Switch>
          <Route path="/start/:startWith">
            <TypeScriptPage />
          </Route>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
