package wageTrak.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguation extends WebSecurityConfigurerAdapter {
//
//	@Autowired
//	private MongoUserDetailsService detailsService;
//
//	@Autowired
//	private BCryptPasswordEncoder encoder;
//
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers(HttpMethod.POST, "/wageTrak/users").permitAll().anyRequest().authenticated().and()
				// .formLogin().and()
				.httpBasic();
	}
//
//	@Override
//	public void configure(AuthenticationManagerBuilder builder) throws Exception {
//		builder.userDetailsService(detailsService);
//	}
//
//	@Bean
//	public BCryptPasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
}
