package wageTrak.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wageTrak.branches.Week;
import wageTrak.dao.UserRepository;
import wageTrak.documents.User;

@Service
public class WeekService {
	// I have to work down to this. Jobs next.

	@Autowired
	private UserRepository usRepo;

	public List<Week> findAll(User user) {
		Optional<User> thisUser = usRepo.findById(user.getId());
		thisUser.get().getJobs();

		return null;
	}

	public Week save(Week week) {
		return null;
	}

}

//I will retain the services to find the nested collections