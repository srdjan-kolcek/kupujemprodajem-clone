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
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
