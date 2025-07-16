package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Kategorija;

@Repository
public interface KategorijaRepository extends CrudRepository<Kategorija, Long>, PagingAndSortingRepository<Kategorija, Long>{

}
