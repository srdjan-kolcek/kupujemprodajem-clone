package server.DTO;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KorisnikDTO {
	private Long id;
	private String korisnickoIme;
	private String sifra;
	private Date datumRegistracije;
	private String brojTelefona;
	private List<OglasDTO> oglasi;
	private Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa;
}
