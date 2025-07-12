package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import server.DTO.DrzavaDTO;
import server.mapper.DrzavaMapper;
import server.model.Drzava;
import server.repository.DrzavaRepository;

@Service
public class DrzavaService extends BaseService<Drzava, Long, DrzavaDTO> {

	public DrzavaService(DrzavaRepository repository, DrzavaMapper mapper) {
		super(repository, mapper);
	}

	@Override
	public DrzavaDTO update(Long id, DrzavaDTO dto) {
		Optional<Drzava> existingEntityOpt = repository.findById(id);
		if (existingEntityOpt.isPresent()) {
			Drzava existingEntity = existingEntityOpt.get();
			existingEntity.setNaziv(dto.getNaziv());
			Drzava savedEntity = repository.save(existingEntity);
			return this.mapper.toDto(savedEntity);
		}
		return null;
	}

}
