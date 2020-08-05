package wageTrak.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import wageTrak.documents.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService usRepo;

	@Autowired
	private PasswordEncoder bCryptEncoder;

	public User findUserByUsername(String username) {
		return usRepo.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
	}

	public void saveUser(User user) {
		user.setName(user.getUserName());
		user.setPassword(bCryptEncoder.encode(user.getPassword()));
		usRepo.save(user);
	}

	public UserDetails loadUserById(String userId) throws UsernameNotFoundException {
		User user = usRepo.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found by ID"));

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("USER"));

		return buildUserForAuthentication(user, authorities);
	}

	private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
		// Id is represented in response as "username"
		return new org.springframework.security.core.userdetails.User(user.getId(), user.getPassword(), authorities);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = usRepo.findById(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found by username"));

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("USER"));

		return buildUserForAuthentication(user, authorities);
	}

}
