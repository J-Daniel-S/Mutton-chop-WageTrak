package wageTrak.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wageTrak.dao.UserRepository;
import wageTrak.documents.User;

@Service
public class UserService {

	@Autowired
	private UserRepository usRepo;

	public List<User> findAll() {
		return usRepo.findAll();
	}

	public Optional<User> findById(String id) {
		Optional<User> foundUser = usRepo.findById(id);
		return foundUser;
	}

	public Optional<User> login(String username, String password) {
		Optional<User> foundUser = usRepo.login(username, password);
		return foundUser;
	}

	public Optional<User> findByUserName(String username) {
		Optional<User> foundUser = usRepo.findByUserName(username);
		return foundUser;
	}

	public boolean save(User user) {
		Optional<User> findUser = usRepo.findById(user.getId());
		if (findUser.isPresent()) {
			return false;
		} else {
			usRepo.insert(user);
			return true;
		}

	}

	public boolean update(User user) {
		if (usRepo.existsById(user.getId())) {
			usRepo.deleteById(user.getId());
			usRepo.insert(user);
			return true;
		} else {
			return false;
		}
	}

	public boolean delete(String id) {
		if (usRepo.existsById(id)) {
			usRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

}
