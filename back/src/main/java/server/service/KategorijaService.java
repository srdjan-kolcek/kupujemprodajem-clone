package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import server.DTO.KategorijaDTO;
import server.mapper.KategorijaMapper;
import server.model.Kategorija;
import server.repository.KategorijaRepository;

@Service
public class KategorijaService extends BaseService<Kategorija, Long, KategorijaDTO>{

	public KategorijaService(KategorijaRepository repository,
			KategorijaMapper mapper) {
		super(repository, mapper);
	}

	@Override
	public KategorijaDTO update(Long id, KategorijaDTO dto) {
		Optional<Kategorija> existingEntityOpt = repository.findById(id);
		if (existingEntityOpt.isPresent()) {
			Kategorija existingEntity = existingEntityOpt.get();
			existingEntity.setNaziv(dto.getNaziv());
			Kategorija savedEntity = repository.save(existingEntity);
			return this.mapper.toDto(savedEntity);
		}
		return null;
	}

	
}
