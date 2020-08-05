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

import wageTrak.documents.User;
import wageTrak.documents.branches.Job;
import wageTrak.documents.branches.PayPeriod;
import wageTrak.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/wageTrak/{id}/{jobName}")
public class PayPeriodController {

	@Autowired
	private UserService usRepo;

	@PostMapping
	@ResponseBody
	public User addPeriod(@PathVariable final String id, @PathVariable final String jobName,
			@RequestBody PayPeriod period) {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (!job.payPeriodExists(period)) {
			job.addPayPeriod(period);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			// perhaps I must needs return something else here (ask about on stack overflow)
			return usRepo.findById(user.getId()).get();
		}

	}

	@DeleteMapping("/{dateName}")
	@ResponseBody
	public User deletePeriod(@PathVariable final String id, @PathVariable final String jobName,
			@PathVariable final String dateName) throws InterruptedException {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		job.deletePayPeriod(dateName);
		user.updateJob(job);
		usRepo.update(user);
		return usRepo.findById(user.getId()).get();
	}

	@PutMapping("/{oldDateName}")
	@ResponseBody
	public User updatePeriod(@PathVariable final String id, @PathVariable final String jobName,
			@RequestBody PayPeriod payPeriod, @PathVariable String oldDateName) {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		if (job.payPeriodExists(oldDateName)) {
			job.updatePayPeriod(payPeriod, oldDateName);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId()).get();
		}
	}

}
