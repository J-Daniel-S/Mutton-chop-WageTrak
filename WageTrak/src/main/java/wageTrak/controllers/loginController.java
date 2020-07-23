package wageTrak.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wagetrak-login")
public class loginController {

	@Autowired
	UserService usRepo;

//	@GetMapping
//	@ResponseBody
//	public AuthenticationBean login(@RequestBody String userName, @RequestBody String password) {
//
//		return HttpStatus.ACCEPTED;
//	}

}
