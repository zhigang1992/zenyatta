import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditPage from "./pages/EditPage";
import { Provider } from "react-slot-fill";

const App: React.FC = () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/:editorHash/:startWith">
            <EditPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
