import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./JobDetails.css";

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
        <div className="details-page">

            <Link to="/" className="back-link">
                ← Back to Jobs
            </Link>

            <div className="details-card">

                <div className="details-header">
                    <div className="details-logo">
                        {job.company.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1>{job.title}</h1>
                        <h2>{job.company}</h2>
                    </div>
                </div>

                <div className="details-info">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary || "Not specified"}</span>
                </div>

                <h3>Job Description</h3>
                <p>{job.description}</p>

                <h3>Required Skills</h3>

                <div className="details-skills">
                    {job.skills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                    ))}
                </div>

                <a
                    className="details-apply"
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    Apply Now →
                </a>

            </div>
        </div>
    );
}

export default JobDetails;