import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/shared/Header/Header';
import Layout from './components/shared/Layout/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    // Ovde bi bila prava logička provera sa backend-om
    setIsLoggedIn(true);
    setUsername('PetarPetrovic');
    console.log('Korisnik je prijavljen');
  };

  const handleRegister = () => {
    // Ovde bi bila prava registracija korisnika
    console.log('Korisnik se registruje');
  };

  const handleSignOut = () => {
    // Ovde bi bila prava logička odjava korisnika
    setIsLoggedIn(false);
    setUsername(undefined);
    console.log('Korisnik je odjavljen');
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSignOut={handleSignOut}
      />
      <Layout />
    </>
  );
}

export default App;
