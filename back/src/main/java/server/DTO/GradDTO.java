package server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class GradDTO {
	private Long id;
	private String naziv;
	private DrzavaDTO drzava;
	public GradDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GradDTO(Long id, String naziv, DrzavaDTO drzava) {
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
	public DrzavaDTO getDrzava() {
		return drzava;
	}
	public void setDrzava(DrzavaDTO drzava) {
		this.drzava = drzava;
	}
	
	
}
