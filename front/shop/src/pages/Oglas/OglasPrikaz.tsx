import React, { useState, useEffect } from 'react';
import './Oglas.css';
import { Oglas } from '../../models/Oglas.model';
import { Korisnik } from '../../models/Korisnik.model';

const MOCK_OGLASI: Oglas[] = [
  {
    id: 101,
    naziv: 'Gaming laptop',
    opis: 'Snažan laptop za igrice, sa RTX 4080 grafikom. U odličnom stanju, korišćen par meseci.',
    urlSlike: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=500',
    cena: 180000,
    kategorija: { id: 1, naziv: 'technology' },
    korisnik: { id: 1, korisnickoIme: 'Peca', sifra: '',brojTelefona: '065/123-4567', datumRegistracije: '2000-12-12'},
    grad: { id: 1, naziv: 'Beograd', drzava: {id:1, naziv: ''} },
    datumPostavljanja: new Date('2024-07-13'),
  },
  {
    id: 102,
    naziv: 'Kožna torba',
    opis: 'Elegantna muška torba, braon boje, potpuno nova.',
    urlSlike: 'https://images.unsplash.com/photo-1521791136064-7094f9416a24?w=500',
    cena: 6500,
    kategorija: { id: 2, naziv: 'accessories' },
    korisnik: { id: 2, korisnickoIme: 'Markoni', sifra: '',brojTelefona: '064/987-6543', datumRegistracije: '2000-12-12' },
    grad: { id: 2, naziv: 'Novi Sad', drzava: {id:1, naziv: ''} },
    datumPostavljanja: new Date('2024-07-12'),
  },
];

// Simuliramo trenutno ulogovanog korisnika
const currentLoggedInUser: Korisnik = {
  id: 1, 
  korisnickoIme: 'Peca',
  sifra: '',
  brojTelefona: '065/123-4567',
  datumRegistracije: ''
};

// Interfejs za props-e komponente Oglas
interface OglasProps {
  oglasId: number; // ID oglasa koji želimo da prikažemo
}

const OglasPrikaz: React.FC<OglasProps> = ({ oglasId }) => {
  const [oglas, setOglas] = useState<Oglas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOglas = async () => {
      try {
        setLoading(true);

        // Simulacija dohvaćanja podataka sa servera
        await new Promise(resolve => setTimeout(resolve, 500));

        const fetchedOglas = MOCK_OGLASI.find(o => o.id === oglasId);

        if (fetchedOglas) {
          setOglas(fetchedOglas);
          setError(null);
        } else {
          setError(`Oglas sa ID-om ${oglasId} nije pronađen.`);
        }
      } catch (err) {
        setError('Došlo je do greške prilikom učitavanja oglasa.');
      } finally {
        setLoading(false);
      }
    };

    fetchOglas();
  }, [oglasId]);

  // Provera da li je trenutno ulogovan korisnik vlasnik oglasa
  const isOwner = oglas && currentLoggedInUser && currentLoggedInUser.id === oglas.korisnik.id;

  const handleDeleteClick = () => {
    // Ovde bi bio API poziv za brisanje oglasa
    console.log(`Želite da obrišete oglas sa ID-om: ${oglasId}`);
  };

  const handleEditClick = () => {
    // Ovde bi bila logika za navigaciju na stranicu za izmenu
    console.log(`Želite da izmenite oglas sa ID-om: ${oglasId}`);
  };

  if (loading) {
    return <div className="loading">Učitavanje oglasa...</div>;
  }

  if (error) {
    return <div className="error">Greška: {error}</div>;
  }

  if (!oglas) {
    return null; // Ne prikazujemo ništa dok se ne učita
  }

  return (
    <div className="oglas-container">
      <div className="oglas-header">
        <h1>{oglas.naziv}</h1>
        <p className="oglas-price">{oglas.cena} RSD</p>
      </div>

      <div className="oglas-content">
        <div className="oglas-image-wrapper">
          <img src={oglas.urlSlike} alt={oglas.naziv} className="oglas-image" />
        </div>
        
        <div className="oglas-details">
          <h2>Detalji o oglasu</h2>
          <p className="oglas-description">{oglas.opis}</p>
          
          <div className="oglas-info-list">
            <p><span className="label">Grad:</span> {oglas.grad.naziv}</p>
            <p><span className="label">Kategorija:</span> {oglas.kategorija.naziv}</p>
            <p><span className="label">Postavljeno:</span> {oglas.datumPostavljanja.toLocaleDateString()}</p>
          </div>

          {/* Dugmići vidljivi samo vlasniku oglasa */}
          {isOwner && (
            <div className="oglas-actions">
              <button className="btn btn-edit" onClick={handleEditClick}>
                Izmeni oglas
              </button>
              <button className="btn btn-delete" onClick={handleDeleteClick}>
                Obriši oglas
              </button>
            </div>
          )}
        </div>

        <div className="oglas-contact-info">
          <h2>Informacije o korisniku</h2>
          <p><span className="label">Korisničko ime:</span> {oglas.korisnik.korisnickoIme}</p>
          <p><span className="label">Broj telefona:</span> {oglas.korisnik.brojTelefona}</p>
        </div>
      </div>
    </div>
  );
};

export default OglasPrikaz;