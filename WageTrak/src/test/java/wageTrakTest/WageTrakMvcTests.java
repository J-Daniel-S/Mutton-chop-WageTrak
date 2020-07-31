package wageTrakTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import wageTrak.controllers.UserController;
import wageTrak.documents.User;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
@WebMvcTest(UserController.class)
public class WageTrakMvcTests {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper om;

	@Test
	void testifValidUserThenSuccess() throws Throwable {
		User user = new User("curly jefferson");

		MvcResult result = mockMvc
				.perform(post("/wageTrak/users").contentType("application.json").content(om.writeValueAsString(user)))
				.andReturn();

		List<User> users = om.readValue(result.getResponse().getContentAsString(), new TypeReference<List<User>>() {
		});

		System.out.println(users.get(0).toString());

	}

}
