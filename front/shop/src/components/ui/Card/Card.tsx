import React from 'react';
import { Oglas } from '../../../models/Oglas.model';
import { Korisnik } from '../../../models/Korisnik.model';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  oglas: Oglas;
  korisnik: Korisnik | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ oglas, korisnik, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const isOwner = korisnik && korisnik.id === oglas.korisnik.id;

  return (
    <div className="card" onClick={() => navigate(`/oglas/${oglas.id}`)}>
      <img src={oglas.urlSlike} alt={oglas.naziv} />
      <div className="card-body">
        <h3>{oglas.naziv}</h3>
        <p>{oglas.cena.toLocaleString()} RSD</p>
        {isOwner && (
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onEdit(oglas.id!)}>Izmeni</button>
            <button onClick={() => onDelete(oglas.id!)}>Obriši</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
