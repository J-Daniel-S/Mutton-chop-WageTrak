package wageTrak.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

//this class exists due to the unfortunate fact that User is already taken by the primary object of this application
public class SecurityUser extends User {
	// probably don't need this

	public SecurityUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}

}
