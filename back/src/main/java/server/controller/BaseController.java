package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import server.service.BaseService;


public abstract class BaseController<T, ID, D> {
	protected final BaseService<T, ID, D> service;

    public BaseController(BaseService<T, ID, D> service) {
        this.service = service;
    }

    //@Secured("ROLE_KORISNIK")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody D dto) {
    	try {
            D createdDto = service.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDto);
    	}
        catch(Exception e) {
        	e.printStackTrace(); 
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //@PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<D> getById(@PathVariable ID id) {
        return service.findById(id)
            .map(dto -> ResponseEntity.ok(dto))
            .orElseGet(() -> (ResponseEntity<D>) ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Entity not found."));
    }

    //@PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<Iterable<D>> getAll() {
        Iterable<D> allDtos = service.findAll();
        return ResponseEntity.ok(allDtos);
    }

    //@Secured("ROLE_KORISNIK")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable ID id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Entity successfuly deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Entity not found.");
        }
    }

    //@Secured("ROLE_KORISNIK")
    @PutMapping("/{id}")
    public ResponseEntity<D> updateEntity(@PathVariable ID id, @RequestBody D dto) {
        D updatedDto = service.update(id, dto);
        if (updatedDto != null) {
            return ResponseEntity.ok(updatedDto);
        } else {
            return (ResponseEntity<D>) ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Entity not found.");
        }
    }
}
