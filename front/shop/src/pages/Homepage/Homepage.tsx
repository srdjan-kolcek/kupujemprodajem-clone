import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Oglas } from '../../models/Oglas.model';
import { Kategorija } from '../../models/Kategorija.model';
import Card from '../../components/ui/Card/Card';
import { useCrud } from '../../hooks/useCrud';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import { getLoggedInUser } from '../../services/AuthService';
import Filters from '../../components/shared/Filters/Filters';
import { useSearch } from '../../components/context/SearchContext';

const Homepage: React.FC = () => {
  const { username, isLoggedIn } = useAuth();
  const { data: oglasi, loading, error, deleteItem, fetchAll } = useCrud<Oglas>('oglasi');
  const { data: kategorije } = useCrud<Kategorija>('kategorije');
  const navigate = useNavigate();
  const { searchTerm } = useSearch();

  const [filters, setFilters] = useState<{
    kategorijaId: number | null;
    cenaMin: number | null;
    cenaMax: number | null;
    showMineOnly: boolean;
  }>({
    kategorijaId: null,
    cenaMin: null,
    cenaMax: null,
    showMineOnly: false,
  });

  const [filteredOglasi, setFilteredOglasi] = useState<Oglas[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!oglasi) {
      setFilteredOglasi([]);
      return;
    }

    const user = getLoggedInUser();

    let filtered = oglasi;

    if (filters.kategorijaId) {
      filtered = filtered.filter(o => o.kategorija?.id === filters.kategorijaId);
    }

    if (filters.cenaMin !== null) {
      filtered = filtered.filter(o => o.cena >= filters.cenaMin!);
    }

    if (filters.cenaMax !== null) {
      filtered = filtered.filter(o => o.cena <= filters.cenaMax!);
    }

    if (filters.showMineOnly && user) {
      filtered = filtered.filter(o => o.korisnik?.korisnickoIme === user.korisnickoIme);
    }

    // Dodaj filtriranje po searchTerm (case insensitive)
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(o =>
        o.naziv.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredOglasi(filtered);
  }, [filters, oglasi, searchTerm]);

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
    navigate(`/oglas/form/${oglasId}`);
  };

  if (loading) return <div className="loading">Učitavanje oglasa...</div>;
  if (error) return <div className="error">Greška: {error.message}</div>;
  if (!oglasi || oglasi.length === 0) return <div className="no-ads">Trenutno nema oglasa.</div>;

  return (
    <div className="homepage">
      <h1>Svi oglasi</h1>

      <Filters
        kategorije={kategorije || []}
        onFilterChange={setFilters}
      />

      <div className="ads-container">
        {filteredOglasi.length > 0 ? (
          filteredOglasi.map((oglas) => (
            <Card
              key={oglas.id}
              oglas={oglas}
              korisnik={isLoggedIn ? { korisnickoIme: username } as any : null}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-ads">Nema oglasa koji zadovoljavaju kriterijume pretrage.</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
