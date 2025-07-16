package server.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Oglas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String naziv;
	@Column(nullable = false)
	private String opis;
	@Column(nullable = false)
	private String urlSlike;
	@Column(nullable = false)
	private Double cena;
	@ManyToOne
	private Kategorija kategorija;
	@ManyToOne
	private Korisnik korisnik;
	@ManyToOne
	private Grad grad;
	@Column(nullable = false)
	private Date datumPostavljanja;
	public Oglas() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Oglas(Long id, String naziv, String opis, String urlSlike, Double cena, Kategorija kategorija,
			Korisnik korisnik, Grad grad, Date datumPostavljanja) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.opis = opis;
		this.urlSlike = urlSlike;
		this.cena = cena;
		this.kategorija = kategorija;
		this.korisnik = korisnik;
		this.grad = grad;
		this.datumPostavljanja = datumPostavljanja;
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
	public String getOpis() {
		return opis;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	public String getUrlSlike() {
		return urlSlike;
	}
	public void setUrlSlike(String urlSlike) {
		this.urlSlike = urlSlike;
	}
	public Double getCena() {
		return cena;
	}
	public void setCena(Double cena) {
		this.cena = cena;
	}
	public Kategorija getKategorija() {
		return kategorija;
	}
	public void setKategorija(Kategorija kategorija) {
		this.kategorija = kategorija;
	}
	public Korisnik getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}
	public Grad getGrad() {
		return grad;
	}
	public void setGrad(Grad grad) {
		this.grad = grad;
	}
	public Date getDatumPostavljanja() {
		return datumPostavljanja;
	}
	public void setDatumPostavljanja(Date datumPostavljanja) {
		this.datumPostavljanja = datumPostavljanja;
	}
	
	
}
