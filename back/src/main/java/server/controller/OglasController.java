package server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.DTO.OglasDTO;
import server.model.Oglas;
import server.service.OglasService;

@RestController
@RequestMapping("/oglasi")
public class OglasController extends BaseController<Oglas, Long, OglasDTO>{

	public OglasController(OglasService service) {
		super(service);
	}

}
