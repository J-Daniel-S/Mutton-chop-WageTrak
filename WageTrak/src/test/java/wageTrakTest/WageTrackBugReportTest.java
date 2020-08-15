package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.documents.BugReport;
import wageTrak.documents.User;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
public class WageTrackBugReportTest {

	@Test
	public void ifBugReportNotNullThenSuccess() {
		BugReport report = new BugReport();
		assertThat(report).isNotNull();
	}

	@Test
	public void ifUserIdSavesThenSuccess() {
		User user = new User();
		user.setId("test");
		BugReport report = new BugReport(user.getId(), "test report");
		assertThat(report.getUserId().equals(user.getId()));
	}

}
