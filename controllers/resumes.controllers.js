const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");

// GET all the resumes
const getAllResume = async (req, res) => {
  try {
    const query = "SELECT * FROM RESUME";
    const [resumes] = await db.query(query);

    if (resumes.length <= 0)
      res.status(404).json({ message: "No resume found!" });
    else res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST or create new resume
const createResume = async (req, res) => {
  try {
    const uuid = uuidv4();
    const USER_DATA = req.body;
    const query = "INSERT INTO RESUME (id,USER_DATA) VALUES (?,?)";

    await db.query(query, [uuid, JSON.stringify(USER_DATA)]);
    res.status(201).json({ message: "Resume added successfully" });
  } catch (error) {
    console.error("Error adding Resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a resume with their id
const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;

    const deleteQuery = "DELETE FROM RESUME WHERE id = ?";
    const [{ affectedRows }] = await db.query(deleteQuery, [resumeId]);

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ error: `Resume not found with id '${resumeId}'` });
    else res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT or update a resume with their id
const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const updatedResume = req.body;

    const updateQuery = "UPDATE RESUME SET ? WHERE id = ?";
    const [{ affectedRows }] = await db.query(updateQuery, [
      updatedResume,
      resumeId,
    ]);

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ error: `Resume not found with id '${resumeId}'` });
    else res.status(200).json({ message: "Resume updated successfully" });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllResume,
  createResume,
  deleteResume,
  updateResume,
};
