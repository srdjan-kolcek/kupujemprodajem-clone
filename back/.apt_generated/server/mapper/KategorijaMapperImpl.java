package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.KategorijaDTO;
import server.model.Kategorija;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:26:56+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class KategorijaMapperImpl implements KategorijaMapper {

    @Override
    public Kategorija toEntity(KategorijaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Kategorija kategorija = new Kategorija();

        kategorija.setId( dto.getId() );
        kategorija.setNaziv( dto.getNaziv() );

        return kategorija;
    }

    @Override
    public KategorijaDTO toDto(Kategorija courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        KategorijaDTO kategorijaDTO = new KategorijaDTO();

        kategorijaDTO.setId( courseCondition.getId() );
        kategorijaDTO.setNaziv( courseCondition.getNaziv() );

        return kategorijaDTO;
    }
}
