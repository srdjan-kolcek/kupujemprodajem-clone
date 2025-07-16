package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Grad {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String naziv;
	@ManyToOne
	private Drzava drzava;
	public Grad() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Grad(Long id, String naziv, Drzava drzava) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.drzava = drzava;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public Drzava getDrzava() {
		return drzava;
	}
	public void setDrzava(Drzava drzava) {
		this.drzava = drzava;
	}
	
	
}
