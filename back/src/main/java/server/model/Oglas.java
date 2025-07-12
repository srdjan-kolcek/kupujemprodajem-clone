package server.model;

import java.util.Date;

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
@Data
@NoArgsConstructor
@AllArgsConstructor
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
	@Column(nullable = false)
	private String kategorija;
	@ManyToOne
	private Korisnik korisnik;
	@ManyToOne
	private Grad grad;
	@Column(nullable = false)
	private Date datumPostavljanja;
}
