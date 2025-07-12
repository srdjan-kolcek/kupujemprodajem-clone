package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Oglas;

@Repository
public interface OglasRepository extends CrudRepository<Oglas, Long>, PagingAndSortingRepository<Oglas, Long> {

}
