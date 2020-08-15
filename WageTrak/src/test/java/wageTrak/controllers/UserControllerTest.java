package wageTrak.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import wageTrak.documents.User;
import wageTrak.services.UserService;

public class UserControllerTest {

	@Mock
	UserService usRepo;

	UserController controller;

	@Before
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		controller = new UserController(usRepo);
	}

	@Test
	public void testAddUser() {
		// given
		when(usRepo.save(any(User.class))).thenReturn(true);

		// when
		User savedUser = controller.addUser(new User());

		// then
		assertThat(savedUser).isNotNull();
	}

	@Test(expected = RuntimeException.class)
	public void testAddUserFails() {
		when(usRepo.save(any(User.class))).thenThrow(new RuntimeException("Cannot Add User"));
		@SuppressWarnings("unused")
		User savedUser = controller.addUser(new User());
	}

	@Test
	public void testGetUser() {
		// given
		User user = new User();
		user.setId("test");
		when(usRepo.findById("test")).thenReturn(Optional.of(user));

		// when
		User testUser = controller.getUser("test");

		// then
		assertThat(testUser.getId().equals("test"));
	}

	@Test(expected = RuntimeException.class)
	public void testGetUserFails() {
		// given
		User user = new User();
		user.setId("test");
		when(usRepo.findById("test")).thenReturn(Optional.empty());

		// when
		User testUser = controller.getUser("test");
	}

	@Test
	public void testGetUsers() {
		// given
		List<User> users = new ArrayList<>();
		users.add(new User("bob"));
		users.add(new User("frank"));
		users.add(new User("curly jefferson"));
		when(usRepo.findAll()).thenReturn(users);

		// when
		List<User> returnedUsers = controller.getUsers();

		// then
		assertThat(returnedUsers.size() == 3);
	}

	@Test
	public void testDeleteUser() {
		// given
		when(usRepo.delete(any(String.class))).thenReturn(true);
		String id = "test";

		// when
		@SuppressWarnings("rawtypes")
		ResponseEntity entity = controller.deleteUser(id);
		// then
		assertThat(entity.getStatusCode() == HttpStatus.OK);
	}

}
