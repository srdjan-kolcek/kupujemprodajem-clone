import React, { useState, useEffect, useCallback } from 'react';
import { FormField } from '../FormField/FormField';
import { BaseEntity } from '../../../models/BaseEntity.model';
import './GenericForm.css';

interface GenericFormProps<T extends BaseEntity> {
  item?: T | Omit<T, 'id'>;
  fields: FormField[];
  onSubmit: (formData: Omit<T, 'id'> | T) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
  formError: string | null;
}

export const GenericForm = <T extends BaseEntity>({
  item,
  fields,
  onSubmit,
  onCancel,
  isEditing,
  formError,
}: GenericFormProps<T>) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [internalFormError, setInternalFormError] = useState<string | null>(null);

  const initializeFormData = useCallback(() => {
    const data: Record<string, any> = {};
    fields.forEach(field => {
      if (field.nestedObjectKey) {
        data[field.name] = isEditing && item && (item as any)[field.name]
          ? (item as any)[field.name].id || ''
          : '';
      } else if (field.type === 'datetime-local' && isEditing && item && (item as any)[field.name]) {
        data[field.name] = (item as any)[field.name].substring(0, 16);
      } else {
        data[field.name] = isEditing && item && (item as any)[field.name] !== undefined
          ? (item as any)[field.name]
          : (field.type === 'number' ? 0 : '');
      }
    });
    return data;
  }, [item, fields, isEditing]);

  useEffect(() => {
    setFormData(initializeFormData());
    setInternalFormError(null);
  }, [item, isEditing, initializeFormData]);


  useEffect(() => {
    setInternalFormError(formError);
  }, [formError]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData };
      const field = fields.find(f => f.name === name);

      if (field?.nestedObjectKey) {
        newData[name] = value ? parseInt(value) : '';
      } else if (field?.type === 'number') {
        newData[name] = parseFloat(value);
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalFormError(null);

    try {
      await onSubmit(formData as T | Omit<T, 'id'>);
    } catch (err: any) {
      setInternalFormError(err.message || 'Greška prilikom spremanja.');
    }
  };


  return (
    <div className="form-container">
      <h2>{isEditing ? 'Uredi stavku' : 'Kreiraj novu stavku'}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">{field.label}</label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="form-select"
              >
                <option value="">Odaberite {field.label.toLowerCase()}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                rows={3}
                required={field.required}
                className="form-textarea"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || (field.type === 'number' ? 0 : '')}
                onChange={handleChange}
                required={field.required}
                step={field.type === 'number' ? '0.01' : undefined}
                className="form-input"
              />
            )}
          </div>
        ))}

        {internalFormError && <div className="form-error">{internalFormError}</div>}

        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="form-button">Poništi</button>
          <button type="submit" className="form-button">{isEditing ? 'Ažuriraj' : 'Dodaj'}</button>
        </div>
      </form>
    </div>
  );
};
