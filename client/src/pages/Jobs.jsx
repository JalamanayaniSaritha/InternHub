import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/jobs")
            .then((response) => {
                console.log(response.data);
                setJobs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []);

    return (
        <div>
            <h1>Jobs & Internships</h1>

            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>Company: {job.company}</p>
                    <p>Type: {job.type}</p>
                    <p>Location: {job.location}</p>
                    <p>Skills: {job.skills.join(", ")}</p>
                    <p>Description: {job.description}</p>
                    <p>Salary: {job.salary}</p>

                    <a href={job.applyLink} target="_blank" rel="noreferrer">
                        Apply Now
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Jobs;