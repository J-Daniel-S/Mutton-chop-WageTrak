package wageTrak.controllers;

import org.springframework.beans.factory.annotation.Autowired;
/*
 * The data stored in weeks is represented as pay periods on the front end.
 * 
 */
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
import wageTrak.branches.Week;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wageTrak/{id}/{jobName}")
public class WeekController {

	@Autowired
	private UserService usRepo;

	// works
	@PostMapping
	@ResponseBody
	public HttpStatus addWeek(@PathVariable String id, @PathVariable String jobName, @RequestBody Week week) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (!job.weekExists(week)) {
			job.addWeek(week);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.CREATED;
		} else {
			return HttpStatus.CONFLICT;
		}

	}

	// works
	@DeleteMapping("/{dateName}")
	@ResponseBody
	public HttpStatus deleteWeek(@PathVariable String id, @PathVariable String jobName, @PathVariable String dateName) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (job.weekExists(dateName)) {
			job.deleteWeek(dateName);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}

	}

	// works
	@PutMapping("/{oldDateName}")
	@ResponseBody
	public HttpStatus updateWeek(@PathVariable String id, @PathVariable String jobName, @RequestBody Week week,
			@PathVariable String oldDateName) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (job.weekExists(oldDateName)) {
			job.updateWeeks(week, oldDateName);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

}
