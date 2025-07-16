package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import server.DTO.DrzavaDTO;
import server.model.Drzava;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:17:24+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class DrzavaMapperImpl implements DrzavaMapper {

    @Override
    public Drzava toEntity(DrzavaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Drzava drzava = new Drzava();

        return drzava;
    }

    @Override
    public DrzavaDTO toDto(Drzava courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        DrzavaDTO drzavaDTO = new DrzavaDTO();

        return drzavaDTO;
    }
}
