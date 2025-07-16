package server.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class OglasDTO {
	private Long id;
	private String naziv;
	private String opis;
	private String urlSlike;
	private Double cena;
	private KategorijaDTO kategorija;
	private KorisnikDTO korisnik;
	private GradDTO grad;
	private Date datumPostavljanja;
	public OglasDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OglasDTO(Long id, String naziv, String opis, String urlSlike, Double cena, KategorijaDTO kategorija,
			KorisnikDTO korisnik, GradDTO grad, Date datumPostavljanja) {
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
	public KategorijaDTO getKategorija() {
		return kategorija;
	}
	public void setKategorija(KategorijaDTO kategorija) {
		this.kategorija = kategorija;
	}
	public KorisnikDTO getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(KorisnikDTO korisnik) {
		this.korisnik = korisnik;
	}
	public GradDTO getGrad() {
		return grad;
	}
	public void setGrad(GradDTO grad) {
		this.grad = grad;
	}
	public Date getDatumPostavljanja() {
		return datumPostavljanja;
	}
	public void setDatumPostavljanja(Date datumPostavljanja) {
		this.datumPostavljanja = datumPostavljanja;
	}
	
	
}
