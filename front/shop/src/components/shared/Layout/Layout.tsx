import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { isUserLoggedIn } from '../../../services/AuthService';
import { getLoggedInUsername, logoutUser } from '../../../pages/AuthPage/AuthPage';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      if (isUserLoggedIn()) {
        setIsLoggedIn(true);
        setUsername(getLoggedInUsername() || undefined);
      }
    }, []);
  
    const handleLogin = () => {
      if (isUserLoggedIn()) {
        setIsLoggedIn(true);
        setUsername(getLoggedInUsername() || undefined);
      }
    };
  
    const handleRegister = () => {
      alert('Registracija završena. Možete se prijaviti.');
    };
  
    const handleSignOut = () => {
      logoutUser();
      setIsLoggedIn(false);
      setUsername(undefined);
    };

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
