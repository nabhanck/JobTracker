const { default: mongoose } = require("mongoose");
const Application = require("../models/Job");
const customResponse = require("../utils/customResponse");
const { application } = require("express");
const Company = require("../models/Company");

const getAllApplications = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const userApplications = await Application.find({ user: userId }).lean();

    const groupedData = {
      applied: { count: 0, items: [] },
      interviewing: { count: 0, items: [] },
      offered: { count: 0, items: [] },
      rejected: { count: 0, items: [] },
    };

    userApplications.forEach((app) => {
      const simplified = {
        id: app._id,
        status: app.application_status,
        company_name: app.company_name,
        company_logo: app.company_logo,
        companyIndustry: app.companyIndustry,
        title: app.job_title,
        date: app.application_date?.toISOString().split("T")[0] || null,
        location: app.job_Location,
        description: app.job_Description,
        salary: app.salary || "",
        currency: app.currency,
        experience: app.experience,
      };

      const status = app.application_status;

      if (status === "applied") {
        groupedData.applied.items.push(simplified);
        groupedData.applied.count += 1;
      } else if (status === "interviewing") {
        groupedData.interviewing.items.push(simplified);
        groupedData.interviewing.count += 1;
      } else if (status === "offer") {
        groupedData.offered.items.push(simplified);
        groupedData.offered.count += 1;
      } else if (status === "rejected") {
        groupedData.rejected.items.push(simplified);
        groupedData.rejected.count += 1;
      }
    });

    return customResponse(
      res,
      200,
      "User Application Get Successfull",
      groupedData
    );
  } catch (error) {
    console.log("error getting Applications", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const getApplicationDetails = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    const applicationId = req.params.id;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const userApplications = await Application.findById(applicationId);
    if (!userApplications) {
      return customResponse(res, 404, "Application Not Found");
    }
    return customResponse(
      res,
      200,
      "User Application Get Successfull",
      userApplications
    );
  } catch (error) {
    console.log("error getting Applications", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const addApplication = async (req, res) => {
  try {
    const userEmail = req?.user?.userId;

    if (!userEmail) {
      return customResponse(res, 401, "Unauthorized");
    }

    const {
      company_name,
      company_logo,
      industry,
      job_title,
      application_date,
      job_Location,
      job_Description,
      salary,
      currency,
      experience,
      link,
      additional_benefits,
      notes,
      resume,
      application_status,
      action,
    } = req.body;

    const newApplication = await new Application({
      user: userEmail,
      company_name,
      company_logo,
      industry,
      job_title,
      application_date,
      job_Location,
      job_Description,
      salary,
      currency,
      experience,
      link,
      additional_benefits,
      notes,
      resume,
      application_status,
      status_history: [{ status: application_status || "applied" }],
      action,
    });

    await newApplication.save();

    return customResponse(res, 200, "New Job Application added Successfully");
  } catch (error) {
    console.log("error creating new Application", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const updateApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const userEmail = req?.user?.userId;

    if (!userEmail) {
      return customResponse(res, 401, "Unauthorized");
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return customResponse(res, 404, "Apllication not found");
    }

    if (application.user != userEmail) {
      return customResponse(res, 403, "Forbidden");
    }

    const {
      company_name,
      job_title,
      application_date,
      job_Location,
      salary,
      link,
      notes,
      resume,
      application_status,
      action,
    } = req.body;

    const updateFields = {
      company_name,
      job_title,
      application_date,
      job_Location,
      salary,
      link,
      notes,
      resume,
      application_status,
      action,
    };

    const updateQuery = { $set: updateFields };

    if (
      application_status &&
      application_status !== application.application_status
    ) {
      updateQuery.$push = {
        status_history: { status: application_status, changedAt: new Date() },
      };
    }
    const updateApplication = await Application.findByIdAndUpdate(
      applicationId,
      updateQuery,
      { new: true }
    );

    return customResponse(res, 200, "Application Updated Successfully");
  } catch (error) {
    console.log("error Updating Application", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userEmail = req?.user?.userId;
    if (!userEmail) {
      return customResponse(res, 401, "Unauthorized");
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return customResponse(res, 404, "Apllication not found");
    }

    if (application.user.toString() !== userEmail) {
      return customResponse(res, 403, "Forbidden");
    }

    const deleteApplication = await Application.findByIdAndDelete(
      applicationId
    );

    return customResponse(res, 200, "Application deleted successfully");
  } catch (error) {
    console.log("error Deleting Application", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const createNewNote = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    const applicationId = req.params.id;

    const { text } = req.body;

    if (!text) {
      return customResponse(res, 400, "Note text is required");
    }

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return customResponse(res, 404, "Application Not Found");
    }

    application.notes.push({ text });
    await application.save();

    return customResponse(res, 200, "Note added Successfully", application);
  } catch (error) {
    console.log("error adding Notes", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const graphAnalytics = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const userAnalytics = await Application.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // filter by current user
          application_date: { $ne: null }, // Ensure date exists
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$application_date" },
            month: { $month: "$application_date" },
          },
          applications: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1, // 1 → Ascending order (oldest to newest)
          "_id.month": 1,
        },
      },
      // Reshapes the output fields: Removes _id, Extracts year and month from _id, Keeps the count field, Final output:
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          applications: 1,
        },
      },
    ]);

    const fullAnalytics = Array.from({ length: 12 }, (_, i) => {
      const monthData = userAnalytics.find((item) => item.month === i + 1);
      return {
        year: new Date().getFullYear(), // or set it dynamically if needed
        month: i + 1,
        applications: monthData ? monthData.applications : 0,
      };
    });

    const formattedData = fullAnalytics.map((item) => ({
      ...item,
      month: monthNames[item.month - 1],
    }));

    return customResponse(
      res,
      200,
      "User Graph Analytics Get Successfull",
      formattedData
    );
  } catch (error) {
    console.log("error getting Graph Analytics", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const graphAnalyticsByDate = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const { start_Date, end_Date } = req.body;

    const startDate = new Date(start_Date);
    const endDate = new Date(end_Date);

    if (new Date(startDate) > new Date(endDate)) {
      return customResponse(res, 400, "Start date must be before end date");
    }

    const userAnalytics = await Application.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // filter by current user
          application_date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$application_date" },
            month: { $month: "$application_date" },
            day: { $dayOfMonth: "$application_date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1, // 1 → Ascending order (oldest to newest)
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      // Reshapes the output fields: Removes _id, Extracts year and month from _id, Keeps the count field, Final output:
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          count: 1,
        },
      },
    ]);

    return customResponse(
      res,
      200,
      "User Graph Analytics Get Successfull",
      userAnalytics
    );
  } catch (error) {
    console.log("error getting Graph Analytics", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const applicationStats = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const latestStatusChanges = await Application.aggregate([
      { $project: { latestChangedAt: { $max: "$status_history.changedAt" } } },
      {
        $match: {
          latestChangedAt: {
            $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
      { $count: "stagnantApplications" },
    ]);

    const stagnantCount = latestStatusChanges[0]?.stagnantApplications || 0;

    const [applied, interviewing, offer, rejected, total] = await Promise.all([
      Application.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        application_status: "applied",
      }),
      Application.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        application_status: "interviewing",
      }),
      Application.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        application_status: "offer",
      }),
      Application.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
        application_status: "rejected",
      }),
      Application.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
      }),
    ]);

    const success_rate = Math.round((offer / total) * 100);
    const failure_rate = Math.round((rejected / total) * 100);
    const stagnant_rate = Math.round((stagnantCount / total) * 100);

    const pieData = [
      {
        name: "Success Rate",
        value: success_rate,
        color: "#00C49F",
      },
      {
        name: "Failure Rate",
        value: failure_rate,
        color: "#FF4128",
      },
      {
        name: "Stagnant Rate",
        value: stagnant_rate,
        color: "#FFBB28",
      },
    ];

    const barData = [
      { name: "Applied", value: applied, max: total, color: "#0068FF" },
      {
        name: "Interviewing",
        value: interviewing,
        max: total,
        color: "#FF7714",
      },
      { name: "Offered", value: offer, max: total, color: "#05FFBE" },
      { name: "Rejected", value: rejected, max: total, color: "#FF0509" },
    ];

    return customResponse(
      res,
      200,
      "User Application Statsss Get Successfull",
      {
        applied,
        interviewing,
        offer,
        rejected,
        total,
        pieData,
        barData,
        success_rate,
        failure_rate,
        stagnant_rate,
      }
    );
  } catch (error) {
    console.log("error getting Application Stats", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const applicationStatsByMonth = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const stats = await Application.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$application_date" },
            month: { $month: "$application_date" },
            status: "$application_status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          stats: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          stats: 1,
          total: 1,
          success_rate: {
            $let: {
              vars: {
                offer: {
                  $first: {
                    $filter: {
                      input: "$stats",
                      as: "s",
                      cond: { $eq: ["$$s.status", "offer"] },
                    },
                  },
                },
              },
              in: {
                $cond: [
                  { $gt: ["$total", 0] },
                  {
                    $divide: [{ $ifNull: ["$$offer.count", 0] }, "$total"],
                  },
                  0,
                ],
              },
            },
          },
          failure_rate: {
            $let: {
              vars: {
                rejected: {
                  $first: {
                    $filter: {
                      input: "$stats",
                      as: "s",
                      cond: { $eq: ["$$s.status", "rejected"] },
                    },
                  },
                },
              },
              in: {
                $cond: [
                  { $gt: ["$total", 0] },
                  {
                    $divide: [{ $ifNull: ["$$rejected.count", 0] }, "$total"],
                  },
                  0,
                ],
              },
            },
          },
        },
      },
      {
        $sort: { year: 1, month: 1 },
      },
    ]);

    return customResponse(res, 200, "User Application Stats Get Successfull", {
      stats,
    });
  } catch (error) {
    console.log("error getting Application Stats", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const stagnantApplications = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 401, "Unauthorized");
    }

    const applications = await Application.find({ user: userId }).lean();

    const stagnantThreshold = new Date();
    stagnantThreshold.setDate(stagnantThreshold.getDate() - 30); // 30 days ago

    const stagnantApplications = applications.filter((app) => {
      const statusHistory = app.status_history || [];

      if (statusHistory.length === 0) {
        console.log(`App ${app._id} has no status history => stagnant`);
        return true; // Consider it stagnant if no history
      }

      // Find the most recent status change
      const latestChange = statusHistory.reduce((latest, entry) => {
        return new Date(entry.changedAt) > new Date(latest.changedAt)
          ? entry
          : latest;
      });

      const lastChangedAt = new Date(latestChange.changedAt);
      const isStagnant = lastChangedAt < stagnantThreshold;

      console.log(
        `App ${
          app._id
        } | Last Changed: ${lastChangedAt.toISOString()} | Stagnant: ${isStagnant}`
      );

      return isStagnant;
    });

    return customResponse(
      res,
      200,
      "Stagnant applications fetched successfully",
      stagnantApplications
    );
  } catch (error) {
    console.error("Error fetching stagnant applications:", error);
    return customResponse(res, 500, "Internal Server Error", error.message);
  }
};

const applicationTimeline = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 404, "No User Found");
    }

    const applicationId = req.params.id;

    const application = await Application.findById(applicationId).lean();

    if (!application) {
      return customResponse(res, 404, "Apllication not found");
    }

    if (application.user != userId) {
      return customResponse(res, 403, "Forbidden");
    }

    const statusHistory = application.status_history || [];
    const notes = application.notes || [];

    const timeline = statusHistory
      .sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt))
      .map((statusEntry) => {
        const sameDayNotes = notes.filter((note) => {
          const noteDate = new Date(note.createdAt).toDateString();
          const statusDate = new Date(statusEntry.changedAt).toString();
          return noteDate == statusDate;
        });
        return {
          status: statusEntry.status,
          changedAt: statusEntry.changedAt,
          notes: sameDayNotes.map((note) => note.text),
        };
      });

    return customResponse(
      res,
      200,
      "User Application Timeline Get Successfull",
      {
        application,
        timeline,
      }
    );
  } catch (error) {
    console.log("error getting Application Timeline", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const addCompanies = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 401, "Unauthorized");
    }

    const { name, logo, industry } = req.body;

    const newApplication = await new Company({
      name,
      logo,
      industry,
    });

    await newApplication.save();

    return customResponse(res, 200, "New Companies added Successfully");
  } catch (error) {
    console.log("error adding new Company", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

const listCompanies = async (req, res) => {
  try {
    const userId = req?.user?.userId;

    if (!userId) {
      return customResponse(res, 401, "Unauthorized");
    }

    const companies = await Company.find();

    return customResponse(res, 200, "Companies Listed Successfully", companies);
  } catch (error) {
    console.log("error adding new Company", error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

module.exports = {
  getAllApplications,
  getApplicationDetails,
  addApplication,
  updateApplication,
  deleteApplication,
  createNewNote,
  graphAnalytics,
  graphAnalyticsByDate,
  applicationStatsByMonth,
  applicationStats,
  applicationTimeline,
  stagnantApplications,
  addCompanies,
  listCompanies,
};
