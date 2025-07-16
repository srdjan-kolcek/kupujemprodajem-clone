import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Oglas } from '../../../models/Oglas.model';
import { FormField } from '../../shared/FormField/FormField';
import { GenericForm } from '../../shared/Form/GenericForm';
import { useCrud } from '../../../hooks/useCrud';

const OglasForm: React.FC = () => {
  const { oglasId } = useParams<{ oglasId: string }>();
  const navigate = useNavigate();

  const { data: oglasi, fetchById, createItem, updateItem, error } = useCrud<Oglas>('oglasi');

  const [oglas, setOglas] = useState<Oglas | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const oglasFields: FormField[] = [
    { name: 'naziv', label: 'Naziv', type: 'text', required: true },
    { name: 'opis', label: 'Opis', type: 'textarea' },
    { name: 'urlSlike', label: 'URL Slike', type: 'url' },
    { name: 'cena', label: 'Cena', type: 'number', required: true },
    { name: 'kategorija', label: 'Kategorija', type: 'select', required: true, nestedObjectKey: 'kategorija' },
    { name: 'korisnik', label: 'Korisnik', type: 'select', required: true, nestedObjectKey: 'korisnik' },
    { name: 'grad', label: 'Grad', type: 'select', required: true, nestedObjectKey: 'grad' },
    { name: 'datumPostavljanja', label: 'Datum postavljanja', type: 'datetime-local', required: true },
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

  const handleSubmit = async (formData: Partial<Oglas>) => {
    try {
      if (oglasId && oglas) {
        await updateItem(oglas.id!, { ...oglas, ...formData } as Oglas);
      } else {
        await createItem(formData as Omit<Oglas, 'id'>);
      }
      navigate('/'); 
    } catch (err: any) {
      setFormError(err.message || 'Greška prilikom snimanja.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{oglasId ? 'Izmena oglasa' : 'Dodavanje oglasa'}</h1>
      <GenericForm<Oglas>
        item={oglas || undefined}
        fields={oglasFields}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={!!oglasId}
        formError={formError}
      />
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  );
};

export default OglasForm;
