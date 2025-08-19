const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company_name: { type: String, required: true },
  company_logo: { type: String },
  companyIndustry: { type: String },
  job_title: { type: String, required: true },
  application_date: { type: Date },
  job_Location: { type: String },
  job_Description: { type: String },
  salary: { type: Number },
  currency: { type: String, default: "$" },
  experience: { type: String },
  link: { type: String },
  additional_benefits: [{ type: String }],
  notes: [
    {
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  resume: { type: String },
  application_status: {
    type: String,
    enum: ["applied", "interviewing", "offered", "rejected"],
    default: "applied",
  },
  status_history: [
    {
      status: {
        type: String,
        enum: [
          "applied",
          "follow-up call",
          "interviewing",
          "offer",
          "rejected",
        ],
        required: true,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  action: { type: String, enum: ["Follow up", "Interview", "Deadline"] },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
