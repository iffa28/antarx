import LoginPage from './features/auth/pages/LoginPage.jsx';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('login');

  if (page === 'register') {
    return <RegisterPage onGoToLogin={() => setPage('login')} />;
  }
  return <LoginPage onGoToRegister={() => setPage('register')} />;
}

export default App;
