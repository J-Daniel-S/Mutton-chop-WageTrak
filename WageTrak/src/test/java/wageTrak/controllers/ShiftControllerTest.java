package wageTrak.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import wageTrak.documents.User;
import wageTrak.documents.branches.Job;
import wageTrak.documents.branches.PayPeriod;
import wageTrak.documents.branches.Shift;
import wageTrak.services.UserService;

public class ShiftControllerTest {

	@Mock
	UserService usRepo;

	ShiftController controller;

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		controller = new ShiftController(usRepo);
	}

	@Test
	public void testAddShift() {
		// given
		User user = new User();
		Job job = new Job("jobName", 0);
		PayPeriod period = new PayPeriod("dateName");
		job.addPayPeriod(period);
		user.addJob(job);
		Shift shift = new Shift();
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User shiftAdded = controller.addShift("test", job.getName(), period.getDateName(), shift);

		// then
		assertThat(shiftAdded.getJobs().get(0).getPayPeriods().get(0).getShifts().size() == 1);
	}

	@Test
	public void testAddShiftFailed() {
		// given
		User user = new User();
		Job job = new Job("jobName", 0);
		PayPeriod period = new PayPeriod("dateName");
		String date = "date";
		Shift shift = new Shift(date);
		period.addShift(shift);
		job.addPayPeriod(period);
		user.addJob(job);

		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		Shift sameShift = new Shift(date);
		User shiftAdded = controller.addShift("test", job.getName(), period.getDateName(), sameShift);

		// then
		assertThat(shiftAdded.getJobs().get(0).getPayPeriods().get(0).getShifts().size() == 1);
	}

	@Test
	public void testDeleteShift() {
		// given
		User user = new User();
		Job job = new Job("jobName", 0);
		PayPeriod period = new PayPeriod("dateName");
		String date = "date";
		Shift shift = new Shift(date);
		period.addShift(shift);
		job.addPayPeriod(period);
		user.addJob(job);

		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User shiftDeleted = controller.deleteShift("test", job.getName(), period.getDateName(), date);

		// then
		assertThat(shiftDeleted.getJobs().get(0).getPayPeriods().get(0).getShifts().size() == 0);
	}

	@Test
	public void testEditShift() {
		// given
		User user = new User();
		String jobName = "jobName";
		Job job = new Job(jobName, 0);
		String dateName = "dateName";
		PayPeriod period = new PayPeriod(dateName);
		String oldDate = "date";
		String newDate = "newDate";
		Shift shift = new Shift(newDate);
		period.addShift(new Shift(oldDate));
		job.addPayPeriod(period);
		user.addJob(job);

		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User editedShift = controller.editShift("testId", jobName, dateName, shift, oldDate);

		// then
		assertThat(editedShift.getJobs().get(0).getPayPeriods().get(0).getShifts().get(0).getDate().equals(newDate)
				&& editedShift.getJobs().get(0).getPayPeriods().get(0).getShifts().size() == 1);
	}

}