//package wageTrak.utils;
//
//import wageTrak.branches.Job;
//import wageTrak.branches.Shift;
//
//public class PayCalculator {
//
//	static double withholdings = 0;
//
////	increments hours, gross pay, and pay after taxes
//	static void addShift(Job job, double hours) {
//		Shift shift = new Shift(job, hours);
//		incrementPay(job);
//		// add shift to week
//	}
//
//	// taxes belong here
//	static void incrementPay(Job job, double overtime) {
//		double grossPay = 0;
//		if (job.getHoursWorked() > 40) {
//			grossPay = job.getRate() * 40;
//		} else {
//			grossPay = job.getRate() * job.getHoursWorked();
//		}
//		job.setGrossPay(grossPay + overtime /* + differentialPay(job) */);
//	}
//
//	static void bonus(Job job, double bonus) {
//		job.setGrossPay(job.getGrossPay() + bonus);
//	}
//
////	static void weekEnds(Job job) {
////		if (job.getWeek1() == true) {
////			changeWeeks(job);
////		} else {
////			PayCalculator.payDay(job);
////		}
////	}
////
//////	do not use outside of this interface
////	static void changeWeeks(Job job) {
////		job.setLastWeekHours(job.getHoursWorked());
////		job.setLastWeekGrossPay(job.getGrossPay());
////		job.setLastWeekEarnings(job.getEarnings());
////		job.setLastWeekTaxes(job.getTaxes());
////		job.clearPay();
////		job.setWeek1(false);
////		job.clearHours();
////	}
////
////	static void payDay(Job job) {
////		addToPayDays(job);
////		job.clearHours();
////		job.clearWeek1();
////		job.clearPay();
////	}
//
////	static double differentialPay(Job job) {
////		double diffGrossPay = job.getNight()
////				? (job.getEveningDifferential()) * job.getEveningHours()
////						+ job.getNightHours() * job.getNightDifferential()
////				: 0;
////		return diffGrossPay;
////	}
//
//	// Returns pay for overtime hours (correct number)
//	static double overtime(Job job) {
//		// deal with overtime at the week level
//		double overtimeHours = overtimeHours(job);
//		double overtimeGrossPay = overtimeHours * job.getRate() * 1.5;
//		return overtimeGrossPay;
//	}
//
//	// Returns the proper number of hours
//	static double overtimeHours(Job job) {
//		boolean overtime = job.getHoursWorked() > 40;
//		double overtimeHours = overtime ? job.getHoursWorked() % 40 : 0;
//		return overtimeHours;
//	}
//
//	// Adds each chunk of hours to payDays HashMap
////	static void addToPayDays(Job job) {
////		int key = job.getPayDaysGross().size() + 1;
////		job.getPayDaysGross().put(key, job.getGrossPay() + job.getLastWeekGrossPay());
////		job.getPayDaysNet().put(key, job.getGrossPay() + job.getLastWeekGrossPay() // -
////		// (job.getGrossPay()+job.getLastWeekGrossPay())*Taxes.taxRate.getTaxRate()
////		);
//////		Taxes.storeTax(job, key);
////	}
//}