package wageTrak.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.documents.User;
import wageTrak.documents.branches.Job;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wageTrak/{id}")
public class JobController {

	@Autowired
	private UserService usRepo;

	// for testing
	public JobController(UserService usRepo) {
		this.usRepo = usRepo;
	}

	@PostMapping
	@ResponseBody
	public User addJob(@PathVariable("id") final String userId, @RequestBody Job job) {
		Optional<User> foundUser = usRepo.findById(userId);
		User user = foundUser.get();
		if (!user.jobExists(job)) {
			user.addJob(job);
			usRepo.update(user);
			return user;
		} else {
			// perhaps I must needs return something else here (ask about on stack overflow)
			return foundUser.get();
		}

	}

	@DeleteMapping("/{jobName}")
	@ResponseBody
	public User deleteJob(@PathVariable("id") final String userId, @PathVariable final String jobName) {
		Optional<User> foundUser = usRepo.findById(userId);
		User user = foundUser.get();
		Optional<Job> maybeJob = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny();
		if (maybeJob.isPresent()) {
			List<Job> jobs = user.getJobs().stream().filter(j -> !j.getName().equalsIgnoreCase(jobName))
					.collect(Collectors.toList());
			user.setJobs(jobs);
			usRepo.update(user);
			return user;
		} else {
			return foundUser.get();
		}

	}

	@PutMapping("/{jobName}")
	@ResponseBody
	public User editJob(@PathVariable("id") final String userId, @PathVariable final String jobName,
			@RequestBody Job update) {
		Optional<User> foundUser = usRepo.findById(userId);
		User user = foundUser.get();
		Optional<Job> maybeJob = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny();
		if (maybeJob.isPresent()) {
			Job job = maybeJob.get();
			job.setName(update.getName());
			job.setRate(update.getRate());
			usRepo.update(user);
			return user;
		} else {
			// perhaps I must needs return something else here (ask about on stack overflow)
			return usRepo.findById(user.getId()).get();
		}
	}

}
