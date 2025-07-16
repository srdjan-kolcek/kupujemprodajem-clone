package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.DTO.GradDTO;
import server.model.Grad;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:17:24+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class GradMapperImpl implements GradMapper {

    @Autowired
    private DrzavaMapper drzavaMapper;

    @Override
    public Grad toEntity(GradDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Grad grad = new Grad();

        grad.setId( dto.getId() );
        grad.setNaziv( dto.getNaziv() );
        grad.setDrzava( drzavaMapper.toEntity( dto.getDrzava() ) );

        return grad;
    }

    @Override
    public GradDTO toDto(Grad courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        GradDTO gradDTO = new GradDTO();

        gradDTO.setDrzava( drzavaMapper.toDto( courseCondition.getDrzava() ) );
        gradDTO.setId( courseCondition.getId() );
        gradDTO.setNaziv( courseCondition.getNaziv() );

        return gradDTO;
    }
}
