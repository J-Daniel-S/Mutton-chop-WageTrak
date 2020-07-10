package wageTrak.entities;

public class Withholdings {
	private double withholdings;

	public Withholdings(double withholdings) {
		super();
		this.withholdings = withholdings;
	}

	public Withholdings() {

	}

	public double getWithholdings() {
		return withholdings;
	}

	public void setWithholdings(double withholdings) {
		this.withholdings = withholdings;
	}

	@Override
	public String toString() {
		return "Withholdings [withholdings=" + withholdings + "]";
	}

}
