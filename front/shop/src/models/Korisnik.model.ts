export type Korisnik = BaseEntity & {
    korisnickoIme: string;
    sifra: string;
    datumRegistracije: string;
    brojTelefona: string;
}

export type LoginPayload = {
    korisnickoIme: string;
    sifra: string;
}