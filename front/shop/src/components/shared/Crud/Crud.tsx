import { useState } from "react";
import { useCrud } from "../../../hooks/useCrud";
import { Drzava } from "../../../models/Drzava.model";
import { Grad } from "../../../models/Grad.model";
import { Kategorija } from "../../../models/Kategorija.model";
import { Korisnik } from "../../../models/Korisnik.model";
import { GenericForm } from "../Form/GenericForm";
import { FormField } from "../FormField/FormField";
import { BaseEntity } from "../../../models/BaseEntity.model";

interface CrudComponentProps<T extends BaseEntity> {
    resourceName: string;
    title: string;
    fields: FormField[];
    tableHeaders: { key: string; label: string; render?: (item: T) => React.ReactNode }[];
    onDeleteConfirm: (id: number) => boolean;
}

export const CrudComponent = <T extends BaseEntity>({
    resourceName,
    title,
    fields,
    tableHeaders,
    onDeleteConfirm
}: CrudComponentProps<T>) => {
    const { data, loading, error, createItem, updateItem, deleteItem } = useCrud<T>(resourceName);
    const [editingItem, setEditingItem] = useState<T | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const { data: drzave } = useCrud<Drzava>('drzave');
    const { data: kategorije } = useCrud<Kategorija>('kategorije');
    const { data: korisnici } = useCrud<Korisnik>('korisnici');
    const { data: gradovi } = useCrud<Grad>('gradovi');

    const formFieldsWithOptions: FormField[] = fields.map(field => {
    if (field.name === 'drzava' && field.type === 'select') {
        return { ...field, options: drzave.map(d => ({ value: d.id!, label: d.naziv })) };
    }
    if (field.name === 'kategorija' && field.type === 'select') {
        return { ...field, options: kategorije.map(k => ({ value: k.id!, label: k.naziv })) };
    }
    if (field.name === 'korisnik' && field.type === 'select') {
        return { ...field, options: korisnici.map(k => ({ value: k.id!, label: k.korisnickoIme })) };
    }
    if (field.name === 'grad' && field.type === 'select') {
        return { ...field, options: gradovi.map(g => ({ value: g.id!, label: `${g.naziv} (${g.drzava?.naziv || 'N/A'})` })) };
    }
    return field;
});


    const handleSubmit = async (formData: Omit<T, 'id'> | T) => {
        setFormError(null);
        try {
            if (editingItem) {
                await updateItem(editingItem.id!, formData as T);
            } else {
                await createItem(formData as Omit<T, 'id'>);
            }
            setShowForm(false);
            setEditingItem(null);
        } catch (err: any) {
            setFormError(err.message || `Greška prilikom spremanja ${title.toLowerCase()}.`);
        }
    };

    const handleDelete = async (id: number) => {
        if (onDeleteConfirm(id)) {
            try {
                await deleteItem(id);
            } catch (err: any) {
                console.error(`Greška prilikom brisanja ${title.toLowerCase()}:`, err);
            }
        }
    };

    return (
        <div>
            <h2>{title}</h2>

            <div>
                <button
                    onClick={() => { setEditingItem(null); setShowForm(true); setFormError(null); }}
                >
                    Dodaj novu {title.toLowerCase().slice(0, -1)}{title.toLowerCase().endsWith('e') ? 'u' : 'u'}
                </button>
            </div>

            {showForm && (
                <GenericForm<T>
                    item={editingItem || undefined}
                    fields={formFieldsWithOptions}
                    onSubmit={handleSubmit}
                    onCancel={() => { setShowForm(false); setEditingItem(null); setFormError(null); }}
                    isEditing={!!editingItem}
                    formError={formError}
                />
            )}

            {loading && <div className="text-center text-gray-600 text-lg mt-8">Učitavanje {title.toLowerCase()}...</div>}
            {error && <div className="text-center text-red-600 text-lg mt-8">Greška: {error.message}</div>}

            {!loading && !error && data.length === 0 && (
                <div className="text-center text-gray-600 text-lg mt-8">Nema pronađenih {title.toLowerCase()}.</div>
            )}

            {!loading && !error && data.length > 0 && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={header.key}>
                                        {header.label}
                                    </th>
                                ))}
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    {tableHeaders.map(header => (
                                        <td key={`${item.id}-${header.key}`}>
                                            {header.render ? header.render(item) : item[header.key]}
                                        </td>
                                    ))}
                                    <td>
                                        <button
                                            onClick={() => { setEditingItem(item); setShowForm(true); setFormError(null); }}
                                        >
                                            Uredi
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id!)}
                                        >
                                            Obriši
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
