import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/jobs/${id}`)
            .then((response) => {
                setJob(response.data);
            })
            .catch((error) => {
                console.error("Error fetching job:", error);
            });
    }, [id]);

    if (!job) {
        return <h2>Loading job details...</h2>;
    }

    return (
        <div>
            <h1>{job.title}</h1>

            <h2>{job.company}</h2>

            <p>📍 {job.location}</p>

            <p>💼 {job.type}</p>

            <p>💰 {job.salary}</p>

            <h3>Skills</h3>

            {job.skills.map((skill, index) => (
                <span key={index}> {skill} </span>
            ))}

            <h3>Description</h3>

            <p>{job.description}</p>

            <a
                href={job.applyLink}
                target="_blank"
                rel="noreferrer"
            >
                Apply Now →
            </a>
        </div>
    );
}

export default JobDetails;