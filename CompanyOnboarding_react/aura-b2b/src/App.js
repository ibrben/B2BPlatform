import { useState } from "react";
import LoginApp from "./Login";
import CompanyPage from "./CompanyPage";

function App() {
  const [authData, setAuthData] = useState(null);

  const handleLoginSuccess = (data) => {
    setAuthData(data);
  };

  const handleLogout = () => {
    setAuthData(null);
  };

  if (authData) {
    return <CompanyPage authData={authData} onLogout={handleLogout} />;
  }

  return <LoginApp onLoginSuccess={handleLoginSuccess} />;
}

export default App;
