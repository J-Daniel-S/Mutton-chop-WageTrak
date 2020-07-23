package wageTrak.controllers;

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

import wageTrak.branches.Job;
import wageTrak.branches.PayPeriod;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wageTrak/{id}/{jobName}")
public class PayPeriodController {

	@Autowired
	private UserService usRepo;

	// works
	@PostMapping
	@ResponseBody
	public User addPeriod(@PathVariable String id, @PathVariable String jobName, @RequestBody PayPeriod period) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (!job.payPeriodExists(period)) {
			job.addPayPeriod(period);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			// perhaps I must needs return something else here (ask about on stack overflow)
			return usRepo.findById(user.getId());
		}

	}

	// works
	@DeleteMapping("/{dateName}")
	@ResponseBody
	public User deletePeriod(@PathVariable String id, @PathVariable String jobName, @PathVariable String dateName) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (job.payPeriodExists(dateName)) {
			job.deletePayPeriod(dateName);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId());
		}

	}

	// works
	@PutMapping("/{oldDateName}")
	@ResponseBody
	public User updatePeriod(@PathVariable String id, @PathVariable String jobName, @RequestBody PayPeriod payPeriod,
			@PathVariable String oldDateName) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (job.payPeriodExists(oldDateName)) {
			job.updatePayPeriod(payPeriod, oldDateName);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId());
		}
	}

}
