import { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/jobs")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []);

    const filteredJobs = jobs.filter((job) =>
        `${job.title} ${job.company} ${job.location} ${job.skills.join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="jobs-page">

            <header className="hero-section">
                <div className="navbar">
                    <h2>💼 InternHub</h2>
                    <span>Jobs & Internships</span>
                </div>

                <div className="hero-content">
                    <h1>Find Your Next Opportunity 🚀</h1>
                    <p>
                        Discover jobs and internships that match your skills.
                    </p>

                    <input
                        type="text"
                        placeholder="🔍 Search by job, company, skill..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <main className="jobs-section">

                <div className="section-title">
                    <h2>Latest Opportunities</h2>
                    <span>{filteredJobs.length} opportunities</span>
                </div>

                <div className="jobs-container">

                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div className="job-card" key={job._id}>

                                <div className="job-top">
                                    <div className="company-logo">
                                        {job.company.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="job-type">
                                        {job.type}
                                    </span>
                                </div>

                                <h3>{job.title}</h3>

                                <p className="company-name">
                                    🏢 {job.company}
                                </p>

                                <div className="job-details">
                                    <span>📍 {job.location}</span>
                                    <span>💰 {job.salary || "Not specified"}</span>
                                </div>

                                <p className="description">
                                    {job.description}
                                </p>

                                <div className="skills">
                                    {job.skills.map((skill, index) => (
                                        <span className="skill" key={index}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    className="apply-btn"
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Apply Now →
                                </a>

                            </div>
                        ))
                    ) : (
                        <div className="no-jobs">
                            <h3>😕 No opportunities found</h3>
                            <p>Try searching for another job or skill.</p>
                        </div>
                    )}

                </div>
            </main>

        </div>
    );
}

export default Jobs;