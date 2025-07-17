import React from 'react';
import { Oglas } from '../../../models/Oglas.model';
import { Korisnik } from '../../../models/Korisnik.model';
import { useNavigate } from 'react-router-dom';
import './Card.css';

interface CardProps {
  oglas: Oglas;
  korisnik: Korisnik | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ oglas, korisnik, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const isOwner = korisnik && korisnik.korisnickoIme === oglas.korisnik.korisnickoIme;


  return (
    <div className="card" onClick={() => navigate(`/oglas/${oglas.id}`)}>
      <img className="card__image" src={oglas.urlSlike} alt={oglas.naziv} />
      <div className="card__content">
        <h3 className="card__name">{oglas.naziv}</h3>
        <p className="card__info">{oglas.cena.toLocaleString()} RSD</p>
        {isOwner && (
          <div className="card__buttons" onClick={(e) => e.stopPropagation()}>
            <button className="card__button card__button--edit" onClick={() => onEdit(oglas.id!)}>Izmeni</button>
            <button className="card__button card__button--delete" onClick={() => onDelete(oglas.id!)}>Obriši</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
