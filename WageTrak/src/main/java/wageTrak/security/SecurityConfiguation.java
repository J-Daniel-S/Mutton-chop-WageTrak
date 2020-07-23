//package wageTrak.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import wageTrak.services.MongoUserDetailsService;
//
//@Configuration
//@EnableConfigurationProperties
//@EnableWebSecurity
//public class SecurityConfiguation extends WebSecurityConfigurerAdapter {
//
//	@Autowired
//	private MongoUserDetailsService detailsService;
//
//	@Autowired
//	private BCryptPasswordEncoder encoder;
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
////		http.csrf().disable().authorizeRequests().anyRequest().authenticated().and().httpBasic().and()
////				.sessionManagement().disable();
//
//		http.authorizeRequests().antMatchers("/").permitAll();
//	}
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
//}
