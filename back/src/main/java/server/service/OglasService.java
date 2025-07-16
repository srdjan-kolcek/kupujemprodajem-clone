package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import server.DTO.OglasDTO;
import server.mapper.OglasMapper;
import server.model.Oglas;
import server.repository.OglasRepository;

@Service
public class OglasService extends BaseService<Oglas, Long, OglasDTO>{

	public OglasService(OglasRepository repository, OglasMapper mapper) {
		super(repository, mapper);
	}

	@Override
	public OglasDTO update(Long id, OglasDTO dto) {
		Optional<Oglas> existingEntityOpt = repository.findById(id);
		if (existingEntityOpt.isPresent()) {
			Oglas existingEntity = existingEntityOpt.get();
			existingEntity.setNaziv(dto.getNaziv());
			existingEntity.setCena(dto.getCena());
			existingEntity.setDatumPostavljanja(dto.getDatumPostavljanja());
			existingEntity.setOpis(dto.getOpis());
			existingEntity.setUrlSlike(dto.getUrlSlike());
			Oglas savedEntity = repository.save(existingEntity);
			return this.mapper.toDto(savedEntity);
		}
		return null;
	}

	
}
