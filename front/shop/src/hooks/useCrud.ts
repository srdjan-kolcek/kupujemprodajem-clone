import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/BaseService';

export const useCrud = <T extends BaseEntity>(resourceName: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.get<T[]>(resourceName);
            setData(result);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [resourceName]);

    const fetchById = useCallback(async (id: number): Promise<T | null> => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.get<T>(`${resourceName}/${id}`);
            return result;
        } catch (err: any) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [resourceName]);

    const createItem = useCallback(async (item: Omit<T, 'id'>): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const newItem = await api.post<T>(resourceName, item);
            setData((prevData) => [...prevData, newItem]); 
            return newItem;
        } catch (err: any) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [resourceName]);

    const updateItem = useCallback(async (id: number, updatedItem: T): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.put<T>(`${resourceName}/${id}`, updatedItem);
            setData((prevData) =>
                prevData.map((item) => (item.id === id ? result : item))
            );
            return result;
        } catch (err: any) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [resourceName]);

    const deleteItem = useCallback(async (id: number): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await api.delete<void>(`${resourceName}/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id)); // Remove item from the list
        } catch (err: any) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [resourceName]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]); 

    return {
        data,
        loading,
        error,
        fetchAll,
        fetchById,
        createItem,
        updateItem,
        deleteItem,
    };
};
