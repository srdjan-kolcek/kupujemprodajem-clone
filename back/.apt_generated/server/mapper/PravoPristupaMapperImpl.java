package server.mapper;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.DodeljenoPravoPristupaDTO;
import server.DTO.DrzavaDTO;
import server.DTO.GradDTO;
import server.DTO.KategorijaDTO;
import server.DTO.KorisnikDTO;
import server.DTO.OglasDTO;
import server.DTO.PravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;
import server.model.Drzava;
import server.model.Grad;
import server.model.Kategorija;
import server.model.Korisnik;
import server.model.Oglas;
import server.model.PravoPristupa;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:26:56+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class PravoPristupaMapperImpl implements PravoPristupaMapper {

    @Override
    public PravoPristupa toEntity(PravoPristupaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PravoPristupa pravoPristupa = new PravoPristupa();

        pravoPristupa.setDodeljenaPravaPristupa( dodeljenoPravoPristupaDTOSetToDodeljenoPravoPristupaSet( dto.getDodeljenaPravaPristupa() ) );
        pravoPristupa.setId( dto.getId() );
        pravoPristupa.setNaziv( dto.getNaziv() );

        return pravoPristupa;
    }

    @Override
    public PravoPristupaDTO toDto(PravoPristupa courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        PravoPristupaDTO pravoPristupaDTO = new PravoPristupaDTO();

        pravoPristupaDTO.setId( courseCondition.getId() );
        pravoPristupaDTO.setNaziv( courseCondition.getNaziv() );

        return pravoPristupaDTO;
    }

    protected Kategorija kategorijaDTOToKategorija(KategorijaDTO kategorijaDTO) {
        if ( kategorijaDTO == null ) {
            return null;
        }

        Kategorija kategorija = new Kategorija();

        kategorija.setId( kategorijaDTO.getId() );
        kategorija.setNaziv( kategorijaDTO.getNaziv() );

        return kategorija;
    }

    protected Drzava drzavaDTOToDrzava(DrzavaDTO drzavaDTO) {
        if ( drzavaDTO == null ) {
            return null;
        }

        Drzava drzava = new Drzava();

        drzava.setId( drzavaDTO.getId() );
        drzava.setNaziv( drzavaDTO.getNaziv() );

        return drzava;
    }

    protected Grad gradDTOToGrad(GradDTO gradDTO) {
        if ( gradDTO == null ) {
            return null;
        }

        Grad grad = new Grad();

        grad.setId( gradDTO.getId() );
        grad.setNaziv( gradDTO.getNaziv() );
        grad.setDrzava( drzavaDTOToDrzava( gradDTO.getDrzava() ) );

        return grad;
    }

    protected Oglas oglasDTOToOglas(OglasDTO oglasDTO) {
        if ( oglasDTO == null ) {
            return null;
        }

        Oglas oglas = new Oglas();

        oglas.setId( oglasDTO.getId() );
        oglas.setNaziv( oglasDTO.getNaziv() );
        oglas.setOpis( oglasDTO.getOpis() );
        oglas.setUrlSlike( oglasDTO.getUrlSlike() );
        oglas.setCena( oglasDTO.getCena() );
        oglas.setKategorija( kategorijaDTOToKategorija( oglasDTO.getKategorija() ) );
        oglas.setKorisnik( korisnikDTOToKorisnik( oglasDTO.getKorisnik() ) );
        oglas.setGrad( gradDTOToGrad( oglasDTO.getGrad() ) );
        oglas.setDatumPostavljanja( oglasDTO.getDatumPostavljanja() );

        return oglas;
    }

    protected List<Oglas> oglasDTOListToOglasList(List<OglasDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Oglas> list1 = new ArrayList<Oglas>( list.size() );
        for ( OglasDTO oglasDTO : list ) {
            list1.add( oglasDTOToOglas( oglasDTO ) );
        }

        return list1;
    }

    protected Set<DodeljenoPravoPristupa> dodeljenoPravoPristupaDTOSetToDodeljenoPravoPristupaSet(Set<DodeljenoPravoPristupaDTO> set) {
        if ( set == null ) {
            return null;
        }

        Set<DodeljenoPravoPristupa> set1 = new LinkedHashSet<DodeljenoPravoPristupa>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( DodeljenoPravoPristupaDTO dodeljenoPravoPristupaDTO : set ) {
            set1.add( dodeljenoPravoPristupaDTOToDodeljenoPravoPristupa( dodeljenoPravoPristupaDTO ) );
        }

        return set1;
    }

    protected Korisnik korisnikDTOToKorisnik(KorisnikDTO korisnikDTO) {
        if ( korisnikDTO == null ) {
            return null;
        }

        Korisnik korisnik = new Korisnik();

        korisnik.setId( korisnikDTO.getId() );
        korisnik.setKorisnickoIme( korisnikDTO.getKorisnickoIme() );
        korisnik.setSifra( korisnikDTO.getSifra() );
        korisnik.setDatumRegistracije( korisnikDTO.getDatumRegistracije() );
        korisnik.setBrojTelefona( korisnikDTO.getBrojTelefona() );
        korisnik.setOglasi( oglasDTOListToOglasList( korisnikDTO.getOglasi() ) );
        korisnik.setDodeljenaPravaPristupa( dodeljenoPravoPristupaDTOSetToDodeljenoPravoPristupaSet( korisnikDTO.getDodeljenaPravaPristupa() ) );

        return korisnik;
    }

    protected DodeljenoPravoPristupa dodeljenoPravoPristupaDTOToDodeljenoPravoPristupa(DodeljenoPravoPristupaDTO dodeljenoPravoPristupaDTO) {
        if ( dodeljenoPravoPristupaDTO == null ) {
            return null;
        }

        DodeljenoPravoPristupa dodeljenoPravoPristupa = new DodeljenoPravoPristupa();

        dodeljenoPravoPristupa.setId( dodeljenoPravoPristupaDTO.getId() );
        dodeljenoPravoPristupa.setKorisnik( korisnikDTOToKorisnik( dodeljenoPravoPristupaDTO.getKorisnik() ) );
        dodeljenoPravoPristupa.setPravoPristupa( toEntity( dodeljenoPravoPristupaDTO.getPravoPristupa() ) );

        return dodeljenoPravoPristupa;
    }
}
