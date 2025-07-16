import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { Korisnik } from '../../models/Korisnik.model';
import { Oglas } from '../../models/Oglas.model';
import Card from '../../components/ui/Card/Card';


const currentLoggedInUser: Korisnik = {
    id: 1,
    korisnickoIme: 'Petar',
    sifra: '',
    datumRegistracije: '2000-02-02',
    brojTelefona: ''

};

const Homepage: React.FC = () => {
    const [oglasi, setOglasi] = useState<Oglas[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOglasi = async () => {
            try {
                setLoading(true);

                // --- Simualcija API poziva sa kašnjenjem od 1 sekunde ---
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Podaci koji se tačno poklapaju sa vašim modelima
                const mockData: Oglas[] = [
                    {
                        id: 101,
                        naziv: 'Gaming laptop',
                        opis: 'Snažan laptop za igrice, sa RTX 4080 grafikom.',
                        urlSlike: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=500',
                        cena: 180000,
                        kategorija: { id: 1, naziv: 'technology' },
                        korisnik: {
                            id: 1,
                            korisnickoIme: 'Petar',
                            sifra: '',
                            datumRegistracije: '2024-07-11',
                            brojTelefona: ''

                        }, // Vlasnik
                        grad: { id: 1, naziv: 'Beograd', drzava: {id:1, naziv:'srbija'}},
                        datumPostavljanja: new Date('2024-07-13'),
                    },
                    {
                        id: 102,
                        naziv: 'Kožna torba',
                        opis: 'Elegantna muška torba, braon boje.',
                        urlSlike: 'https://images.unsplash.com/photo-1521791136064-7094f9416a24?w=500',
                        cena: 6500,
                        kategorija: { id: 2, naziv: 'accessories' },
                        korisnik: {
                            id: 1,
                            korisnickoIme: 'Petar',
                            sifra: '',
                            datumRegistracije: '2024-07-11',
                            brojTelefona: ''

                        }, // Nije vlasnik
                        grad: { id: 2, naziv: 'Novi Sad', drzava: {id:1, naziv:'srbija'}},
                        datumPostavljanja: new Date('2024-07-12'),
                    },
                    {
                        id: 103,
                        naziv: 'Knjiga o programiranju',
                        opis: 'Naučite React od nule.',
                        urlSlike: 'https://images.unsplash.com/photo-1544947953-f7200875c742?w=500',
                        cena: 1500,
                        kategorija: { id: 3, naziv: 'books' },
                        korisnik: {
                            id: 2,
                            korisnickoIme: 'Petar12331312',
                            sifra: '',
                            datumRegistracije: '2024-07-11',
                            brojTelefona: ''

                        }, // Vlasnik
                        grad: { id: 3, naziv: 'Niš', drzava: {id:1, naziv:'srbija'} },
                        datumPostavljanja: new Date('2024-07-11'),
                    },
                ];

                setOglasi(mockData);
                setError(null);

            } catch (err) {
                setError('Došlo je do greške prilikom učitavanja oglasa.');
            } finally {
                setLoading(false);
            }
        };

        fetchOglasi();
    }, []);

    const handleEdit = (oglasId: number) => {
        console.log(`Želite da izmenite oglas sa ID-om: ${oglasId}`);
        // Ovde bi bila logika za navigaciju na stranicu za izmenu
    };

    const handleDelete = (oglasId: number) => {
        console.log(`Želite da obrišete oglas sa ID-om: ${oglasId}`);
        // Ovde bi bio API poziv za brisanje oglasa
    };

    if (loading) {
        return <div className="loading">Učitavanje oglasa...</div>;
    }

    if (error) {
        return <div className="error">Greška: {error}</div>;
    }

    if (oglasi.length === 0) {
        return <div className="no-ads">Trenutno nema oglasa.</div>;
    }

    return (
        <div className="homepage">
            <h1>Svi oglasi</h1>
            <div className="ads-container">
                {oglasi.map((oglas) => (
                    <Card
                        key={oglas.id}
                        oglas={oglas}
                        korisnik={currentLoggedInUser}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Homepage;