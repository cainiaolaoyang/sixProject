import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { LoginPage } from 'page/login';
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user? <AuthenticatedApp/>: <LoginPage/>}
    </div>
  );
}

export default App;
