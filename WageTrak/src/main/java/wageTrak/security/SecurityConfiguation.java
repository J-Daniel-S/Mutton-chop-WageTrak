package wageTrak.security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import wageTrak.security.jwt.JwtConfigurer;
import wageTrak.security.jwt.JwtTokenProvider;
import wageTrak.services.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguation extends WebSecurityConfigurerAdapter {

	@Autowired
	JwtTokenProvider provider;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private JwtConfigurer configurer;

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		UserDetailsService service = mongoUserDetails();
		auth.userDetailsService(service).passwordEncoder(encoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable().csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**")
				.permitAll().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers("/wageTrak-login/*").permitAll()
				.antMatchers(HttpMethod.GET, "/wageTrak/users").hasAuthority("ADMIN")
				.antMatchers(HttpMethod.POST, "/wageTrak/users").hasAuthority("ADMIN").antMatchers("/wageTrak")
				.hasAuthority("USER").anyRequest().authenticated().and().csrf().disable().exceptionHandling()
				.authenticationEntryPoint(unauthorizedEntryPoint()).and().apply(configurer);
	}

	// This method removes web security for UserController.addUser() for testing
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.POST, "/wageTrak/users");
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public AuthenticationEntryPoint unauthorizedEntryPoint() {
		return (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
				"Unauthorized");
	}

	@Bean
	public UserDetailsService mongoUserDetails() {
		return new CustomUserDetailsService();
	}
}
