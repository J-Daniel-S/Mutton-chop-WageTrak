package wageTrak.documents;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import wageTrak.branches.Job;

@Document(collection = "users")
public class User {

	@Id
	private String id;
	private String name;
	private List<Job> jobs;

	public User(String name, List<Job> jobs) {
		super();
		this.name = name;
		this.jobs = jobs;
	}

	public User(String name) {
		super();
		this.name = name;
		jobs = new ArrayList<Job>();
	}

	public User() {
		jobs = new ArrayList<Job>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Job> getJobs() {
		return jobs;
	}

	public void addJob(Job job) {
		jobs.add(job);
	}

	public boolean jobExists(Job job) {
		List<String> jobNames = jobs.stream().map(j -> j.getName()).collect(Collectors.toList());
		return jobNames.stream().anyMatch(name -> name.equalsIgnoreCase(job.getName()));
	}

	public void updateJob(Job job) {
		List<Job> toUpdate = jobs.stream().filter(j -> !j.getName().equalsIgnoreCase(job.getName()))
				.collect(Collectors.toList());
		toUpdate.add(job);
		jobs = toUpdate;
	}

	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

	@Override
	public String toString() {
		return "User [name=" + name + ", jobs=" + jobs + "]";
	}

}
