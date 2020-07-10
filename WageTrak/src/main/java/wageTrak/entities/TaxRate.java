package wageTrak.entities;

public class TaxRate {
	private static double taxRate = 0.18;

	public TaxRate(double rate) {
		super();
		taxRate = rate;
	}

	public TaxRate() {

	}

	public static double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(double rate) {
		taxRate = rate;
	}

	@Override
	public String toString() {
		return "TaxRate [taxRate=" + taxRate + "]";
	}

}
