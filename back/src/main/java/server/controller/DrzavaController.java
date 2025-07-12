package server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.DTO.DrzavaDTO;
import server.model.Drzava;
import server.service.DrzavaService;

@RestController
@RequestMapping("/drzave")
public class DrzavaController extends BaseController<Drzava, Long, DrzavaDTO>{

	public DrzavaController(DrzavaService service) {
		super(service);
	}

}
