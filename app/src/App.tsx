import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypeScriptPage from "./pages/TypeScriptPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/start/:startWith">
          <TypeScriptPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
