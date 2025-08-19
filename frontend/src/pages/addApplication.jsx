import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AutoComplete,
  Avatar,
  Button,
  Input,
  InputNumber,
  message,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useAddNewApplicationHook } from "../api/hooks/applicationsHook";
import { useListCompaniesHook } from "../api/hooks/companiesHook";
import companyLogo from "../assets/company.svg";
import { useNavigate } from "react-router-dom";

const options = [
  {
    label: "$",
    value: "$",
    desc: "USD", // United States Dollar
  },
  {
    label: "د.إ",
    value: "د.إ",
    desc: "AED", // United Arab Emirates Dirham
  },
  {
    label: "₹",
    value: "₹",
    desc: "INR", // Indian Rupee
  },
  {
    label: "﷼",
    value: "﷼",
    desc: "SAR", // Saudi Riyal
  },
  {
    label: "Rs",
    value: "Rs",
    desc: "LKR", // Sri Lankan Rupee
  },
  {
    label: "¥",
    value: "¥",
    desc: "JPY", // Japanese Yen
  },
  {
    label: "RM",
    value: "RM",
    desc: "MYR", // Malaysian Ringgit
  },
  {
    label: "Rp",
    value: "Rp",
    desc: "IDR", // Indonesian Rupiah
  },
];

const statusOptions = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offered", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

const experienceLevelsOptions = [
  { label: "Intern / Trainee", value: "intern" },
  { label: "Entry Level", value: "entry" },
  { label: "Junior / Associate", value: "junior" },
  { label: "Mid Level / Intermediate", value: "mid" },
  { label: "Senior Level", value: "senior" },
  { label: "Lead / Team Lead", value: "lead" },
  { label: "Manager / Supervisor", value: "manager" },
  { label: "Director", value: "director" },
  { label: "VP / Vice President", value: "vp" },
  { label: "C-Level (CTO, CEO, etc.)", value: "c_level" },
];

const jobTypesOptions = [
  { label: "On-site", value: "on_site" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Freelance / Contract", value: "freelance" },
  { label: "Internship", value: "internship" },
  { label: "Temporary", value: "temporary" },
  { label: "Volunteer", value: "volunteer" },
];

const additionalBenefitsOptions = [
  { label: "Health Insurance", value: "health_insurance" },
  { label: "Dental Insurance", value: "dental_insurance" },
  { label: "Vision Insurance", value: "vision_insurance" },
  { label: "Paid Time Off (PTO)", value: "paid_time_off" },
  { label: "Remote Work Allowance", value: "remote_work_allowance" },
  { label: "Flexible Hours", value: "flexible_hours" },
  { label: "Performance Bonus", value: "performance_bonus" },
  { label: "Retirement Benefits", value: "retirement_benefits" },
  { label: "Stock Options", value: "stock_options" },
  { label: "Learning & Development", value: "learning_development" },
  { label: "Gym Membership", value: "gym_membership" },
  { label: "Childcare Support", value: "childcare_support" },
  { label: "Free Meals", value: "free_meals" },
  { label: "Transport Allowance", value: "transport_allowance" },
  { label: "Company Laptop", value: "company_laptop" },
  { label: "Wellness Programs", value: "wellness_programs" },
];

export const AddNewApplication = () => {
  const navigate = useNavigate();
  const [messageApi, buttonContext] = message.useMessage();

  const [company_name, setCompanyName] = useState("");
  const [company_logo, setCompanyLogo] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [experience, setExperience] = useState("intern");
  const [jobType, setJobType] = useState("on_site");
  const [job_Location, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("$");
  const [application_status, setApplicationStatus] = useState("applied");
  const [additional_benefits, setAdditionalBenefits] = useState([]);
  const [link, setLink] = useState("");
  const [job_Description, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate: newApplication } = useAddNewApplicationHook({
    onSuccess: (response) => {
      // console.log("response", response);
      messageApi.open({
        type: "success",
        content: response?.message,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    },
    onError: (response) => {
      messageApi.open({
        type: "error",
        content: response?.message,
      });
    },
  });
  const { data: companiesList } = useListCompaniesHook();
  console.log("CompanyList", companiesList);

  const formSchema = yup.object().shape({
    company_name: yup.string().required("Company Name is required"),
    jobTitle: yup.string().required("Job Title is required"),
    status: yup.string().required("Application Status is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      company_name: "",
      jobTitle: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    const fullData = {
      application_date: new Date().toISOString(),
      company_name,
      company_logo,
      job_title,
      companyIndustry,
      job_Location,
      experience,
      jobType,
      salary,
      currency,
      application_status,
      additional_benefits,
      link,
      job_Description,
      notes: [{ text: notes }],
    };

    console.log("Full Form Data:", fullData);
    newApplication(fullData);
  };

  const handleCompany = (value, option) => {
    setCompanyName(value);
    if (option?.logo) {
      setCompanyLogo(option.logo);
    }
    // console.log("optioons2", option);
    if (option?.industry) {
      setCompanyIndustry(option?.industry);
    }
  };

  return (
    <>
      {buttonContext}
      <div className="h-full flex flex-col items-center pb-20 overflow-auto">
        <div className="w-3/4 flex flex-col">
          <h1 className="text-xl font-bold py-4">New Application</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white h-full flex flex-col gap-5 p-9 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center w-full">
              <div className="w-[10%]">
                {company_logo ? (
                  <img
                    className="w-12 h-12 rounded-full bg-white"
                    src={company_logo}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-1 flex items-center justify-center">
                    <img src={companyLogo} className="h-7 w-7" />
                  </div>
                )}
              </div>
              <div className="w-[90%] h-full flex flex-col justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-sm">Company Logo</p>
                  <p className="text-xs">
                    (paste company logo's image address below)
                  </p>
                </div>
                <Input
                  className="!w-full !h-[60%]"
                  value={company_logo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                />
              </div>
              <div></div>
            </div>
            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2 className="flex gap-1">
                  Company Name<p className="text-red-500">*</p>
                </h2>
                <Controller
                  name="company_name"
                  control={control}
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      placeholder="Type or select a company"
                      options={companiesList?.data?.map((company) => ({
                        value: company.name,
                        id: company._id,
                        industry: company.industry,
                        logo: company.logo,
                        label: (
                          <Space>
                            <Avatar size="small" src={company.logo} />
                            {company.name}
                          </Space>
                        ),
                      }))}
                      onChange={(value, option) => {
                        field.onChange(value); // Update form value
                        handleCompany(value, option); // Custom handler
                      }}
                      filterOption={(inputValue, option) =>
                        option?.value
                          ?.toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                    />
                  )}
                />

                {errors.company_name && (
                  <p className="text-xs text-red-500">
                    {errors.company_name.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Company Industry</h2>
                <Input
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2 className="flex gap-1">
                  Job Title<p className="text-red-500">*</p>
                </h2>
                <Controller
                  name="jobTitle"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Job Title"
                      onChange={(e) => {
                        field.onChange(e);
                        setJobTitle(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.jobTitle && (
                  <p className="text-xs text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Experience Level</h2>
                <Select
                  value={experience}
                  options={experienceLevelsOptions}
                  onChange={(value) => setExperience(value)}
                />
              </div>
            </div>

            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Job Type</h2>
                <Select
                  options={jobTypesOptions}
                  value={jobType}
                  onChange={(value) => setJobType(value)}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Job Location</h2>
                <Input onChange={(e) => setJobLocation(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Salary</h2>
                <div className="flex w-full gap-5">
                  <Select
                    className="!w-[25%]"
                    dropdownClassName="no-scrollbar"
                    placeholder="select one country"
                    // defaultValue={["$"]}
                    value={currency}
                    options={options}
                    onChange={(value) => setCurrency(value)}
                    optionRender={(option) => (
                      <Space className="no-scrollbar">
                        <span role="img" aria-label={option.data.label}>
                          {option.data.label}
                        </span>
                        <p className="text-sm">{option.data.desc}</p>
                      </Space>
                    )}
                  />
                  {/* <Input type="text" inputMode="numeric" pattern="[0-9]*" /> */}
                  <InputNumber
                    controls={false}
                    type="number"
                    className="!w-[75%]"
                    onChange={(value) => setSalary(value)}
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Application Status</h2>
                <Select
                  options={statusOptions}
                  value={application_status}
                  onChange={(value) => setApplicationStatus(value)}
                />
              </div>
            </div>

            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Additional Benefits</h2>
                <Select
                  mode="tags"
                  options={additionalBenefitsOptions}
                  onChange={(value) => setAdditionalBenefits(value)}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Link</h2>
                <Input onChange={(e) => setLink(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between gap-50">
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Job Description</h2>
                <TextArea
                  className="!h-[200px] !resize-none"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <h2>Note</h2>
                <TextArea
                  className="!h-[200px] !resize-none"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#2E72D8] w-fit px-3 py-1 text-white rounded-2xl hover:bg-[#2e83d8] cursor-pointer"
                onClick={() => onSubmit()}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
