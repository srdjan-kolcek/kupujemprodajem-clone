package server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import server.model.Grad;

@Repository
public interface GradRepository extends CrudRepository<Grad, Long>, PagingAndSortingRepository<Grad, Long> {

}
