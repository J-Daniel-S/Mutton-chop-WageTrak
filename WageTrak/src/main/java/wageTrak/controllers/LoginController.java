package wageTrak.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST })
@RequestMapping("/wageTrak-login")
public class LoginController {

	@Autowired
	private UserService usRepo;

//	@PostMapping
//	public HttpStatus login(@RequestBody User user) {
//			
//	}

}
