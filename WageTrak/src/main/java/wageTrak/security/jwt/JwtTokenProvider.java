package wageTrak.security.jwt;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import wageTrak.services.CustomUserDetailsService;

@Component
public class JwtTokenProvider {

	@Value("${security.jwt.token.secret-key:secret}")
	private String secretKey = "secret";

	@Value("${security.jwt.token.expire-length:1200000}")
	private long validityInMilliseconds = 1200000; // 20 min

	@Autowired
	private CustomUserDetailsService service;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public String createToken(String userId, GrantedAuthority role) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("roles", role);
		Date now = new Date();
		Date validity = new Date(now.getTime() + validityInMilliseconds);

		return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity)
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}

	public Authentication getAuthentication(String token) {
		UserDetails userDetails = this.service.loadUserById(getId(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	public String getId(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	public String resolveToken(HttpServletRequest req) {
		String bearerToken = req.getHeader("Authorization");
		if (bearerToken != null && bearerToken.startsWith("Bearer")) {
			return bearerToken.substring(7, bearerToken.length());
		} else {
			return null;
		}
	}

	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			if (claims.getBody().getExpiration().before(new Date())) {
				return false;
			} else {
				return true;
			}
		} catch (JwtException | IllegalArgumentException e) {
			throw new JwtException("Expired or invalid JWT token");
		}
	}

}
