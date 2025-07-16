package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.DTO.OglasDTO;
import server.model.Oglas;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:47:51+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
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

        oglas.setCena( dto.getCena() );
        oglas.setDatumPostavljanja( dto.getDatumPostavljanja() );
        oglas.setGrad( gradMapper.toEntity( dto.getGrad() ) );
        oglas.setId( dto.getId() );
        oglas.setKategorija( kategorijaMapper.toEntity( dto.getKategorija() ) );
        oglas.setKorisnik( korisnikMapper.toEntity( dto.getKorisnik() ) );
        oglas.setNaziv( dto.getNaziv() );
        oglas.setOpis( dto.getOpis() );
        oglas.setUrlSlike( dto.getUrlSlike() );

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
        oglasDTO.setCena( courseCondition.getCena() );
        oglasDTO.setDatumPostavljanja( courseCondition.getDatumPostavljanja() );
        oglasDTO.setId( courseCondition.getId() );
        oglasDTO.setNaziv( courseCondition.getNaziv() );
        oglasDTO.setOpis( courseCondition.getOpis() );
        oglasDTO.setUrlSlike( courseCondition.getUrlSlike() );

        return oglasDTO;
    }
}
