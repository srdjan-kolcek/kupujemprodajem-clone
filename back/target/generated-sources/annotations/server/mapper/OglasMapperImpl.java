package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.DTO.OglasDTO;
import server.model.Oglas;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:17:24+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class OglasMapperImpl implements OglasMapper {

    @Autowired
    private KorisnikMapper korisnikMapper;
    @Autowired
    private GradMapper gradMapper;
    @Autowired
    private KategorijaMapper kategorijaMapper;

    @Override
    public Oglas toEntity(OglasDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Oglas oglas = new Oglas();

        oglas.setId( dto.getId() );
        oglas.setNaziv( dto.getNaziv() );
        oglas.setOpis( dto.getOpis() );
        oglas.setUrlSlike( dto.getUrlSlike() );
        oglas.setCena( dto.getCena() );
        oglas.setKategorija( kategorijaMapper.toEntity( dto.getKategorija() ) );
        oglas.setKorisnik( korisnikMapper.toEntity( dto.getKorisnik() ) );
        oglas.setGrad( gradMapper.toEntity( dto.getGrad() ) );
        oglas.setDatumPostavljanja( dto.getDatumPostavljanja() );

        return oglas;
    }

    @Override
    public OglasDTO toDto(Oglas courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        OglasDTO oglasDTO = new OglasDTO();

        oglasDTO.setKorisnik( korisnikMapper.toDto( courseCondition.getKorisnik() ) );
        oglasDTO.setGrad( gradMapper.toDto( courseCondition.getGrad() ) );
        oglasDTO.setKategorija( kategorijaMapper.toDto( courseCondition.getKategorija() ) );
        oglasDTO.setId( courseCondition.getId() );
        oglasDTO.setNaziv( courseCondition.getNaziv() );
        oglasDTO.setOpis( courseCondition.getOpis() );
        oglasDTO.setUrlSlike( courseCondition.getUrlSlike() );
        oglasDTO.setCena( courseCondition.getCena() );
        oglasDTO.setDatumPostavljanja( courseCondition.getDatumPostavljanja() );

        return oglasDTO;
    }
}
