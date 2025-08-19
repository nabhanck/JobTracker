const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  addApplication,
  updateApplication,
  deleteApplication,
  getAllApplications,
  graphAnalytics,
  applicationStats,
  applicationTimeline,
  stagnantApplications,
  graphAnalyticsByDate,
  applicationStatsByMonth,
  addCompanies,
  listCompanies,
  getApplicationDetails,
  createNewNote,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/application/all", authMiddleware, getAllApplications);
router.get("/applicationDetails/:id", authMiddleware, getApplicationDetails);
router.post("/application/add", authMiddleware, addApplication);
router.post("/application/note/add/:id", authMiddleware, createNewNote);
router.patch("/application/update", authMiddleware, updateApplication);
router.delete("/application/delete/:id", authMiddleware, deleteApplication);

router.get("/application/graphStats", authMiddleware, graphAnalytics);
router.get(
  "/application/graphStatsByDate",
  authMiddleware,
  graphAnalyticsByDate
);
router.get("/application/stats", authMiddleware, applicationStats);
router.get(
  "/application/statsByMonth",
  authMiddleware,
  applicationStatsByMonth
);
router.get("/application/timeline/:id", authMiddleware, applicationTimeline);
router.get("/application/stagnant", authMiddleware, stagnantApplications);

router.post("/addCompany", authMiddleware, addCompanies);
router.get("/listCompanies", authMiddleware, listCompanies);

module.exports = router;
