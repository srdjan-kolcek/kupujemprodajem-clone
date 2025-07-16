import React, { useState, useEffect } from 'react';
import { Korisnik } from '../../models/Korisnik.model';
import Register from '../../components/ui/Login/Register';
import Login from '../../components/ui/Login/Login';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom'; // Ako koristite React Router

function AuthPage() {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<Korisnik | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  // const navigate = useNavigate();

  const handleLoginSuccess = (token: string, decodedUserPayload: { korisnickoIme: string, [key: string]: any }) => {
    setJwtToken(token);
    localStorage.setItem('jwtToken', token);

    const userFromToken: Korisnik = {
        korisnickoIme: decodedUserPayload.korisnickoIme,
        sifra: '',
        brojTelefona: decodedUserPayload.brojTelefona || 'Nije dostupan', // Ako je telefon u tokenu
        datumRegistracije: decodedUserPayload.datumRegistracije || new Date().toISOString(), // Ako je datum u tokenu
    };
    setLoggedInUser(userFromToken);

    alert(`Uspešna prijava! Dobrodošao, ${userFromToken.korisnickoIme}!`);
    // navigate('/dashboard'); 
  };

  const handleRegisterSuccess = () => {
    setShowLogin(true);
    alert('Registracija uspešna! Sada se možete prijaviti.');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      try {
        const decoded: { korisnickoIme: string, [key: string]: any } = jwtDecode(storedToken);
        if (decoded.korisnickoIme) {
          setJwtToken(storedToken);
          const userFromToken: Korisnik = {
            korisnickoIme: decoded.korisnickoIme,
            sifra: '',
            brojTelefona: decoded.brojTelefona || 'Nije dostupan',
            datumRegistracije: decoded.datumRegistracije || new Date().toISOString(),
          };
          setLoggedInUser(userFromToken);
          // navigate('/dashboard');
        } else {
          localStorage.removeItem('jwtToken');
        }
      } catch (e) {
        console.error('Failed to decode token from localStorage:', e);
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  if (loggedInUser && jwtToken) {
    return (
      <div className="welcome-screen">
        <h1>Dobrodošao nazad, {loggedInUser.korisnickoIme}!</h1>
        <p>Ovo je tvoj glavni ekran. Šta želiš da radiš danas?</p>
        <button onClick={() => {
            setLoggedInUser(null);
            setJwtToken(null);
            localStorage.removeItem('jwtToken');
            // navigate('/login');
        }}>Odjavi se</button>
      </div>
    );
  }

  return (
    <div className="auth-page-container">
      {showLogin ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setShowLogin(false)}
        />
      ) : (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
}

export default AuthPage;