package server.mapper;

import org.mapstruct.Mapper;

import server.DTO.KategorijaDTO;
import server.model.Kategorija;

@Mapper(componentModel = "spring")
public interface KategorijaMapper extends BaseMapper<Kategorija, KategorijaDTO>{
	
	@Override
	KategorijaDTO toDto(Kategorija courseCondition);
}
