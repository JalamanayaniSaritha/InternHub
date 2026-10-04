import { useState } from "react";
import axios from "axios";

function AddJob() {
    const [job, setJob] = useState({
        title: "",
        company: "",
        type: "",
        location: "",
        skills: "",
        description: "",
        salary: "",
        applyLink: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/jobs", {
                ...job,
                skills: job.skills
                    .split(",")
                    .map((skill) => skill.trim())
            });

            alert("Job posted successfully!");

            setJob({
                title: "",
                company: "",
                type: "",
                location: "",
                skills: "",
                description: "",
                salary: "",
                applyLink: ""
            });

        } catch (error) {
            console.error("Error posting job:", error);
            console.log("Server response:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed to post job"
            );
        }
    };

    return (
        <div>
            <h1>Post a Job / Internship</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="company"
                    placeholder="Company"
                    value={job.company}
                    onChange={handleChange}
                    required
                />

                <input
                    name="type"
                    placeholder="Job Type"
                    value={job.type}
                    onChange={handleChange}
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={job.location}
                    onChange={handleChange}
                    required
                />

                <input
                    name="skills"
                    placeholder="Skills (Python, React, MongoDB)"
                    value={job.skills}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={job.description}
                    onChange={handleChange}
                    required
                />

                <input
                    name="salary"
                    placeholder="Salary"
                    value={job.salary}
                    onChange={handleChange}
                />

                <input
                    name="applyLink"
                    placeholder="Application Link"
                    value={job.applyLink}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Post Job
                </button>
            </form>
        </div>
    );
}

export default AddJob;