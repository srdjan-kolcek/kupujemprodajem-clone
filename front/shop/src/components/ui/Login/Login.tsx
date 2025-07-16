import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from './Login.module.css';
import { LoginPayload } from '../../../models/Korisnik.model';
import { API_BASE_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [korisnickoIme, setKorisnickoIme] = useState('');
  const [sifra, setSifra] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!korisnickoIme || !sifra) {
      setError('Molimo popunite sva polja.');
      setLoading(false);
      return;
    }

    const loginData: LoginPayload = { korisnickoIme, sifra };

    try {
      const response = await axios.post<string>(`${API_BASE_URL}/auth/login`, loginData);
      const token = response.data;
      localStorage.setItem('jwtToken', token);

      const decoded: { sub: string } = jwtDecode(token);
      if (!decoded.sub) throw new Error('Token ne sadrži očekivano korisničko ime.');

      login(decoded.sub);
      alert(`Uspešno ste se prijavili, ${decoded.sub}!`);
      navigate('/');

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Netačno korisničko ime ili lozinka.');
      } else {
        setError('Došlo je do greške. Pokušajte ponovo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Prijavite se</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Korisničko ime:</label>
          <input
            type="text"
            id="username"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Lozinka:</label>
          <input
            type="password"
            id="password"
            value={sifra}
            onChange={(e) => setSifra(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>
        <p className={styles.formLink}>
          Nemate nalog? <a href="#" onClick={() => navigate('/auth')}>Registrujte se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
