import React, { useEffect, useState } from 'react';
import './Oglas.css';
import { Oglas } from '../../models/Oglas.model';
import { Korisnik } from '../../models/Korisnik.model';
import { getLoggedInUser } from '../../services/AuthService';
import { oglasService } from '../../services/OglasService';
import { useNavigate } from 'react-router-dom';

interface OglasPrikazProps {
  oglasId: number;
}

const OglasPrikaz: React.FC<OglasPrikazProps> = ({ oglasId }) => {
  const [oglas, setOglas] = useState<Oglas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Korisnik | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getLoggedInUser());
  }, []);

  useEffect(() => {
    const fetchOglas = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await oglasService.fetchById(oglasId);
        setOglas(data);
      } catch (err) {
        setError('Došlo je do greške prilikom učitavanja oglasa.');
      } finally {
        setLoading(false);
      }
    };

    fetchOglas();
  }, [oglasId]);

  const isOwner = oglas && currentUser && oglas.korisnik.id === currentUser.id;

  const handleDeleteClick = async () => {
    if (!oglas) return;

    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj oglas?')) {
      try {
        await oglasService.delete(oglas.id!);
        alert('Oglas uspešno obrisan.');
        navigate('/');
      } catch (err) {
        alert('Došlo je do greške prilikom brisanja oglasa.');
      }
    }
  };

  const handleEditClick = () => {
    console.log(`Navigacija na izmenu oglasa ID: ${oglasId}`);
    navigate(`/oglas/${oglasId}/edit`);
  };

  if (loading) return <div className="loading">Učitavanje oglasa...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!oglas) return null;

  return (
    <div className="oglas-container">
      <div className="oglas-header">
        <h1>{oglas.naziv}</h1>
        <p className="oglas-price">{oglas.cena.toLocaleString()} RSD</p>
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
            <p><span className="label">Postavljeno:</span> {new Date(oglas.datumPostavljanja).toLocaleDateString()}</p>
          </div>

          {isOwner && (
            <div className="oglas-actions">
              <button className="btn btn-edit" onClick={handleEditClick}>Izmeni oglas</button>
              <button className="btn btn-delete" onClick={handleDeleteClick}>Obriši oglas</button>
            </div>
          )}
        </div>

        <div className="oglas-contact-info">
          <h2>Informacije o korisniku</h2>
          <p><span className="label">Korisničko ime:</span> {oglas.korisnik.korisnickoIme}</p>
          <p><span className="label">Broj telefona:</span> {oglas.korisnik.brojTelefona || 'Nije dostupan'}</p>
        </div>
      </div>
    </div>
  );
};

export default OglasPrikaz;
