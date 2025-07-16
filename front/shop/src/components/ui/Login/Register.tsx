// import React, { useState } from 'react';
// import axios from 'axios'; // Importujte axios
// import styles from './Register.module.css';
// import { Korisnik } from '../../../models/Korisnik.model'; // Uvezite Korisnik i RegisterPayload
// import { API_BASE_URL } from '../../../constants';

// interface RegisterProps {
//   onRegisterSuccess: () => void;
//   onNavigateToLogin: () => void;
// }

// const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
//   const [korisnickoIme, setKorisnickoIme] = useState<string>('');
//   const [sifra, setSifra] = useState<string>('');
//   const [brojTelefona, setBrojTelefona] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!korisnickoIme || !sifra || !brojTelefona) {
//       setError('Molimo popunite sva polja.');
//       setLoading(false);
//       return;
//     }

//     const datumRegistracije = new Date().toISOString(); 

//     const newKorisnikData: Korisnik = {
//       korisnickoIme,
//       sifra,
//       brojTelefona,
//       datumRegistracije,
//     };

//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/register`, newKorisnikData);
      
//       console.log('Registracija uspešna:', response.data);
      
//       onRegisterSuccess();
//       alert('Uspešno ste se registrovali! Sada se možete prijaviti.');

//     } catch (err: any) {
//       if (axios.isAxiosError(err) && err.response) {
//         setError(err.response.data.message || 'Greška prilikom registracije.');
//       } else {
//         setError('Došlo je do neočekivane greške. Pokušajte ponovo.');
//         console.error('Register Error:', err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.registerContainer}>
//       <form onSubmit={handleSubmit} className={styles.registerForm}>
//         <h2>Registrujte se</h2>
//         {error && <p className={styles.errorMessage}>{error}</p>}
//         <div className={styles.inputGroup}>
//           <label htmlFor="reg-korisnickoIme">Korisničko ime:</label>
//           <input
//             type="text"
//             id="reg-korisnickoIme"
//             value={korisnickoIme}
//             onChange={(e) => setKorisnickoIme(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="reg-sifra">Lozinka:</label>
//           <input
//             type="password"
//             id="reg-sifra"
//             value={sifra}
//             onChange={(e) => setSifra(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="brojTelefona">Broj telefona:</label>
//           <input
//             type="tel"
//             id="brojTelefona"
//             value={brojTelefona}
//             onChange={(e) => setBrojTelefona(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <button type="submit" className={styles.submitButton} disabled={loading}>
//           {loading ? 'Registracija...' : 'Registruj se'}
//         </button>
//         <p className={styles.formLink}>
//           Već imate nalog? <a href="#" onClick={onNavigateToLogin}>Prijavite se</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { Korisnik } from '../../../models/Korisnik.model';
import { API_BASE_URL } from '../../../constants';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}


const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [korisnickoIme, setKorisnickoIme] = useState<string>('');
  const [sifra, setSifra] = useState<string>('');
  const [brojTelefona, setBrojTelefona] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!korisnickoIme || !sifra || !brojTelefona) {
      setError('Molimo popunite sva polja.');
      setLoading(false);
      return;
    }

    const datumRegistracije = new Date().toISOString(); // Datum registracije u ISO formatu

    const newKorisnikData: Korisnik = {
      korisnickoIme,
      sifra,
      brojTelefona,
      datumRegistracije,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, newKorisnikData);
      
      console.log('Registracija uspešna:', response.data);
      
      onRegisterSuccess();
      alert('Uspešno ste se registrovali! Sada se možete prijaviti.');

    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Greška prilikom registracije.');
      } else {
        setError('Došlo je do neočekivane greške. Pokušajte ponovo.');
        console.error('Register Error:', err);
      }
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
          <label htmlFor="reg-korisnickoIme">Korisničko ime:</label>
          <input
            type="text"
            id="reg-korisnickoIme"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="reg-sifra">Lozinka:</label>
          <input
            type="password"
            id="reg-sifra"
            value={sifra}
            onChange={(e) => setSifra(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="brojTelefona">Broj telefona:</label>
          <input
            type="tel"
            id="brojTelefona"
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
          Već imate nalog? <a href="#" onClick={onNavigateToLogin}>Prijavite se</a>
        </p>
      </form>
    </div>
  );
};

export default Register;