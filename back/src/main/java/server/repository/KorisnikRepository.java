package server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import server.model.Korisnik;

@Repository
public interface KorisnikRepository extends CrudRepository<Korisnik, Long>, PagingAndSortingRepository<Korisnik, Long>{
	Optional<Korisnik> findByKorisnickoImeAndSifra(String korisnickoIme, String sifra);
	Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);
	
	@Query("SELECT k FROM Korisnik k LEFT JOIN FETCH k.dodeljenaPravaPristupa p LEFT JOIN FETCH p.pravoPristupa WHERE k.korisnickoIme = :korisnickoIme")
    Korisnik findByKorisnickoImeWithDodeljenaPravaPristupa(@Param("korisnickoIme") String korisnickoIme);
}
