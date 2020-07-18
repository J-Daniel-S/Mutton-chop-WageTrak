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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.documents.User;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
@RequestMapping("/wageTrak/users")
public class UserController {

	@Autowired
	private UserService usRepo;

	// works
	@PostMapping
	public HttpStatus addUser(@RequestBody User newUser) {
		User user = newUser;
		boolean saved = usRepo.save(user);
		if (saved) {
			return HttpStatus.CREATED;
		} else {
			return HttpStatus.CONFLICT;
		}

	}

	// works
	@GetMapping("/{id}")
	@ResponseBody
	public User getUser(@PathVariable String id) {
		return usRepo.findById(id);
	}

	// works
	@GetMapping
	public List<User> getUsers() {
		return usRepo.findAll();
	}

	// works
	@PutMapping
	public HttpStatus updateUser(@RequestBody User user) {
		boolean updated = usRepo.update(user);
		if (updated) {
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

	// works
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
