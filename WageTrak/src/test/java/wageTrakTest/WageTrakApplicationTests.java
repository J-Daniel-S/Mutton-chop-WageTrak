package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.controllers.BugReportController;
import wageTrak.controllers.JobController;
import wageTrak.controllers.PayPeriodController;
import wageTrak.controllers.SecurityController;
import wageTrak.controllers.ShiftController;
import wageTrak.controllers.UserController;
import wageTrak.dao.BugRepository;
import wageTrak.dao.UserRepository;
import wageTrak.services.BugService;
import wageTrak.services.UserService;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class WageTrakApplicationTests {

	@Autowired
	private UserController userController;
	@Autowired
	private JobController jobController;
	@Autowired
	private ShiftController shiftController;
	@Autowired
	private PayPeriodController periodController;
	@Autowired
	private SecurityController securityController;
	@Autowired
	private BugReportController bugController;
	@Autowired
	private BugRepository bugRepo;
	@Autowired
	private UserRepository usRepo;
	@Autowired
	private UserService usService;
	@Autowired
	private BugService bugService;
	@LocalServerPort
	private int port;
	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void contextLoads() {

	}

	@Test
	public void userLoadsThenSuccess() throws Exception {
		assertThat(userController).isNotNull();
	}

	@Test
	public void jobLoadsThenSuccess() throws Exception {
		assertThat(jobController).isNotNull();
	}

	@Test
	public void periodLoadsThenSuccess() throws Exception {
		assertThat(periodController).isNotNull();
	}

	@Test
	public void shiftLoadsThenSuccess() throws Exception {
		assertThat(shiftController).isNotNull();
	}

	@Test
	public void securityLoadsThenSuccess() throws Exception {
		assertThat(securityController).isNotNull();
	}

	@Test
	public void bugLoadsThenSuccess() throws Exception {
		assertThat(bugController).isNotNull();
	}

	@Test
	public void bugRepositoryLoadsThenSuccess() throws Exception {
		assertThat(bugRepo).isNotNull();
	}

	@Test
	public void userRepoLoadsThenSuccess() throws Exception {
		assertThat(usRepo).isNotNull();
	}

	@Test
	public void userServiceLoadsThenSuccess() throws Exception {
		assertThat(usService).isNotNull();
	}

	@Test
	public void bugServiceLoadsThenSuccess() throws Exception {
		assertThat(bugService).isNotNull();
	}

	// this test fails due to security
	@Test
	public void returns() throws Exception {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port, String.class)).contains("users");
	}

}
