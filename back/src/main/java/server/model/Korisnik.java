package server.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Korisnik {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true, nullable = false)
	private String korisnickoIme;
	@Column(nullable = false)
	private String sifra;
	@Column(nullable = false)
	private Date datumRegistracije;
	@Column(nullable = false)
	private String brojTelefona;
	@OneToMany(mappedBy = "korisnik", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Oglas> oglasi = new ArrayList<>();
	@OneToMany(mappedBy = "korisnik")
	private Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa;
	public Korisnik() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Korisnik(Long id, String korisnickoIme, String sifra, Date datumRegistracije, String brojTelefona,
			List<Oglas> oglasi, Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.sifra = sifra;
		this.datumRegistracije = datumRegistracije;
		this.brojTelefona = brojTelefona;
		this.oglasi = oglasi;
		this.dodeljenaPravaPristupa = dodeljenaPravaPristupa;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getSifra() {
		return sifra;
	}
	public void setSifra(String sifra) {
		this.sifra = sifra;
	}
	public Date getDatumRegistracije() {
		return datumRegistracije;
	}
	public void setDatumRegistracije(Date datumRegistracije) {
		this.datumRegistracije = datumRegistracije;
	}
	public String getBrojTelefona() {
		return brojTelefona;
	}
	public void setBrojTelefona(String brojTelefona) {
		this.brojTelefona = brojTelefona;
	}
	public List<Oglas> getOglasi() {
		return oglasi;
	}
	public void setOglasi(List<Oglas> oglasi) {
		this.oglasi = oglasi;
	}
	public Set<DodeljenoPravoPristupa> getDodeljenaPravaPristupa() {
		return dodeljenaPravaPristupa;
	}
	public void setDodeljenaPravaPristupa(Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa) {
		this.dodeljenaPravaPristupa = dodeljenaPravaPristupa;
	}
	
	
}
