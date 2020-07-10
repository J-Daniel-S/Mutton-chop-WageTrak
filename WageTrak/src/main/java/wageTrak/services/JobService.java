package wageTrak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wageTrak.dao.UserRepository;

@Service
public class JobService {

	@Autowired
	private UserRepository usRepo;
	// this might not be necessary
}
