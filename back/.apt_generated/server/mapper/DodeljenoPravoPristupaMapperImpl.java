package server.mapper;

import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.DTO.DodeljenoPravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-16T16:47:51+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20241112-0530, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class DodeljenoPravoPristupaMapperImpl implements DodeljenoPravoPristupaMapper {

    @Autowired
    private KorisnikMapper korisnikMapper;
    @Autowired
    private PravoPristupaMapper pravoPristupaMapper;

    @Override
    public DodeljenoPravoPristupa toEntity(DodeljenoPravoPristupaDTO dto) {
        if ( dto == null ) {
            return null;
        }

        DodeljenoPravoPristupa dodeljenoPravoPristupa = new DodeljenoPravoPristupa();

        dodeljenoPravoPristupa.setId( dto.getId() );
        dodeljenoPravoPristupa.setKorisnik( korisnikMapper.toEntity( dto.getKorisnik() ) );
        dodeljenoPravoPristupa.setPravoPristupa( pravoPristupaMapper.toEntity( dto.getPravoPristupa() ) );

        return dodeljenoPravoPristupa;
    }

    @Override
    public DodeljenoPravoPristupaDTO toDto(DodeljenoPravoPristupa courseCondition) {
        if ( courseCondition == null ) {
            return null;
        }

        DodeljenoPravoPristupaDTO dodeljenoPravoPristupaDTO = new DodeljenoPravoPristupaDTO();

        dodeljenoPravoPristupaDTO.setKorisnik( korisnikMapper.toDto( courseCondition.getKorisnik() ) );
        dodeljenoPravoPristupaDTO.setPravoPristupa( pravoPristupaMapper.toDto( courseCondition.getPravoPristupa() ) );
        dodeljenoPravoPristupaDTO.setId( courseCondition.getId() );

        return dodeljenoPravoPristupaDTO;
    }
}
