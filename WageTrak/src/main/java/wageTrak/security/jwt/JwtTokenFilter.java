package wageTrak.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtTokenFilter extends GenericFilterBean {

	private JwtTokenProvider provider;

	public JwtTokenFilter(JwtTokenProvider provider) {
		this.provider = provider;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		String token = provider.resolveToken((HttpServletRequest) req);
		if (token != null && provider.validateToken(token)) {
			Authentication auth = token != null ? provider.getAuthentication(token) : null;
			SecurityContextHolder.getContext().setAuthentication(auth);
		}

		chain.doFilter(req, res);
	}

}
