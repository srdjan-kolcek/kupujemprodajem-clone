import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

const Header: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleRegisterClick = () => {
    navigate('/auth/register');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleAddOglasClick = () => {
    navigate('/oglas/form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <span> KupujemProdajem App</span>
        </Link>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Pretraži oglase..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div className="header-actions">
        {isLoggedIn ? (
          <>
            <span className="welcome-message">Zdravo, {username}!</span>
            <button className="btn-add" onClick={handleAddOglasClick}>
              Dodaj oglas
            </button>
            <button className="btn-signout" onClick={handleLogoutClick}>
              Odjavi se
            </button>
          </>
        ) : (
          <>
            <button className="btn-login" onClick={handleLoginClick}>
              Prijavi se
            </button>
            <button className="btn-register" onClick={handleRegisterClick}>
              Registruj se
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
