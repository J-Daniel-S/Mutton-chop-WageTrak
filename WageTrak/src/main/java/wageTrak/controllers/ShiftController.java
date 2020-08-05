package wageTrak.controllers;

import java.util.Optional;

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
import wageTrak.documents.branches.Shift;
import wageTrak.services.UserService;

@RequestMapping("/wageTrak/{id}/{jobName}/{dateName}")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ShiftController {

	@Autowired
	private UserService usRepo;

	@PostMapping
	@ResponseBody
	public User addShift(@PathVariable final String id, @PathVariable final String jobName,
			@PathVariable final String dateName, @RequestBody Shift shift) {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();

		PayPeriod period = job.getPayPeriods().stream().filter(w -> w.getDateName().equals(dateName)).findAny().get();
		if (period.shiftExists(shift)) {
			shift.calcPay(job.getRate(), user.getTaxRate());
			period.addShift(shift);
			period.updatePay();
			job.updatePayPeriod(period);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId()).get();
		}
	}

	@DeleteMapping("/{date}")
	@ResponseBody
	public User deleteShift(@PathVariable final String id, @PathVariable final String jobName,
			@PathVariable final String dateName, @PathVariable String date) {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		Optional<PayPeriod> maybePeriod = job.getPayPeriods().stream()
				.filter(w -> w.getDateName().equalsIgnoreCase(dateName)).findAny();
		if (maybePeriod.isPresent()) {
			PayPeriod period = maybePeriod.get();
			period.deleteShift(date);
			job.updatePayPeriod(period);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId()).get();
		}
	}

	@PutMapping("/{oldDate}")
	@ResponseBody
	public User editShift(@PathVariable final String id, @PathVariable final String jobName,
			@PathVariable final String dateName, @RequestBody Shift shift, @PathVariable String oldDate) {
		User user = usRepo.findById(id).get();
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		Optional<PayPeriod> maybePeriod = job.getPayPeriods().stream()
				.filter(p -> p.getDateName().equalsIgnoreCase(dateName)).findAny();
		if (maybePeriod.isPresent()) {
			PayPeriod period = maybePeriod.get();
			shift.updatePay(job.getRate(), user.getTaxRate());
			period.editShift(shift, oldDate);
			job.updatePayPeriod(period);
			user.updateJob(job);
			usRepo.update(user);
			return user;
		} else {
			return usRepo.findById(user.getId()).get();
		}
	}

}
