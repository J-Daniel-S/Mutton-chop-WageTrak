package wageTrak.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import wageTrak.dao.UserRepository;
import wageTrak.documents.User;

public class UserServiceTest {

	@Mock
	private UserRepository usRepo;

	UserService service;

	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		service = new UserService(usRepo);
	}

	@Test
	public void testFindAll() {
		// given
		when(usRepo.findAll()).thenReturn(new ArrayList<User>());

		// when
		List<User> users = service.findAll();
		assertThat(users).isNotNull();
	}

	@Test
	public void testFindById() {
		// given
		when(usRepo.findById(anyString())).thenReturn(Optional.of(new User()));

		// when
		Optional<User> user = service.findById("test");
		// then
		assertThat(user.isPresent());
	}

	@Test
	public void testFindByUserName() {
		// given
		when(usRepo.findByUserName(anyString())).thenReturn(Optional.of(new User()));

		// when
		Optional<User> user = service.findByUserName("test");

		// then
		assertThat(user.isPresent());
	}

	@Test
	public void testSave() {
		// given
		when(usRepo.findById(anyString())).thenReturn(Optional.empty());

		// when
		boolean bool = service.save(new User());

		// then
		assertThat(!bool);
	}

	@Test
	public void testSaveFails() {
		// given
		when(usRepo.findById(anyString())).thenReturn(Optional.of(new User()));

		// when
		boolean bool = service.save(new User());

		// then
		assertThat(bool);
	}

	@Test
	public void testUpdate() {
		// given
		when(usRepo.existsById(anyString())).thenReturn(true);

		// when
		boolean bool = service.update(new User());

		// then
		assertThat(bool);
	}

	@Test
	public void testUpdateFails() {
		// given
		when(usRepo.existsById(anyString())).thenReturn(false);

		// when
		boolean bool = service.update(new User());

		// then
		assertThat(!bool);
	}

	@Test
	public void testDelete() {
		// given
		when(usRepo.existsById(anyString())).thenReturn(true);

		// when
		boolean bool = service.delete("test");

		// then
		assertThat(bool);
	}

	@Test
	public void testDeleteFails() {
		// given
		when(usRepo.existsById(anyString())).thenReturn(false);

		// when
		boolean bool = service.delete("test");

		// then
		assertThat(!bool);
	}

}
