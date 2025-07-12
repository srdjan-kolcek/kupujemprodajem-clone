package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.DrzavaDTO;
import server.model.Drzava;

@Mapper(componentModel = "spring")
public interface DrzavaMapper extends BaseMapper<Drzava, DrzavaDTO> {
	
	@Override
	@Mapping(target = "gradovi", ignore = true)
	DrzavaDTO toDto(Drzava courseCondition);
}
