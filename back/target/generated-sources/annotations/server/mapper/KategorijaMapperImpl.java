package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.KategorijaDTO;
import server.model.Kategorija;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:17:24+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class KategorijaMapperImpl implements KategorijaMapper {

    @Override
    public Kategorija toEntity(KategorijaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Kategorija kategorija = new Kategorija();

        return kategorija;
    }

    @Override
    public KategorijaDTO toDto(Kategorija courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        KategorijaDTO kategorijaDTO = new KategorijaDTO();

        return kategorijaDTO;
    }
}
