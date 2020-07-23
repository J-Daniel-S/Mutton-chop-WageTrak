//package wageTrak.services;
//
//import java.util.Arrays;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import wageTrak.documents.User;
//import wageTrak.security.SecurityUser;
//
//@Component
//public class MongoUserDetailsService implements UserDetailsService {
//
//	@Autowired
//	private UserService usRepo;
//
//	@Autowired
//	BCryptPasswordEncoder encoder;
//
//	@Override
//	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
//		User user = usRepo.findByUserName(name);
//
//		if (user.getName().equals("noSuchUser")) {
//			throw new UsernameNotFoundException("User not found");
//		}
//
//		List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("user"));
//
//		return new SecurityUser(user.getUserName(), user.getPassword(), authorities);
//
//	}
//
//	public void saveUser(User user) {
//		user.setPassword(encoder.encode(user.getPassword()));
//		usRepo.save(user);
//	}
//
//}
