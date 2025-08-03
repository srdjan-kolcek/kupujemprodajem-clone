import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Oglas } from '../../../models/Oglas.model';
import { FormField } from '../../shared/FormField/FormField';
import { GenericForm } from '../../shared/Form/GenericForm';
import { useCrud } from '../../../hooks/useCrud';
import { Kategorija } from '../../../models/Kategorija.model';
import { Grad } from '../../../models/Grad.model';
import { Korisnik } from '../../../models/Korisnik.model';
import { getLoggedInUser } from '../../../services/AuthService';
import './OglasForm.css';


const OglasForm: React.FC = () => {
  const { oglasId } = useParams<{ oglasId: string }>();
  const navigate = useNavigate();

  const { data: oglasi, fetchById, createItem, updateItem, error } = useCrud<Oglas>('oglasi');

  const [oglas, setOglas] = useState<Oglas | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { data: kategorije } = useCrud<Kategorija>('kategorije');
  const { data: gradovi } = useCrud<Grad>('gradovi');

  const oglasFields: FormField[] = [
    { name: 'naziv', label: 'Naziv', type: 'text', required: true },
    { name: 'opis', label: 'Opis', type: 'textarea' },
    { name: 'urlSlike', label: 'URL Slike', type: 'url' },
    { name: 'cena', label: 'Cena', type: 'number', required: true },
    {
      name: 'kategorija',
      label: 'Kategorija',
      type: 'select',
      required: true,
      nestedObjectKey: 'kategorija',
      options: kategorije.map(k => ({ value: k.id!, label: k.naziv }))
    },
    {
      name: 'grad',
      label: 'Grad',
      type: 'select',
      required: true,
      nestedObjectKey: 'grad',
      options: gradovi.map(g => ({ value: g.id!, label: `${g.naziv} (${g.drzava?.naziv || 'N/A'})` }))
    },
  ];

  useEffect(() => {
    const loadOglas = async () => {
      if (oglasId) {
        const fetched = await fetchById(parseInt(oglasId));
        if (fetched) setOglas(fetched);
      }
    };
    loadOglas();
  }, [oglasId, fetchById]);

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = async (formData: Partial<Oglas>) => {
    try {
      const user = getLoggedInUser();
      if (!user) {
        alert('Morate biti prijavljeni da biste dodali oglas.');
        return;
      }

      const finalData = {
        naziv: formData.naziv,
        opis: formData.opis,
        urlSlike: formData.urlSlike,
        cena: formData.cena,
        kategorija: { id: formData.kategorija as unknown as number },
        grad: { id: formData.grad as unknown as number },
        korisnik: { id: user.id! },
        datumPostavljanja: new Date().toISOString(),
      };

      if (oglasId && oglas) {
        await updateItem(parseInt(oglasId), { id: parseInt(oglasId), ...finalData } as Oglas);
      } else {
        await createItem(finalData as Omit<Oglas, 'id'>);
      }
      navigate('/');
    } catch (err: any) {
      console.error('Failed to submit form:', err);
      setFormError(err.message || 'Greška prilikom snimanja.');
    }
  };

  return (
    <div className="oglas-form-container">
      <h1 className="oglas-form-title">{oglasId ? 'Izmena oglasa' : 'Dodavanje oglasa'}</h1>

      <GenericForm<Oglas>
        item={oglas || undefined}
        fields={oglasFields}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={!!oglasId}
        formError={formError}
      />

      {error && <div className="oglas-form-error">{error.message}</div>}
    </div>
  );
};

export default OglasForm;
