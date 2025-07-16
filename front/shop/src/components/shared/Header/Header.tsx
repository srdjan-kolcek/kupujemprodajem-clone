import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    const handleRegisterClick = () => {
        navigate('/auth');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <span> KupujemProdajem App</span>
                </Link>
            </div>

            <div className="header-search">
                <input type="text" placeholder="Pretraži oglase..." />
            </div>

            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        <span className="welcome-message">Zdravo, {username}!</span>
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
