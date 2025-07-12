package server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.DTO.GradDTO;
import server.model.Grad;
import server.service.GradService;

@RestController
@RequestMapping("/gradovi")
public class GradController extends BaseController<Grad, Long, GradDTO> {

	public GradController(GradService service) {
		super(service);
	}

}
