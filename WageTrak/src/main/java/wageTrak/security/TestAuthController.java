package wageTrak.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.GET })
@RequestMapping("/wageTrak-test-login")
public class TestAuthController {

	@GetMapping
	public HttpStatus authenticate() {
		// throw new RuntimeException("Some error has happened! Contact support at
		// **mumble mumble**");
		return HttpStatus.OK;
	}
}
