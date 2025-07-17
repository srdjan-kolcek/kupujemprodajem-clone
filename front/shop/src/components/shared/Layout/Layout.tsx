import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { isUserLoggedIn, getLoggedInUser } from '../../../services/AuthService';
import { SearchProvider } from '../../context/SearchContext';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
      const user = getLoggedInUser();
      setUsername(user?.korisnickoIme);
    }
  }, []);

  return (
    <SearchProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </SearchProvider>
  );
};

export default Layout;
