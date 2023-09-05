const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");

const SELECT_ALL_RESUME_QUERY = "SELECT * FROM RESUME";

// GET all the resumes
const getAllResume = async (req, res) => {
  try {
    const [resumes] = await db.query(SELECT_ALL_RESUME_QUERY);

    if (resumes.length <= 0)
      res.status(404).json({ message: "No resumes found!" });
    else res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again leter." });
  }
};

// POST or create new resume
const createResume = async (req, res) => {
  try {
    const uuid = uuidv4();
    const USER_DATA = req.body;

    // Validate request data
    if (!USER_DATA) {
      return res
        .status(400)
        .json({ error: "Invalid request. Resume data is required." });
    }

    const INSERT_QUERY = "INSERT INTO RESUME (id,USER_DATA) VALUES (?,?)";

    await db.query(INSERT_QUERY, [uuid, JSON.stringify(USER_DATA)]);
    res.status(201).json({ message: "Resume added successfully", id: uuid });
  } catch (error) {
    console.error("Error adding Resume:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
};

// DELETE a resume with their id
const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;

    const DELETE_QUERY = "DELETE FROM RESUME WHERE id = ?";
    const [{ affectedRows }] = await db.query(DELETE_QUERY, [resumeId]);

    if (affectedRows === 0)
      return res
        .status(404)
        .json({ error: `Resume not found with id '${resumeId}'` });

    const [resumes] = await db.query(SELECT_ALL_RESUME_QUERY);

    const responseMessage =
      resumes.length > 0
        ? "Resume deleted successfully"
        : "Resume deleted successfully, no resumes left";

    return res.status(200).json({
      message: responseMessage,
      data: resumes,
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Failed to delete the resume" });
  }
};

// PUT or update a resume with their id
const updateResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const updatedResume = req.body;

    const UPDATE_QUERY = "UPDATE RESUME SET ? WHERE id = ?";
    const SELECT_ALL_QUERY = "SELECT * FROM RESUME WHERE id = ?";

    // Update the resume
    const [{ affectedRows }] = await db.query(UPDATE_QUERY, [
      updatedResume,
      resumeId,
    ]);

    if (affectedRows > 0) {
      // Retrieve the updated resume
      const [updatedData] = await db.query(SELECT_ALL_QUERY, [resumeId]);

      return res.status(200).json({
        message: "Resume updated successfully",
        data: updatedData,
      });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to update the resume. Please try again." });
    }
  } catch (error) {
    console.error("Error updating resume:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
};

module.exports = {
  getAllResume,
  createResume,
  deleteResume,
  updateResume,
};
