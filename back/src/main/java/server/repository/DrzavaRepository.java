package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Drzava;

@Repository
public interface DrzavaRepository extends CrudRepository<Drzava, Long>, PagingAndSortingRepository<Drzava, Long> {

}
