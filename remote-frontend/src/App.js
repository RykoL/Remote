import "./App.css"
import TouchInterfacePage from "./pages/TouchInterfacePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useState} from "react";
import SettingsPage from "./pages/SettingsPage";
import {WelcomePage} from "./pages/WelcomePage";
import SettingsService from "./api/SettingsService"

const App = () => {

  const [qrCodeUrl, setQRCodeUrl] = useState();
  SettingsService.whoami().then((localUrl) => {
    setQRCodeUrl(`${localUrl}/api/settings/whoami/qr`);
  });

  return (
    <Router>
      <Switch>
        <Route path="/welcome">
          <WelcomePage qrCodeUrl={qrCodeUrl} />
        </Route>
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
