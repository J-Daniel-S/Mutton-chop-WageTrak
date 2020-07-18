package wageTrak.controllers;

import java.util.Optional;

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
import wageTrak.branches.Shift;
import wageTrak.branches.Week;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RequestMapping("/wageTrak/{id}/{jobName}/{dateName}")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ShiftController {

	@Autowired
	private UserService usRepo;

	// works
	@PostMapping
	@ResponseBody
	public HttpStatus addShift(@PathVariable String id, @PathVariable String jobName, @PathVariable String dateName,
			@RequestBody Shift shift) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();

		Week week = job.getWeeks().stream().filter(w -> w.getDateName().equals(dateName)).findAny().get();
		if (week.shiftExists(shift)) {
			// must add taxRate to user
			shift.calcPay(job.getRate(), 0.18);
			week.addShift(shift);
			week.updatePay();
			job.updateWeeks(week);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.CREATED;
		} else {
			return HttpStatus.CONFLICT;
		}
	}

	// works
	// look into findAny v findFirst
	@DeleteMapping("/{date}")
	@ResponseBody
	public HttpStatus deleteShift(@PathVariable String id, @PathVariable String jobName, @PathVariable String dateName,
			@PathVariable String date) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		Optional<Week> maybeWeek = job.getWeeks().stream().filter(w -> w.getDateName().equalsIgnoreCase(dateName))
				.findAny();
		if (maybeWeek.isPresent()) {
			Week week = maybeWeek.get();
			week.deleteShift(date);
			job.updateWeeks(week);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

	// works
	@PutMapping("/{oldDate}")
	@ResponseBody
	public HttpStatus editShift(@PathVariable String id, @PathVariable String jobName, @PathVariable String dateName,
			@RequestBody Shift shift, @PathVariable String oldDate) {
		User user = usRepo.findById(id);
		Job job = user.getJobs().stream().filter(j -> j.getName().equalsIgnoreCase(jobName)).findAny().get();
		Optional<Week> maybeWeek = job.getWeeks().stream().filter(w -> w.getDateName().equalsIgnoreCase(dateName))
				.findAny();
		if (maybeWeek.isPresent()) {
			Week week = maybeWeek.get();
			// must add taxrate here
			shift.updatePay(job.getRate(), 0.18);
			week.editShift(shift, oldDate);
			job.updateWeeks(week);
			user.updateJob(job);
			usRepo.update(user);
			return HttpStatus.ACCEPTED;
		} else {
			return HttpStatus.NO_CONTENT;
		}
	}

}
