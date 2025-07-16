// import React, { useState } from 'react';
// import axios from 'axios'; 
// import styles from './Login.module.css';
// import { Korisnik, LoginPayload } from '../../../models/Korisnik.model'; 
// import { API_BASE_URL } from '../../../constants';

// interface LoginProps {
//   onLoginSuccess: (token: string, userDetails?: Korisnik) => void;
//   onNavigateToRegister: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
//   const [korisnickoIme, setKorisnickoIme] = useState<string>('');
//   const [sifra, setSifra] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!korisnickoIme || !sifra) {
//       setError('Molimo popunite sva polja.');
//       setLoading(false);
//       return;
//     }

//     const loginData: LoginPayload = {
//       korisnickoIme,
//       sifra,
//     };

//     try {
//       const response = await axios.post<string>(`${API_BASE_URL}/auth/login`, loginData);
//       const token = response.data; 

//       localStorage.setItem('jwtToken', token);
//       console.log('Login successful, token received:', token);

//       onLoginSuccess(token); 

//       alert('Uspešno ste se prijavili!');

//     } catch (err: any) {
//       if (axios.isAxiosError(err) && err.response) {
//         setError(err.response.data.message || 'Netačno korisničko ime ili lozinka.');
//       } else {
//         setError('Došlo je do neočekivane greške. Pokušajte ponovo.');
//         console.error('Login Error:', err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <form onSubmit={handleSubmit} className={styles.loginForm}>
//         <h2>Prijavite se</h2>
//         {error && <p className={styles.errorMessage}>{error}</p>}
//         <div className={styles.inputGroup}>
//           <label htmlFor="username">Korisničko ime:</label>
//           <input
//             type="text"
//             id="username"
//             value={korisnickoIme}
//             onChange={(e) => setKorisnickoIme(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="password">Lozinka:</label>
//           <input
//             type="password"
//             id="password"
//             value={sifra}
//             onChange={(e) => setSifra(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <button type="submit" className={styles.submitButton} disabled={loading}>
//           {loading ? 'Prijavljivanje...' : 'Prijavi se'}
//         </button>
//         <p className={styles.formLink}>
//           Nemate nalog? <a href="#" onClick={onNavigateToRegister}>Registrujte se</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importujte jwt-decode
import styles from './Login.module.css';
import { Korisnik, LoginPayload } from '../../../models/Korisnik.model';
import { API_BASE_URL } from '../../../constants';

interface LoginProps {
  // Sada prosleđujemo i token i dekodirane korisničke podatke (ako ih token sadrži)
  onLoginSuccess: (token: string, decodedUser: { korisnickoIme: string, [key: string]: any }) => void;
  onNavigateToRegister: () => void;
}


const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [korisnickoIme, setKorisnickoIme] = useState<string>('');
  const [sifra, setSifra] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!korisnickoIme || !sifra) {
      setError('Molimo popunite sva polja.');
      setLoading(false);
      return;
    }

    const loginData: LoginPayload = {
      korisnickoIme,
      sifra,
    };

    try {
      const response = await axios.post<string>(`${API_BASE_URL}/auth/login`, loginData);
      const token = response.data; // Server vraća samo token kao string

      localStorage.setItem('jwtToken', token); // Sačuvajte token

      // Dekodirajte token da biste dobili korisničke podatke iz njega
      // Pretpostavljamo da token sadrži 'korisnickoIme' kao deo payload-a
      const decoded: { korisnickoIme: string, [key: string]: any } = jwtDecode(token);
      console.log('Dekodiran token:', decoded);

      if (!decoded.korisnickoIme) {
        throw new Error('Token ne sadrži očekivano korisničko ime.');
      }
      
      // Prosledite i token i dekodirane podatke roditeljskoj komponenti
      onLoginSuccess(token, decoded);
      alert(`Uspešno ste se prijavili, ${decoded.korisnickoIme}!`);

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Netačno korisničko ime ili lozinka.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Došlo je do neočekivane greške. Pokušajte ponovo.');
        console.error('Login Error:', err);
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
          Nemate nalog? <a href="#" onClick={onNavigateToRegister}>Registrujte se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;