package server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.DTO.KorisnikDTO;
import server.model.Korisnik;
import server.service.KorisnikService;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController extends BaseController<Korisnik, Long, KorisnikDTO> {

	public KorisnikController(KorisnikService service) {
		super(service);
	}

}
