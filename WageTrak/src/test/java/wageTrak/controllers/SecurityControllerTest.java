package wageTrak.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import wageTrak.documents.User;
import wageTrak.security.jwt.JwtTokenProvider;
import wageTrak.services.CustomUserDetailsService;
import wageTrak.services.UserService;

public class SecurityControllerTest {

	@Mock
	AuthenticationManager manager;

	@Mock
	JwtTokenProvider provider;

	@Mock
	UserService usRepo;

	@Mock
	CustomUserDetailsService service;

	private SecurityController controller;

	private Encoder encoder;

	private String user;

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		controller = new SecurityController(manager, provider, usRepo, service);
		encoder = Base64.getEncoder().withoutPadding();
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testLogin() {
		// given
		String creds = encoder.encodeToString("test:testPassword".getBytes());
		user = "Basic " + creds;
		User theUser = new User();
		when(service.findUserByUsername(anyString())).thenReturn(theUser);
		when(provider.createToken(anyString(), any(SimpleGrantedAuthority.class))).thenReturn("token");

		// when
		@SuppressWarnings("rawtypes")
		ResponseEntity entity = controller.login(user);

		// then
		Map<Object, Object> model = new HashMap<>();
		model = (Map<Object, Object>) entity.getBody();
		assertThat(entity.getStatusCode().equals(HttpStatus.OK));
		assertThat(model.containsKey("UserId"));
		assertThat(model.containsValue("Bearer token"));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testRegister() {
		// given
		String creds = encoder.encodeToString("test:0:testPassword".getBytes());
		user = "Basic " + creds;
		when(provider.createToken(anyString(), any(SimpleGrantedAuthority.class))).thenReturn("token");

		// when
		@SuppressWarnings("rawtypes")
		ResponseEntity entity = controller.register(user);

		// then
		Map<Object, Object> model = new HashMap<>();
		model = (Map<Object, Object>) entity.getBody();
		assertThat(entity.getStatusCode().equals(HttpStatus.OK));
		assertThat(model.containsValue("User registered"));
	}

}
