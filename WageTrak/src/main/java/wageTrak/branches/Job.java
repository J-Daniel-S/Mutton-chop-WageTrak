package wageTrak.branches;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Job {

	private String name;
	private double rate;
//	private double eveningDifferential;
//	private double nightDifferential;
//	private double weekendDifferential;
	private List<Week> weeks;

	public Job(String name, double rate) {
		super();
		this.name = name;
		this.rate = rate;
		weeks = new ArrayList<Week>();
	}

	public Job() {
		weeks = new ArrayList<Week>();
	}

	public double getRate() {
		return rate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	void setRate(double rate) {
		this.rate = rate;
	}

//	public boolean getNight() {
//		return night;
//	}
//
//	void setNight(boolean night) {
//		this.night = night;
//	}

	public List<Week> getWeeks() {
		return weeks;
	}

	public void addWeek(Week week) {
		weeks.add(week);
	}

	public void deleteWeek(String dateName) {
		List<Week> updateWeeks = weeks.stream().filter(w -> !w.getDateName().equalsIgnoreCase(dateName))
				.collect(Collectors.toList());
		weeks = updateWeeks;
	}

	public void updateWeeks(Week week) {
		List<Week> updateWeeks = weeks.stream().filter(w -> !w.getDateName().equalsIgnoreCase(week.getDateName()))
				.collect(Collectors.toList());
		updateWeeks.add(week);
		weeks = updateWeeks;
	}

	public void updateWeeks(Week week, String oldDateName) {
		List<Week> updateWeeks = weeks.stream().filter(w -> !w.getDateName().equalsIgnoreCase(oldDateName))
				.collect(Collectors.toList());
		updateWeeks.add(week);
		weeks = updateWeeks;
	}

	public boolean weekExists(Week week) {
		List<String> weekNames = weeks.stream().map(w -> w.getDateName()).collect(Collectors.toList());
		return weekNames.stream().anyMatch(w -> w.equalsIgnoreCase(week.getDateName()));
	}

	public boolean weekExists(String dateName) {
		List<String> weekNames = weeks.stream().map(w -> w.getDateName()).collect(Collectors.toList());
		return weekNames.stream().anyMatch(w -> w.equalsIgnoreCase(dateName));
	}

	public void setWeeks(List<Week> weeks) {
		this.weeks = weeks;
	}

	@Override
	public String toString() {
		return "Job [name=" + name + ", rate=" + rate + ", weeks=" + weeks + "]";
	}

}