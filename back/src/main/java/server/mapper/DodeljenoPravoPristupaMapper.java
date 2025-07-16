package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.DodeljenoPravoPristupaDTO;
import server.model.DodeljenoPravoPristupa;

@Mapper(componentModel = "spring", uses = {KorisnikMapper.class, PravoPristupaMapper.class})
public interface DodeljenoPravoPristupaMapper extends BaseMapper<DodeljenoPravoPristupa, DodeljenoPravoPristupaDTO>{

	@Override
	@Mapping(target = "korisnik", source = "korisnik")
	@Mapping(target = "pravoPristupa", source = "pravoPristupa")
	DodeljenoPravoPristupaDTO toDto(DodeljenoPravoPristupa courseCondition);
}
