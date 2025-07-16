package server.DTO;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class KorisnikDTO {
	private Long id;
	private String korisnickoIme;
	private String sifra;
	private Date datumRegistracije;
	private String brojTelefona;
	private List<OglasDTO> oglasi;
	private Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa;
	public KorisnikDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public KorisnikDTO(Long id, String korisnickoIme, String sifra, Date datumRegistracije, String brojTelefona,
			List<OglasDTO> oglasi, Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa) {
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
	public List<OglasDTO> getOglasi() {
		return oglasi;
	}
	public void setOglasi(List<OglasDTO> oglasi) {
		this.oglasi = oglasi;
	}
	public Set<DodeljenoPravoPristupaDTO> getDodeljenaPravaPristupa() {
		return dodeljenaPravaPristupa;
	}
	public void setDodeljenaPravaPristupa(Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa) {
		this.dodeljenaPravaPristupa = dodeljenaPravaPristupa;
	}
	
	
}
