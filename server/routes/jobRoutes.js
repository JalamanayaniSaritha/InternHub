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

module.exports = router;