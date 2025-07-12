package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import server.DTO.KorisnikDTO;
import server.mapper.KorisnikMapper;
import server.model.Korisnik;
import server.repository.KorisnikRepository;

@Service
public class KorisnikService extends BaseService<Korisnik, Long, KorisnikDTO>{

	public KorisnikService(KorisnikRepository repository, KorisnikMapper mapper) {
		super(repository, mapper);
	}

	@Override
	public KorisnikDTO update(Long id, KorisnikDTO dto) {
		Optional<Korisnik> existingEntityOpt = repository.findById(id);
		if (existingEntityOpt.isPresent()) {
			Korisnik existingEntity = existingEntityOpt.get();
			existingEntity.setKorisnickoIme(dto.getKorisnickoIme());
			existingEntity.setSifra(dto.getSifra());
			existingEntity.setBrojTelefona(dto.getBrojTelefona());
			existingEntity.setDatumRegistracije(dto.getDatumRegistracije());
			Korisnik savedEntity = repository.save(existingEntity);
			return this.mapper.toDto(savedEntity);
		}
		return null;
	}
	
	public Korisnik findByKorisnickoImeAndSifra(String korisnickoIme, String sifra) {
		return ((KorisnikRepository)repository).findByKorisnickoImeAndSifra(korisnickoIme, sifra).orElse(null);
	}
	
	public Korisnik findByKorisnickoIme(String korisnickoIme) {
		return ((KorisnikRepository)repository).findByKorisnickoIme(korisnickoIme).orElse(null);
	}

}
