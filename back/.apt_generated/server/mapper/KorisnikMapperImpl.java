package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.KorisnikDTO;
import server.model.Korisnik;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:47:51+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class KorisnikMapperImpl implements KorisnikMapper {

    @Override
    public KorisnikDTO toDto(Korisnik courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        KorisnikDTO korisnikDTO = new KorisnikDTO();

        korisnikDTO.setBrojTelefona( courseCondition.getBrojTelefona() );
        korisnikDTO.setDatumRegistracije( courseCondition.getDatumRegistracije() );
        korisnikDTO.setId( courseCondition.getId() );
        korisnikDTO.setKorisnickoIme( courseCondition.getKorisnickoIme() );
        korisnikDTO.setSifra( courseCondition.getSifra() );

        return korisnikDTO;
    }

    @Override
    public Korisnik toEntity(KorisnikDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Korisnik korisnik = new Korisnik();

        korisnik.setBrojTelefona( dto.getBrojTelefona() );
        korisnik.setDatumRegistracije( dto.getDatumRegistracije() );
        korisnik.setId( dto.getId() );
        korisnik.setKorisnickoIme( dto.getKorisnickoIme() );
        korisnik.setSifra( dto.getSifra() );

        return korisnik;
    }
}
