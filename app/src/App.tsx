import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditPage from "./pages/EditPage";
import { Provider } from "react-slot-fill";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <HomePage />
          </Route>
          <Route path="/:editorHash/:startWith">
            <EditPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
