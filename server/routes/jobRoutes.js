const express = require("express");
const Job = require("../models/job");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();

        res.status(201).json({
            message: "Job/Internship added successfully",
            job: savedJob
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job/Internship not found"
            });
        }

        res.json({
            message: "Job/Internship updated successfully",
            job: updatedJob
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job/Internship not found"
            });
        }

        res.json(job);

    } catch (error) {
        res.status(400).json({
            message: "Invalid job ID"
        });
    }
}); 

module.exports = router;