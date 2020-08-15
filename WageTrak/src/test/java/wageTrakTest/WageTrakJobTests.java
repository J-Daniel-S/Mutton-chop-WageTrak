package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.documents.branches.Job;
import wageTrak.documents.branches.PayPeriod;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
public class WageTrakJobTests {

	@Test
	public void ifJobNotNullThenSuccess() {
		Job job = new Job();
		assertThat(job).isNotNull();
	}

	@Test
	public void ifJobNameReturnsProperlyThenSuccess() {
		Job job = new Job("job", 0.2);
		assertThat(job.getName().equalsIgnoreCase("job"));
	}

	@Test
	public void ifJobRateReturnsProperlyThenSuccess() {
		Job job = new Job("job", 0.2);
		assertThat(job.getRate() == 0.2);
	}

	@Test
	public void ifPayPeriodNotNullThenSuccess() {
		List<PayPeriod> periods = new ArrayList<>();
		periods.add(new PayPeriod());
		Job job = new Job("job", 0.2, periods);
		assertThat(job.getPayPeriods().get(0)).isNotNull();
	}

	@Test
	public void ifPayPeriodAddedThenSuccess() {
		Job job = new Job("job", 0.2);
		job.addPayPeriod(new PayPeriod());
		assertThat(job.getPayPeriods().size() == 1);
	}

	@Test
	public void ifPayPeriodDeletedThenSuccess() {
		Job job = new Job("job", 0.2);
		job.addPayPeriod(new PayPeriod("name"));
		job.deletePayPeriod("name");
		assertThat(job.getPayPeriods().size() == 0);
	}

	@Test
	public void ifPeriodIsUpdatedThenSuccess() {
		Job job = new Job("job", 0.2);
		job.addPayPeriod(new PayPeriod("name"));
		job.updatePayPeriod(new PayPeriod("newName"), "name");
		assertThat(job.getPayPeriods().get(0).getDateName().equalsIgnoreCase("newName"));
	}

	@Test
	public void ifPayPeriodExistsStringArgWorksThenSuccess() {
		Job job = new Job("job", 0.2);
		job.addPayPeriod(new PayPeriod("name"));
		assertThat(job.payPeriodExists("name"));
	}

	@Test
	public void ifPayPeriodExistsPayPeriodArgWorksThenSuccess() {
		Job job = new Job("job", 0.2);
		PayPeriod period = new PayPeriod("name");
		job.addPayPeriod(period);
		assertThat(job.payPeriodExists(period));
	}

}
