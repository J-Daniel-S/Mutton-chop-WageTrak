package wageTrak.logging;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import wageTrak.WageTrakApplication;

@Aspect
@Component
public class LogginAspect {

	private final Logger log = LoggerFactory.getLogger(WageTrakApplication.class);

	@Pointcut("within(wageTrak.documents..*) ||" + " within(wageTrak.controllers..*) ||" + "within(wageTrak.dao..*) ||"
			+ "within(wageTrak.security..*) ||" + "within(wageTrak.branches..*) ||" + "within(wageTrak.services..*) ||"
			+ "within(wageTrak.utils..*)")
	public void definePackagePointcuts() {

	}

	@AfterThrowing(pointcut = "definePackagePointcuts()", throwing = "e")
	public void logAfterThrowing(JoinPoint point, Throwable e) {

		log.trace(" \n\n\n");
		log.trace("*************Exception in {}.{}() with cause = {}*************",
				point.getSignature().getDeclaringTypeName(), point.getSignature().getName(),
				e.getCause() != null ? e.getCause() : "NULL");
		log.trace("______________________________________________________________\n");
	}

	@Before("definePackagePointcuts()")
	public void logBefore(JoinPoint point) {
		log.debug("\nBefore --{}.{} with args {}--\n", point.getSignature().getDeclaringTypeName(),
				point.getSignature().getName(), Arrays.toString(point.getArgs()));
	}

	@After("definePackagePointcuts()")
	public void logAfter(JoinPoint point) {
		log.debug("\nAfter --{}.{}", point.getSignature().getDeclaringTypeName(), point.getSignature().getName());
	}

}
