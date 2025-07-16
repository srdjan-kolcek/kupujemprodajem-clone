import { Korisnik } from "../../../models/Korisnik.model";
import { Oglas } from "../../../models/Oglas.model";

type CardProps = {
  oglas: Oglas;
  korisnik: Korisnik | null; 
  onDelete?: (oglasId: number) => void;
  onEdit?: (oglasId: number) => void;
}

const Card: React.FC<CardProps> = ({ oglas, korisnik, onDelete, onEdit }) => {
  const isOwner = korisnik && korisnik.id === oglas.korisnik.id;

  const handleDeleteClick = () => {
    if (onDelete) onDelete(oglas.id!);
  };

  const handleEditClick = () => {
    if (onEdit) onEdit(oglas.id!);
  };

  return (
    <div className="card">
      <img src={oglas.urlSlike} alt={oglas.naziv} className="card__image" />
      <div className="card__content">
        <h2 className="card__name">{oglas.naziv}</h2>
        <p className="card__info">
          <span className="card__label">Cena:</span> {oglas.cena} RSD
        </p>
        <p className="card__info">
          <span className="card__label">Grad:</span> {oglas.grad.naziv}
        </p>
        <p className="card__info">
          <span className="card__label">Kategorija:</span> {oglas.kategorija.naziv}
        </p>
        
        {/* Prikaz dugmića samo ako je korisnik vlasnik oglasa */}
        {isOwner && (
          <div className="card__buttons">
            <button
              className="card__button card__button--edit"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="card__button card__button--delete"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;