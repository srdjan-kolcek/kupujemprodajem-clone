package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.GradDTO;
import server.model.Grad;

@Mapper(componentModel = "spring", uses = {DrzavaMapper.class})
public interface GradMapper extends BaseMapper<Grad, GradDTO>{

	@Override
	@Mapping(target = "drzava", source = "drzava")
	GradDTO toDto(Grad courseCondition);
}
