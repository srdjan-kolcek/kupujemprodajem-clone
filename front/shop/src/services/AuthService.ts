import { jwtDecode } from 'jwt-decode';
import { Korisnik } from '../models/Korisnik.model';

const TOKEN_KEY = 'jwtToken';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isUserLoggedIn = (): boolean => {
  return !!getToken();
};

export const getLoggedInUser = (): Korisnik | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.sub) return null;

    return {
      id: decoded.id,
      korisnickoIme: decoded.sub,
      sifra: '',
      brojTelefona: decoded.brojTelefona || '',
      datumRegistracije: decoded.datumRegistracije || '',
    };
  } catch {
    return null;
  }
};
