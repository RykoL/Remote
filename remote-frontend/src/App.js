import TouchInterfacePage from "./pages/TouchInterfacePage";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SettingsPage from "./pages/SettingsPage";

const App = () => {

  return (
    <Router>
      <a href="/settings">Settings</a>
      <Switch>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/">
          <TouchInterfacePage></TouchInterfacePage>
        </Route>
      </Switch>

    </Router>
  );
};

export default App;
