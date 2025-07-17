import { BaseEntity } from "./BaseEntity.model";
import { Grad } from "./Grad.model";
import { Kategorija } from "./Kategorija.model";
import { Korisnik } from "./Korisnik.model";

export type Oglas = BaseEntity & {
    naziv: string;
    opis: string;
    urlSlike: string;
    cena: number;
    kategorija: Kategorija;
    korisnik: Korisnik;
    grad: Grad;
    datumPostavljanja: string;
}