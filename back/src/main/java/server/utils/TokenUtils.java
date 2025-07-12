package server.utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenUtils {
	public Key getKey() {
		return Keys.hmacShaKeyFor("adfilughdfuigdghdiuUIGBRSUILGBVDISUVBduifalgbvlidu)!".getBytes());
	}
	
	public Claims getClaims(String token) {
		Claims claims = null;
		try {
			claims = (Claims) Jwts.parser().setSigningKey(getKey()).build().parse(token).getPayload();
		}catch(Exception e) {
			
		}
		return claims;
	}
	
	public String getUsername(String token) {
		return this.getClaims(token).getSubject();
	}
	
	public boolean isExpired(String token) {
		return this.getClaims(token).getExpiration().before(new Date(System.currentTimeMillis()));
	}
	
	public boolean validateToken(String token) {
		boolean valid = true;
		
		if(this.getClaims(token) == null) {
			valid = false;
		}
		if(valid && this.isExpired(token)) {
			valid = false;
		}
		
		return valid;
	}

	public String generateToken(UserDetails userDetails) {
		HashMap<String, Object> payload = new HashMap<String, Object>();
		payload.put("sub", userDetails.getUsername());
		payload.put("authorities", userDetails.getAuthorities());
		
		return Jwts.builder().claims(payload).expiration(new Date(System.currentTimeMillis() + 100000)).signWith(getKey()).compact();
	}
}
