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
import wageTrak.services.UserService;

public class PayPeriodControllerTest {

	@Mock
	UserService usRepo;

	PayPeriodController controller;

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		controller = new PayPeriodController(usRepo);
	}

	@Test
	public void testAddPeriod() {
		// given
		User user = new User();
		String jobName = "testName";
		Job job = new Job(jobName, 0);
		user.addJob(job);
		PayPeriod period = new PayPeriod();
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User periodAdded = controller.addPeriod("test", jobName, period);

		// then
		assertThat(periodAdded.getJobs().get(0).getPayPeriods().size() == 1);
	}

	@Test
	public void testAddPeriodFails() {
		// given
		User user = new User();
		String jobName = "testName";
		String dateName = "test";
		Job job = new Job(jobName, 0);
		PayPeriod period = new PayPeriod(dateName);
		job.addPayPeriod(period);
		user.addJob(job);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		PayPeriod samePeriod = new PayPeriod(dateName);
		User periodAdded = controller.addPeriod("test", jobName, samePeriod);

		// then
		assertThat(periodAdded.getJobs().get(0).getPayPeriods().size() == 1);
	}

	@Test
	public void testDeletePeriod() {
		// given
		User user = new User();
		String jobName = "testName";
		String dateName = "test";
		Job job = new Job(jobName, 0);
		PayPeriod period = new PayPeriod(dateName);
		job.addPayPeriod(period);
		user.addJob(job);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User periodDeleted = controller.deletePeriod("test", jobName, dateName);

		// then
		assertThat(periodDeleted.getJobs().get(0).getPayPeriods().size() == 0);
	}

	@Test
	public void testUpdatePeriod() {
		// given
		User user = new User();
		String jobName = "testName";
		String dateName = "test";
		Job job = new Job(jobName, 0);
		PayPeriod period = new PayPeriod("oldName");
		job.addPayPeriod(period);
		user.addJob(job);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User periodDeleted = controller.updatePeriod("test", jobName, period, dateName);

		// then
		assertThat(periodDeleted.getJobs().get(0).getPayPeriods().size() == 0);
	}

}
