import { useState } from "react";
import { CrudComponent } from "./Crud";
import { Drzava } from "../../../models/Drzava.model";
import { Oglas } from "../../../models/Oglas.model";
import { Grad } from "../../../models/Grad.model";
import { FormField } from "../FormField/FormField";
import { Korisnik } from "../../../models/Korisnik.model";
import { Kategorija } from "../../../models/Kategorija.model";

const RenderCrud: React.FC = () => {
    const [activeCrud, setActiveCrud] = useState<string>('drzave');

    const drzavaFields: FormField[] = [
        { name: 'naziv', label: 'Naziv', type: 'text', required: true },
    ];
    const drzavaTableHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'naziv', label: 'Naziv' },
    ];
    
    const kategorijaFields: FormField[] = [
        { name: 'naziv', label: 'Naziv', type: 'text', required: true },
    ];
    const kategorijaTableHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'naziv', label: 'Naziv' },
    ];
    
    const korisnikFields: FormField[] = [
        { name: 'korisnickoIme', label: 'Korisničko ime', type: 'text', required: true },
        { name: 'sifra', label: 'Šifra', type: 'password', required: true },
        { name: 'datumRegistracije', label: 'Datum registracije', type: 'datetime-local', required: true },
        { name: 'brojTelefona', label: 'Broj telefona', type: 'text' },
    ];
    const korisnikTableHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'korisnickoIme', label: 'Korisničko ime' },
        {
            key: 'datumRegistracije', label: 'Datum registracije', render: (item: Korisnik) =>
                new Date(item.datumRegistracije).toLocaleString()
        },
        { key: 'brojTelefona', label: 'Broj telefona' },
    ];
    
    const gradFields: FormField[] = [
        { name: 'naziv', label: 'Naziv', type: 'text', required: true },
        { name: 'drzava', label: 'Država', type: 'select', required: true, nestedObjectKey: 'drzava' },
    ];
    const gradTableHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'naziv', label: 'Naziv' },
        { key: 'drzava', label: 'Država', render: (item: Grad) => item.drzava?.naziv || 'N/A' },
    ];
    
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
    const oglasTableHeaders = [
        { key: 'id', label: 'ID' },
        { key: 'naziv', label: 'Naziv' },
        { key: 'cena', label: 'Cena' },
        { key: 'kategorija', label: 'Kategorija', render: (item: Oglas) => item.kategorija?.naziv || 'N/A' },
        { key: 'korisnik', label: 'Korisnik', render: (item: Oglas) => item.korisnik?.korisnickoIme || 'N/A' },
        { key: 'grad', label: 'Grad', render: (item: Oglas) => item.grad?.naziv || 'N/A' },
        {
            key: 'datumPostavljanja', label: 'Datum postavljanja', render: (item: Oglas) =>
                new Date(item.datumPostavljanja).toLocaleString()
        },
    ];

    const renderCrudComponent = () => {
        switch (activeCrud) {
            case 'drzave':
                return <CrudComponent<Drzava>
                    resourceName="drzave"
                    title="Upravljanje državama"
                    fields={drzavaFields}
                    tableHeaders={drzavaTableHeaders}
                    onDeleteConfirm={(id) => window.confirm(`Jeste li sigurni da želite obrisati državu sa ID: ${id}?`)}
                />;
            case 'kategorije':
                return <CrudComponent<Kategorija>
                    resourceName="kategorije"
                    title="Upravljanje kategorijama"
                    fields={kategorijaFields}
                    tableHeaders={kategorijaTableHeaders}
                    onDeleteConfirm={(id) => window.confirm(`Jeste li sigurni da želite obrisati kategoriju sa ID: ${id}?`)}
                />;
            case 'korisnici':
                return <CrudComponent<Korisnik>
                    resourceName="korisnici"
                    title="Upravljanje korisnicima"
                    fields={korisnikFields}
                    tableHeaders={korisnikTableHeaders}
                    onDeleteConfirm={(id) => window.confirm(`Jeste li sigurni da želite obrisati korisnika sa ID: ${id}?`)}
                />;
            case 'gradovi':
                return <CrudComponent<Grad>
                    resourceName="gradovi"
                    title="Upravljanje gradovima"
                    fields={gradFields}
                    tableHeaders={gradTableHeaders}
                    onDeleteConfirm={(id) => window.confirm(`Jeste li sigurni da želite obrisati grad sa ID: ${id}?`)}
                />;
            case 'oglasi':
                return <CrudComponent<Oglas>
                    resourceName="oglasi"
                    title="Upravljanje oglasima"
                    fields={oglasFields}
                    tableHeaders={oglasTableHeaders}
                    onDeleteConfirm={(id) => window.confirm(`Jeste li sigurni da želite obrisati oglas sa ID: ${id}?`)}
                />;
            default:
                return null;
        }
    };

    return (
        <>
            <div>
                <div>
                    <h1>
                        Upravljanje podacima
                    </h1>

                    <nav>
                        <button
                            onClick={() => setActiveCrud('drzave')}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${activeCrud === 'drzave' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Države
                        </button>
                        <button
                            onClick={() => setActiveCrud('kategorije')}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${activeCrud === 'kategorije' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Kategorije
                        </button>
                        <button
                            onClick={() => setActiveCrud('korisnici')}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${activeCrud === 'korisnici' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Korisnici
                        </button>
                        <button
                            onClick={() => setActiveCrud('gradovi')}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${activeCrud === 'gradovi' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Gradovi
                        </button>
                        <button
                            onClick={() => setActiveCrud('oglasi')}
                            className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 ${activeCrud === 'oglasi' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Oglasi
                        </button>
                    </nav>

                    {renderCrudComponent()}
                </div>
            </div>
        </>
    );
};

export default RenderCrud;