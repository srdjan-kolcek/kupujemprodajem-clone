package server.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OglasDTO {
	private Long id;
	private String naziv;
	private String opis;
	private String urlSlike;
	private Double cena;
	private String kategorija;
	private KorisnikDTO korisnik;
	private GradDTO grad;
	private Date datumPostavljanja;
}
