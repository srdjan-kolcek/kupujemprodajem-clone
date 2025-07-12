package server.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.repository.CrudRepository;

import server.mapper.BaseMapper;


public abstract class BaseService<T, ID, Dto> {
	
	protected final CrudRepository<T, ID> repository;
    protected final BaseMapper<T, Dto> mapper;

    public BaseService(CrudRepository<T, ID> repository, BaseMapper<T, Dto> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Dto save(Dto dto) {
        T entity = mapper.toEntity(dto);
        T savedEntity = repository.save(entity);
        return mapper.toDto(savedEntity);
    }

    public Optional<Dto> findById(ID id) {
        return repository.findById(id)
                .map(mapper::toDto);
    }

    public List<Dto> findAll() {
        return ((List<T>) repository.findAll()).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    public abstract Dto update(ID id, Dto dto);
}
