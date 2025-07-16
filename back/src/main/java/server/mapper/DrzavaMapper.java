package server.mapper;

import org.mapstruct.Mapper;

import server.DTO.DrzavaDTO;
import server.model.Drzava;

@Mapper(componentModel = "spring")
public interface DrzavaMapper extends BaseMapper<Drzava, DrzavaDTO> {
	
	@Override
	DrzavaDTO toDto(Drzava courseCondition);
}
