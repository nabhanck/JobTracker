const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("../models/Company");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const companies = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    industry: "Technology",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    industry: "E-commerce",
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Technology",
  },
  {
    name: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    industry: "Social Media",
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    industry: "Automotive",
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    industry: "Entertainment",
  },
  {
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    industry: "Music Streaming",
  },
  {
    name: "Samsung",
    logo: "https://logo.clearbit.com/samsung.com",
    industry: "Electronics",
  },
  {
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    industry: "Software",
  },
  {
    name: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
    industry: "Semiconductors",
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    industry: "Technology",
  },
  {
    name: "Oracle",
    logo: "https://logo.clearbit.com/oracle.com",
    industry: "Enterprise Software",
  },
  {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    industry: "CRM Software",
  },
  {
    name: "PayPal",
    logo: "https://logo.clearbit.com/paypal.com",
    industry: "Fintech",
  },
  {
    name: "Uber",
    logo: "https://logo.clearbit.com/uber.com",
    industry: "Transport",
  },
  {
    name: "Airbnb",
    logo: "https://logo.clearbit.com/airbnb.com",
    industry: "Hospitality",
  },
  {
    name: "Nvidia",
    logo: "https://logo.clearbit.com/nvidia.com",
    industry: "Semiconductors",
  },
  {
    name: "LinkedIn",
    logo: "https://logo.clearbit.com/linkedin.com",
    industry: "Professional Networking",
  },
  {
    name: "Zoom",
    logo: "https://logo.clearbit.com/zoom.us",
    industry: "Video Communications",
  },
];

const seedCompanies = async () => {
  try {
    await Company.insertMany(companies);
    console.log("Companies inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error inserting companies", error);
    process.exit(1);
  }
};

seedCompanies();
