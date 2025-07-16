package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.KorisnikDTO;
import server.model.Korisnik;

@Mapper(componentModel = "spring")
public interface KorisnikMapper extends BaseMapper<Korisnik, KorisnikDTO> {

	@Override
	@Mapping(target = "dodeljenaPravaPristupa", ignore = true)
	@Mapping(target = "oglasi", ignore = true)
	KorisnikDTO toDto(Korisnik courseCondition);
	
	@Override
    @Mapping(target = "dodeljenaPravaPristupa", ignore = true)
    @Mapping(target = "oglasi", ignore = true)
    Korisnik toEntity(KorisnikDTO dto);
}
