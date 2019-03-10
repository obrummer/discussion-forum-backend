const router = require("express").Router();
const db = require("../database/categoryQueries");

// ----- /api/categories route ----- //

// GET <get all categories>
router.get("/", async (req, res) => {
  try {
    let dbResponse = await db.getAllCategories();
    if (!dbResponse) {
      throw new Error("Category query failed.");
    }
    res.status(200).json({ success: true, message: dbResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
