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
import wageTrak.services.UserService;

public class JobControllerTest {

	@Mock
	UserService usRepo;

	JobController controller;

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		controller = new JobController(usRepo);
	}

	@Test
	public void testAddJob() {
		// given
		User user = new User();
		Job job = new Job();
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User jobAdded = controller.addJob("test", job);

		// then
		assertThat(jobAdded.getJobs().size() == 1);
	}

	@Test
	public void testAddJobFails() {
		// given
		User user = new User();
		Job job = new Job("test", 0);
		user.addJob(job);
		Job copy = new Job("test", 0);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User jobAdded = controller.addJob("test", copy);

		// then
		assertThat(jobAdded.getJobs().size() == 1);
	}

	@Test
	public void testDeleteJob() {
		// given
		User user = new User();
		String jobName = "test";
		Job job = new Job(jobName, 0);
		user.addJob(job);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User jobDelete = controller.deleteJob("testId", jobName);

		// then
		assertThat(jobDelete.getJobs().size() == 0);
	}

	@Test
	public void testEditJob() {
		// given
		User user = new User();
		String jobName = "test";
		String nameUpdate = "testiness";
		Job job = new Job(jobName, 0);
		Job update = new Job(nameUpdate, 0);
		user.addJob(job);
		when(usRepo.findById(anyString())).thenReturn(Optional.of(user));

		// when
		User jobEdited = controller.editJob("testId", jobName, update);

		// then
		assertThat(jobEdited.getJobs().get(0).getName().equals(nameUpdate));
	}

}
