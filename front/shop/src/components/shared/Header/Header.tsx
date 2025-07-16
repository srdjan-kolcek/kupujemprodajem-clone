import React from 'react';
import './Header.css';

type HeaderProps = {
    isLoggedIn: boolean;
    username?: string;
    onLogin: () => void;
    onRegister: () => void;
    onSignOut: () => void;
};

const Header: React.FC<HeaderProps> = ({
    isLoggedIn, username, onLogin, onRegister, onSignOut
}) => {
    return (
        <header className="header">
            <div className="header-logo">
                <a href="/">
                    {/* Ovde možeš dodati svoj logo (npr. SVG ili sliku) */}
                    <span role="img" aria-label="logo">🛒</span>
                    <span> KupujemProdajem App</span>
                </a>
            </div>

            <div className="header-search">
                <input type="text" placeholder="Pretraži oglase..." />
            </div>

            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        <span className="welcome-message">Zdravo, {username}!</span>
                        <button className="btn-signout" onClick={onSignOut}>
                            Odjavi se
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn-login" onClick={onLogin}>
                            Prijavi se
                        </button>
                        <button className="btn-register" onClick={onRegister}>
                            Registruj se
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
