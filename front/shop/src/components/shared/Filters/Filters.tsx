import React, { useState, useEffect } from 'react';
import { Kategorija } from '../../../models/Kategorija.model';
import './Filters.css';

interface FiltersProps {
  kategorije: Kategorija[];
  onFilterChange: (filters: {
    kategorijaId: number | null;
    cenaMin: number | null;
    cenaMax: number | null;
    showMineOnly: boolean;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ kategorije, onFilterChange }) => {
  const [kategorijaId, setKategorijaId] = useState<number | null>(null);
  const [cenaMin, setCenaMin] = useState<string>('');  // koristimo string da bi kontrolisali input
  const [cenaMax, setCenaMax] = useState<string>('');
  const [showMineOnly, setShowMineOnly] = useState(false);

  useEffect(() => {
    onFilterChange({
      kategorijaId,
      cenaMin: cenaMin !== '' ? parseFloat(cenaMin) : null,
      cenaMax: cenaMax !== '' ? parseFloat(cenaMax) : null,
      showMineOnly,
    });
  }, [kategorijaId, cenaMin, cenaMax, showMineOnly, onFilterChange]);

  return (
    <div className="filters-bar">
      <label>
        Kategorija:
        <select value={kategorijaId ?? ''} onChange={e => setKategorijaId(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">Sve kategorije</option>
          {kategorije.map(k => (
            <option key={k.id} value={k.id}>{k.naziv}</option>
          ))}
        </select>
      </label>

      <label>
        Cena min:
        <input
          type="number"
          min={0}
          value={cenaMin}
          onChange={e => setCenaMin(e.target.value)}
          placeholder="Min cena"
        />
      </label>

      <label>
        Cena max:
        <input
          type="number"
          min={0}
          value={cenaMax}
          onChange={e => setCenaMax(e.target.value)}
          placeholder="Max cena"
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={showMineOnly}
          onChange={e => setShowMineOnly(e.target.checked)}
        />
        Moji Oglasi
      </label>
    </div>
  );
};

export default Filters;
