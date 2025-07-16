import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Korisnik } from '../../models/Korisnik.model';
import { Oglas } from '../../models/Oglas.model';
import Card from '../../components/ui/Card/Card';
import { useCrud } from '../../hooks/useCrud';
import { getLoggedInUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';


const Homepage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Korisnik | null>(null);
  const { data: oglasi, loading, error, deleteItem, fetchAll } = useCrud<Oglas>('oglasi');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLoggedInUser();
    setCurrentUser(user);
    fetchAll();
  }, []);

  const handleDelete = async (oglasId: number) => {
    try {
      await deleteItem(oglasId);
      alert('Oglas uspešno obrisan.');
      await fetchAll();
    } catch (err) {
      console.error(err);
      alert('Greška pri brisanju oglasa.');
    }
  };

  const handleEdit = (oglasId: number) => {
    console.log(`Navigacija na izmenu oglasa ID: ${oglasId}`);
    navigate(`/oglas/${oglasId}`);
  };

  if (loading) return <div className="loading">Učitavanje oglasa...</div>;
  if (error) return <div className="error">Greška: {error.message}</div>;
  if (!oglasi || oglasi.length === 0) return <div className="no-ads">Trenutno nema oglasa.</div>;

  return (
    <div className="homepage">
      <h1>Svi oglasi</h1>
      <div className="ads-container">
        {oglasi.map((oglas) => (
          <Card
            key={oglas.id}
            oglas={oglas}
            korisnik={currentUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
