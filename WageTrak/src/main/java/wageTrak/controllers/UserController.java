package wageTrak.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.documents.User;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
@RequestMapping("/wageTrak/users")
public class UserController {

	@Autowired
	private UserService usRepo;

	@PostMapping
	public User addUser(@RequestBody User newUser) {
		String id = newUser.getId();
		User user = newUser;
		boolean saved = usRepo.save(user);
		if (saved) {
			return user; // change to JSON
		} else {
			return usRepo.findById(id);
		}

	}

	@GetMapping("/{id}")
	@ResponseBody
	public User getUser(@PathVariable String id) {
		return usRepo.findById(id);
	}

	@GetMapping
	public List<User> getUsers() {
		return usRepo.findAll();
	}

	@PutMapping
	public User updateUser(@RequestBody User user) {
		String id = user.getId();
		User newUser = usRepo.findById(id);
		newUser.setName(user.getName());
		newUser.setTaxRate(user.getTaxRate());
		usRepo.update(newUser);
		return usRepo.findById(id);
	}

	@DeleteMapping("{id}")
	public HttpStatus deleteUser(@PathVariable String id) {
		boolean status = usRepo.delete(id);
		if (status) {
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

}
