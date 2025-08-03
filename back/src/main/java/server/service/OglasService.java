//package server.service;
//
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//
//import server.DTO.OglasDTO;
//import server.mapper.OglasMapper;
//import server.model.Oglas;
//import server.repository.OglasRepository;
//
//@Service
//public class OglasService extends BaseService<Oglas, Long, OglasDTO>{
//
//	public OglasService(OglasRepository repository, OglasMapper mapper) {
//		super(repository, mapper);
//	}
//
//	@Override
//	public OglasDTO update(Long id, OglasDTO dto) {
//		Optional<Oglas> existingEntityOpt = repository.findById(id);
//		if (existingEntityOpt.isPresent()) {
//			Oglas existingEntity = existingEntityOpt.get();
//			existingEntity.setNaziv(dto.getNaziv());
//			existingEntity.setCena(dto.getCena());
//			existingEntity.setDatumPostavljanja(dto.getDatumPostavljanja());
//			existingEntity.setOpis(dto.getOpis());
//			existingEntity.setUrlSlike(dto.getUrlSlike());
//			Oglas savedEntity = repository.save(existingEntity);
//			return this.mapper.toDto(savedEntity);
//		}
//		return null;
//	}
//
//	
//}

package server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import server.DTO.OglasDTO;
import server.mapper.OglasMapper;
import server.model.Grad;
import server.model.Kategorija;
import server.model.Korisnik;
import server.model.Oglas;
import server.repository.GradRepository;
import server.repository.KategorijaRepository;
import server.repository.KorisnikRepository;
import server.repository.OglasRepository;

@Service
public class OglasService extends BaseService<Oglas, Long, OglasDTO> {

    // Inject all required repositories to fetch managed entities
    private final KorisnikRepository korisnikRepository;
    private final KategorijaRepository kategorijaRepository;
    private final GradRepository gradRepository;

    public OglasService(
            OglasRepository repository,
            OglasMapper mapper,
            KorisnikRepository korisnikRepository,
            KategorijaRepository kategorijaRepository,
            GradRepository gradRepository
    ) {
        super(repository, mapper);
        this.korisnikRepository = korisnikRepository;
        this.kategorijaRepository = kategorijaRepository;
        this.gradRepository = gradRepository;
    }

    @Override
    public OglasDTO save(OglasDTO dto) {
        // Map the DTO to an entity, which will create transient instances for relationships
        Oglas oglasEntity = this.mapper.toEntity(dto);
        
        // Fetch the managed entities from the database based on the DTO IDs
        Korisnik managedKorisnik = korisnikRepository.findById(dto.getKorisnik().getId())
            .orElseThrow(() -> new IllegalArgumentException("Korisnik with ID " + dto.getKorisnik().getId() + " not found."));
        
        Kategorija managedKategorija = kategorijaRepository.findById(dto.getKategorija().getId())
            .orElseThrow(() -> new IllegalArgumentException("Kategorija with ID " + dto.getKategorija().getId() + " not found."));
        
        Grad managedGrad = gradRepository.findById(dto.getGrad().getId())
            .orElseThrow(() -> new IllegalArgumentException("Grad with ID " + dto.getGrad().getId() + " not found."));

        // Set the managed entities on the Oglas entity
        oglasEntity.setKorisnik(managedKorisnik);
        oglasEntity.setKategorija(managedKategorija);
        oglasEntity.setGrad(managedGrad);
        
        // The repository can now successfully save the Oglas with managed references
        Oglas savedEntity = repository.save(oglasEntity);
        
        return this.mapper.toDto(savedEntity);
    }
    
    @Override
    public OglasDTO update(Long id, OglasDTO dto) {
        Optional<Oglas> existingEntityOpt = repository.findById(id);
        if (existingEntityOpt.isPresent()) {
            Oglas existingEntity = existingEntityOpt.get();
            
            // Map the simple fields
            existingEntity.setNaziv(dto.getNaziv());
            existingEntity.setCena(dto.getCena());
            existingEntity.setDatumPostavljanja(dto.getDatumPostavljanja());
            existingEntity.setOpis(dto.getOpis());
            existingEntity.setUrlSlike(dto.getUrlSlike());
            
            // Fetch and set the managed entities for relationships
            Korisnik managedKorisnik = korisnikRepository.findById(dto.getKorisnik().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Korisnik with ID " + dto.getKorisnik().getId() + " not found."));
            existingEntity.setKorisnik(managedKorisnik);
            
            Kategorija managedKategorija = kategorijaRepository.findById(dto.getKategorija().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Kategorija with ID " + dto.getKategorija().getId() + " not found."));
            existingEntity.setKategorija(managedKategorija);
            
            Grad managedGrad = gradRepository.findById(dto.getGrad().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Grad with ID " + dto.getGrad().getId() + " not found."));
            existingEntity.setGrad(managedGrad);
            
            // Save the updated entity
            Oglas savedEntity = repository.save(existingEntity);
            return this.mapper.toDto(savedEntity);
        }
        
        // Handle case where entity to update is not found
        return null;
    }
}