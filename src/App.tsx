import { useAuth } from "./hooks/useAuth";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const { user, Login, Logout } = useAuth();

  if (!user) {
    return <LoginPage onLogin={Login} />;
  }

  return <Dashboard user={user} onLogout={Logout} />;
}
