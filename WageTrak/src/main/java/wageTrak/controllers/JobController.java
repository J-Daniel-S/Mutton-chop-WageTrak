package wageTrak.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import wageTrak.branches.Job;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wageTrak/{id}")
public class JobController {

	@Autowired
	private UserService usRepo;

	// works
	@PostMapping
	@ResponseBody
	public HttpStatus addJob(@PathVariable("id") String userId, @RequestBody Job job) {
		User user = usRepo.findById(userId);
		if (!user.jobExists(job)) {
			user.addJob(job);
			usRepo.update(user);
			return HttpStatus.CREATED;
		} else {
			return HttpStatus.CONFLICT;
		}

	}

	// works
	@DeleteMapping("/{jobName}")
	@ResponseBody
	public HttpStatus deleteJob(@PathVariable("id") String userId, @PathVariable String jobName) {
		User user = usRepo.findById(userId);
		Optional<Job> maybeJob = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny();
		if (maybeJob.isPresent()) {
			List<Job> jobs = user.getJobs().stream().filter(j -> !j.getName().equalsIgnoreCase(jobName))
					.collect(Collectors.toList());
			user.setJobs(jobs);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}

	}

	// works
	@PutMapping("/{jobName}")
	@ResponseBody
	public HttpStatus editJob(@PathVariable("id") String userId, @PathVariable String jobName,
			@RequestBody Job update) {
		User user = usRepo.findById(userId);
		Optional<Job> maybeJob = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny();
		if (maybeJob.isPresent()) {
			Job job = maybeJob.get();
			job.setName(update.getName());
			job.setRate(update.getRate());
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

}
