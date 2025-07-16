package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.DrzavaDTO;
import server.model.Drzava;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:26:56+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class DrzavaMapperImpl implements DrzavaMapper {

    @Override
    public Drzava toEntity(DrzavaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Drzava drzava = new Drzava();

        drzava.setId( dto.getId() );
        drzava.setNaziv( dto.getNaziv() );

        return drzava;
    }

    @Override
    public DrzavaDTO toDto(Drzava courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        DrzavaDTO drzavaDTO = new DrzavaDTO();

        drzavaDTO.setId( courseCondition.getId() );
        drzavaDTO.setNaziv( courseCondition.getNaziv() );

        return drzavaDTO;
    }
}
