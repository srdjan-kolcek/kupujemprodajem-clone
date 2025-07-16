package server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.DTO.KategorijaDTO;
import server.model.Kategorija;
import server.service.KategorijaService;

@RestController
@RequestMapping("/kategorije")
public class KategorijaController extends BaseController<Kategorija, Long, KategorijaDTO>{

	public KategorijaController(KategorijaService service) {
		super(service);
	}

}
