const express = require("express");
const router = express.Router();

const {
  getAllResume,
  deleteResume,
  createResume,
  updateResume,
} = require("../controllers/resumes.controllers");

// GET all the resume
router.get("/", getAllResume);

// POST new resume
router.post("/create", createResume);

// DELETE a resume with their id
router.delete("/:id", deleteResume);

// UPDATE a resume with their id
router.put("/:id", updateResume);

module.exports = router;
