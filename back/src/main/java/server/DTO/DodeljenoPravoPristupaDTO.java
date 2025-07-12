package server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DodeljenoPravoPristupaDTO {
	private Long id;
	private KorisnikDTO korisnik;
	private PravoPristupaDTO pravoPristupa;
}
