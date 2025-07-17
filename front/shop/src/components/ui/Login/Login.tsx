import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../../constants';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
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

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { korisnickoIme, sifra });
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      const decoded: any = jwtDecode(token);
      login(decoded.sub);
      navigate('/');
    } catch {
      setError('Neispravno korisničko ime ili lozinka.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Prijavite se</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <label htmlFor="korisnickoIme">Korisnicko ime:<input type="text" value={korisnickoIme} onChange={(e) => setKorisnickoIme(e.target.value)} required /></label>
        <label htmlFor="sifra">Sifra:<input type="password" value={sifra} onChange={(e) => setSifra(e.target.value)} required /></label>
        <button type="submit" disabled={loading}>{loading ? 'Prijava...' : 'Prijavi se'}</button>
        <p>Nemate nalog? <Link to="/auth/register">Registrujte se</Link></p>
      </form>
    </div>
  );
};

export default Login;