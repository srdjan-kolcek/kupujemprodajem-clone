package server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import server.DTO.PravoPristupaDTO;
import server.model.PravoPristupa;

@Mapper(componentModel = "spring")
public interface PravoPristupaMapper extends BaseMapper<PravoPristupa, PravoPristupaDTO>{

	@Override
	@Mapping(target = "dodeljenaPravaPristupa", ignore = true)
	PravoPristupaDTO toDto(PravoPristupa courseCondition);
}
