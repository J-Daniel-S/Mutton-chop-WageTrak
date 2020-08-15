package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.documents.branches.Shift;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
public class WageTrakShiftTest {

	@Test
	public void ifShiftNotNullThenSuccess() {
		Shift shift = new Shift();
		assertThat(shift).isNotNull();
	}

	@Test
	public void ifDateNotNullThenSuccess() {
		Shift shift = new Shift("test");
		assertThat(shift.getDate()).isNotNull();
	}

	@Test
	public void ifHoursWorkedNotNullThenSuccess() {
		Shift shift = new Shift("test", 5, 10, 10, 1, 0);
		assertThat(shift.getHours()).isNotNull();
	}

	@Test
	public void ifCalcPayCalculatesNetPayProperlyThenSucess() {
		Shift shift = new Shift("test", 8, 0);
		shift.calcPay(10.00, 0.18);
		assertThat(shift.getNetPay() == 65.6);
	}

	@Test
	public void ifCalcPayCalculatesTaxProperlyThenSucess() {
		Shift shift = new Shift("test", 8, 0);
		shift.calcPay(10.00, 0.18);
		assertThat(shift.getTaxes() == 14.4);
	}

	@Test
	public void ifCalcPayCalculatesOvertimeNetPayProperlyThenSucess() {
		Shift shift = new Shift("test", 8, 8);
		shift.calcPay(10.00, 0.18);
		assertThat(shift.getNetPay() == 98.4);
	}
}
