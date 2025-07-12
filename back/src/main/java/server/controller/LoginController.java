package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.DTO.UserLoginDTO;
import server.model.Korisnik;
import server.service.KorisnikService;
import server.utils.TokenUtils;

@RestController
@RequestMapping("/auth")
public class LoginController {
	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private KorisnikService korisnikService;
	

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UserLoginDTO user) {
        System.out.println("Korisnicko ime: " + user.getKorisnickoIme());
        System.out.println("Sifra: " + user.getSifra());

        Korisnik korisnik = korisnikService.findByKorisnickoIme(user.getKorisnickoIme());

        if (korisnik == null) {
            System.out.println("Korisnik nije pronađen.");
            return new ResponseEntity<>("Korisnik ne postoji", HttpStatus.UNAUTHORIZED);
        }

        boolean passwordMatches = passwordEncoder.matches(user.getSifra(), korisnik.getSifra());

        System.out.println("Lozinka iz baze: " + korisnik.getSifra());
        System.out.println("Poklapanje lozinki: " + passwordMatches);

        if (passwordMatches) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(korisnik.getKorisnickoIme());
            String token = tokenUtils.generateToken(userDetails);
            return ResponseEntity.ok(token);
        }

        return new ResponseEntity<>("Pogrešna lozinka", HttpStatus.UNAUTHORIZED);
    }
}
