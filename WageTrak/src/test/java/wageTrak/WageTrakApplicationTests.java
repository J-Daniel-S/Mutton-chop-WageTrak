package wageTrak;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import wageTrak.controllers.UserController;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@SpringBootTest
class WageTrakApplicationTests {

	@Autowired
	UserService usRepo;
	@Autowired
	MockMvc mvc;
	@MockBean
	private UserController userController;

	private static final Gson json = new GsonBuilder().disableHtmlEscaping().disableInnerClassSerialization().create();

	@Test
	void testIfUserSavesThenSuccess() {

		User test = new User("testUser");

		usRepo.save(test);

		assertThat(usRepo.findAll()).extracting("name").containsOnly("testUser");

	}

	@Test
	void testIfUserPostRequestWorks() throws Exception {
		User test = new User("testUser2");

		mvc.perform(MockMvcRequestBuilders.post("/wageTrak/users").content(json.toJson(test))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print());
	}

}
