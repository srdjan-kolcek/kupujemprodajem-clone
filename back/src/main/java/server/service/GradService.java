package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import server.DTO.GradDTO;
import server.mapper.GradMapper;
import server.model.Grad;
import server.repository.GradRepository;

@Service
public class GradService extends BaseService<Grad, Long, GradDTO>{

	public GradService(GradRepository repository, GradMapper mapper) {
		super(repository, mapper);
	}

	@Override
	public GradDTO update(Long id, GradDTO dto) {
		Optional<Grad> existingEntityOpt = repository.findById(id);
		if (existingEntityOpt.isPresent()) {
			Grad existingEntity = existingEntityOpt.get();
			existingEntity.setNaziv(dto.getNaziv());
			Grad savedEntity = repository.save(existingEntity);
			return this.mapper.toDto(savedEntity);
		}
		return null;
	}

	
}
