package wageTrak.controllers;

import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.documents.User;
import wageTrak.security.jwt.JwtTokenProvider;
import wageTrak.services.CustomUserDetailsService;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST })
@RequestMapping("/wageTrak-login")
public class SecurityController {

	@Autowired
	AuthenticationManager manager;

	@Autowired
	JwtTokenProvider provider;

	@Autowired
	private UserService usRepo;

	@Autowired
	private CustomUserDetailsService service;

	private final Decoder decoder = Base64.getDecoder();

	@SuppressWarnings("rawtypes")
	@PostMapping
	public ResponseEntity login(@RequestHeader(value = "Authorization") String data) {
		try {
			String[] creds = data.split(" ");
			String credentials = creds[1];
			String credString = new String(decoder.decode(credentials));
			String[] decoded = credString.split(":");
			String username = decoded[0];
			String password = decoded[1];
			try {
				@SuppressWarnings("unused")
				User user = service.findUserByUsername(username);
			} catch (AuthenticationException e) {
				return ResponseEntity.notFound().build();
			}
			User user = service.findUserByUsername(username);
			String id = user.getId();
			try {
				manager.authenticate(new UsernamePasswordAuthenticationToken(id, password));
			} catch (AuthenticationException e) {
				return ResponseEntity.noContent().build();
			}
			String token = provider.createToken(id, new SimpleGrantedAuthority("USER"));

			Map<Object, Object> model = new HashMap<>();
			model.put("UserId", id);
			model.put("token", "Bearer " + token);

			return ResponseEntity.ok(model);
		} catch (AuthenticationException e) {
			throw new BadCredentialsException("Invalid username or password");
		}

	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/register")
	public ResponseEntity register(@RequestHeader(value = "Authorization") String register) {
		String[] creds = register.split(" ");
		String credentials = creds[1];
		String credString = new String(decoder.decode(credentials));
		String[] decoded = credString.split(":");
		String username = decoded[0];
		Double taxRate = Integer.parseInt(decoded[1]) / 100.0;
		String password = decoded[2];

		User user = new User(username, taxRate, password);
		Optional<User> possibleUser = usRepo.findByUserName(user.getUserName());

		if (!possibleUser.isPresent()) {
			service.saveUser(user);
			Map<Object, Object> model = new HashMap<>();
			model.put("message", "User registered");

			return ResponseEntity.ok(model);
		} else {
			throw new BadCredentialsException("User already exists");
		}
	}

}
