
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    default: "raw",
  },
  format: {
    type: String,
    default: "pdf",
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    reports: [reportSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);
