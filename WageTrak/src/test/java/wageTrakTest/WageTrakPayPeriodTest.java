package wageTrakTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import wageTrak.documents.branches.PayPeriod;
import wageTrak.documents.branches.Shift;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = wageTrak.WageTrakApplication.class)
public class WageTrakPayPeriodTest {

	@Test
	public void ifPayPeriodNotNullThenSuccess() {
		PayPeriod period = new PayPeriod();
		assertThat(period).isNotNull();
	}

	@Test
	public void ifPayPeriodListNotNullThenSuccess() {
		PayPeriod period = new PayPeriod(new ArrayList<Shift>(), 10, 10, .1);
		assertThat(period.getShifts()).isNotNull();
	}

	@Test
	public void ifPayPeriodNameReturnsProperlyThenSuccess() {
		PayPeriod period = new PayPeriod("name");
		assertThat(period.getDateName().equalsIgnoreCase("name"));
	}

	@Test
	public void ifShiftAddedThenSuccess() {
		PayPeriod period = new PayPeriod();
		period.addShift(new Shift());
		assertThat(period.getShifts().size() == 1);
	}

	@Test
	public void ifShiftEditedProperlyThenSuccess() {
		List<Shift> shifts = new ArrayList<>();
		Shift shift = (new Shift("07-10"));
		shifts.add(shift);
		PayPeriod period = new PayPeriod();
		period.setShifts(shifts);
		shift.setDate("07-11");
		period.editShift(shift, "07-10");
		assertThat(period.getShifts().get(0).getDate().equals("07-11"));
	}

	@Test
	public void ifShiftDeletedThenSuccess() {
		PayPeriod period = new PayPeriod();
		period.addShift(new Shift("07-10"));
		period.deleteShift("07-10");
		assertThat(period.getShifts().size() == 0);
	}

	@Test
	public void ifPayPeriodPayGrossPayUpdatedThenSuccess() {
		PayPeriod period = new PayPeriod();
		Shift shift = new Shift("test", 8, 10, 10, 1, 0);
		period.addShift(shift);
		period.updatePay();
		assertThat(period.getGrossPay() == 10);
	}

	@Test
	public void ifPayPeriodPayNetPayUpdatedThenSuccess() {
		PayPeriod period = new PayPeriod();
		Shift shift = new Shift("test", 8, 10, 10, 1, 0);
		period.addShift(shift);
		period.updatePay();
		assertThat(period.getNetPay() == 10);
	}

	@Test
	public void ifPayPeriodPayUpdatedThenSuccess() {
		PayPeriod period = new PayPeriod();
		Shift shift = new Shift("test", 8, 10, 10, 1, 0);
		period.addShift(shift);
		period.updatePay();
		assertThat(period.getTaxes() == 1);
	}
}
