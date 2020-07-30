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

import wageTrak.controllers.UserController;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class WageTrakApplicationTests {

	@Autowired
	private UserController userController;
	@LocalServerPort
	private int port;
	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void contextLoadsThenSuccess() throws Exception {
		assertThat(userController).isNotNull();
	}

	@Test
	public void returns() throws Exception {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port, String.class)).contains("users");
	}

}
