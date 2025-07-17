import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [korisnickoIme, setKorisnickoIme] = useState('');
  const [sifra, setSifra] = useState('');
  const [brojTelefona, setBrojTelefona] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        korisnickoIme,
        sifra,
        brojTelefona,
        datumRegistracije: new Date().toISOString(),
      });
      navigate('/auth');
    } catch {
      setError('Registracija neuspešna.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2>Registrujte se</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="korisnickoIme">Korisničko ime:</label>
          <input
            id="korisnickoIme"
            type="text"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="sifra">Lozinka:</label>
          <input
            id="sifra"
            type="password"
            value={sifra}
            onChange={(e) => setSifra(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="brojTelefona">Broj telefona:</label>
          <input
            id="brojTelefona"
            type="tel"
            value={brojTelefona}
            onChange={(e) => setBrojTelefona(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Registracija...' : 'Registruj se'}
        </button>

        <p className={styles.formLink}>
          Već imate nalog? <Link to="/auth">Prijavite se</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
