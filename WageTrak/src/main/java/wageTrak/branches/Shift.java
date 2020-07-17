package wageTrak.branches;

import wageTrak.entities.TaxRate;

public class Shift {

	private String date;
	private double hours;
	private double grossPay;
	private double netPay;
	private double taxes;
	private boolean night;

	public Shift(String date, double hoursWorked, double grossPay, double netPay, double taxes, boolean night) {
		super();
		this.date = date;
		this.hours = hoursWorked;
		this.grossPay = grossPay;
		this.netPay = netPay;
		this.taxes = taxes;
		this.night = night;
	}

	public Shift(Job job, double hoursWorked, String date) {
		super();
		this.grossPay = job.getRate() * hoursWorked;
		this.hours = hoursWorked;
		this.taxes = this.grossPay * TaxRate.getTaxRate();
		this.netPay = grossPay - this.taxes;
		this.date = date;
	}

	public Shift(String dateString) {
		this.date = dateString;
	}

	public Shift() {

	}

	public void calcPay(double rate, double taxRate) {
		this.grossPay = Math.round((rate * this.hours) * 100.0) / 100.0;
		this.netPay = Math.round(((this.grossPay * (1 - taxRate)) * 100.0)) / 100.0;
		this.taxes = Math.round((this.grossPay * taxRate) * 100.0) / 100.0;
	}

	public double getHours() {
		return hours;
	}

	public void addHours(double hours) {
		this.hours = hours;
	}

	public double getGrossPay() {
		return grossPay;
	}

	public void setGrossPay(double grossPay) {
		this.grossPay = grossPay;
	}

	public double getNetPay() {
		return netPay;
	}

	public void setNetPay(double netPay) {
		this.netPay = netPay;
	}

	public double getTaxes() {
		return taxes;
	}

	public void setTaxes(double taxes) {
		this.taxes = taxes;
	}

	public boolean isNight() {
		return night;
	}

	public void setNight(boolean night) {
		this.night = night;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setHours(double hours) {
		this.hours = hours;
	}

	@Override
	public String toString() {
		return "Shift [date=" + date + ", hours=" + hours + ", grossPay=" + grossPay + ", netPay=" + netPay + ", taxes="
				+ taxes + ", night=" + night + "]";
	}

}
