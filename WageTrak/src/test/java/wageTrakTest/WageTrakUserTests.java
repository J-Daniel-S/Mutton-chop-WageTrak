package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.documents.User;
import wageTrak.documents.branches.Job;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
public class WageTrakUserTests {

	@Test
	public void ifUserNotNullThenSuccess() {
		User user = new User();
		assertThat(user).isNotNull();
	}

	@Test
	public void ifNameReturnsProperlyThenSuccess() {
		User user = new User("curly jefferson");
		assertThat(user.getName().equals("curly jefferson"));
	}

	@Test
	public void ifTaxRateReturnsProperlyThenSuccess() {
		User user = new User("curly jefferson", 0.2, "sambo");
		assertThat(user.getTaxRate() == 0.2);
	}

	@Test
	public void ifPasswordReturnsProperlyThenSuccess() {
		User user = new User("curly jefferson", 0.2, "sambo");
		assertThat(user.getPassword().equals("sambo"));
	}

	@Test
	public void ifJobReturnsProperlyThenSuccess() {
		List<Job> jobs = new ArrayList<>();
		Job job = new Job();
		jobs.add(job);
		User user = new User("curly jefferson", "sambo", jobs);
		assertThat(user.getJobs().get(0)).isNotNull();
	}

	@Test
	public void ifJobExistsMethodWorksThenSuccess() {
		User user = new User();
		List<Job> jobs = new ArrayList<>();
		Job job = new Job("job1", 10.00);
		jobs.add(job);
		jobs.add(new Job("job2", 20.00));
		assertThat(user.jobExists(job)).isNotNull();
	}

}
