package wageTrakTest;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import wageTrak.controllers.UserController;
import wageTrak.documents.User;
import wageTrak.services.UserService;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class WageTrakMvcTests {

	private MockMvc mockMvc;

	@MockBean
	private UserService usRepo;

	@InjectMocks
	private UserController usController;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(usController).build();
	}

	@Test
	public void testIfAllUsersReturnThenSuccess() throws Exception {
		List<User> users = new ArrayList<>();
		users.add(new User("kevin"));
		users.add(new User("simkins"));
		when(usRepo.findAll()).thenReturn(users);
		mockMvc.perform(get("/wageTrak/users")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].userName", is("kevin"))).andExpect(jsonPath("$[1].userName", is("simkins")));
		verify(usRepo, times(1)).findAll();
		verifyNoMoreInteractions(usRepo);
	}

}
