package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.OglasDTO;
import server.model.Oglas;

@Mapper(componentModel = "spring", uses = {KorisnikMapper.class, GradMapper.class})
public interface OglasMapper extends BaseMapper<Oglas, OglasDTO>{

	@Override
	@Mapping(target = "korisnik", source = "korisnik")
	@Mapping(target = "grad", source = "grad")
	OglasDTO toDto(Oglas courseCondition);
}
