package wageTrak.branches;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payPeriods")
public class PayPeriod {

	private String dateName; // might have to be a string
	private List<Shift> shifts;
	private double netPay;
	private double grossPay;
	private double taxes;

	public PayPeriod(List<Shift> shifts, double netPay, double grossPay, double taxes) {
		super();
		this.shifts = shifts;
		this.netPay = netPay;
		this.grossPay = grossPay;
		this.taxes = taxes;
	}

	public PayPeriod() {
		shifts = new ArrayList<>();
	}

	public List<Shift> getShifts() {
		return shifts;
	}

	public void setShifts(List<Shift> shifts) {
		this.shifts = shifts;
	}

	public void addShift(Shift shift) {
		shifts.add(shift);
	}

	public void editShift(Shift shift, String oldDate) {
		List<Shift> updateShifts = shifts.stream().filter(s -> !s.getDate().equalsIgnoreCase(oldDate))
				.collect(Collectors.toList());
		updateShifts.add(shift);
		shifts = updateShifts;
	}

	public boolean shiftExists(Shift shift) {
		List<String> dates = shifts.stream().map(s -> s.getDate()).collect(Collectors.toList());
		return dates.stream().noneMatch(str -> str.equals(shift.getDate()));
	}

	public void deleteShift(String date) {
		List<Shift> updateShifts = shifts.stream().filter(s -> !s.getDate().equalsIgnoreCase(date))
				.collect(Collectors.toList());
		shifts = updateShifts;
	}

	public double getNetPay() {
		return netPay;
	}

	public void setNetPay(double netPay) {
		this.netPay = netPay;
	}

	public double getGrossPay() {
		return grossPay;
	}

	public void setGrossPay(double grossPay) {
		this.grossPay = grossPay;
	}

	public double getTaxes() {
		return taxes;
	}

	public void setTaxes(double taxes) {
		this.taxes = taxes;
	}

	public void updatePay() {
		this.grossPay = this.shifts.stream().mapToDouble(s -> s.getGrossPay()).sum();
		this.netPay = this.shifts.stream().mapToDouble(s -> s.getNetPay()).sum();
		this.taxes = this.shifts.stream().mapToDouble(s -> s.getTaxes()).sum();
	}

	public String getDateName() {
		return dateName;
	}

	public void setDateName(String dateRange) {
		this.dateName = dateRange;
	}

	@Override
	public String toString() {
		return "PayPeriod [dateName=" + dateName + ", shifts=" + shifts + ", netPay=" + netPay + ", grossPay="
				+ grossPay + ", taxes=" + taxes + "]";
	}

}