import {
  ArrowRightOutlined,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import PaperBg from "../assets/Rectangle.png";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApplicationDetailsHook } from "../api/hooks/applicationsHook";

export const ViewApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: applicationDetails } = useGetApplicationDetailsHook(id);
  console.log("applicationDetails", applicationDetails);
  return (
    <div className="w-full h-screen overflow-auto pt-[20px] pb-[50px] flex flex-col items-center">
      <div className="w-[900px] flex justify-start">
        <h1 className="text-2xl font-bold pb-[20px]">View Application</h1>
      </div>
      <div
        className="w-[900px] border-1 border-gray-300 shadow-2xl shadow-black pt-2 h-[1200px] px-5 bg-center"
        // style={{ backgroundImage: `url(${PaperBg})` }}
      >
        <div className="flex justify-end">
          <EditOutlined
            className="text-xl !text-gray-500 hover:!text-gray-800 cursor-pointer"
            onClick={() => navigate(`/edit-application/${id}`)}
          />
        </div>
        {/* Section 1 */}
        <div className="w-full h-[100px] flex">
          <div className="h-full w-[12%] flex">
            <img
              className="w-25 h-25 rounded-full bg-white object-contain"
              src={applicationDetails?.data?.company_logo}
            />
          </div>
          <div className="h-full w-[72%] flex flex-col justify-center gap-1 pl-2">
            <h1 className="text-3xl font-semibold">
              {applicationDetails?.data?.company_name}
            </h1>
            <h1 className="text-sm font-medium text-black/60">
              {applicationDetails?.data?.industry}
            </h1>
            <a
              className="text-xs line-clamp-1"
              href={applicationDetails?.data?.link}
            >
              {applicationDetails?.data?.link}
            </a>
          </div>
          <div className="h-full w-[16%] flex flex-col items-end pt-4 gap-1">
            {applicationDetails?.data?.application_status === "applied" ? (
              <div className="w-fit h-fit text-white text-xs bg-[#0068FF] px-2 py-1 rounded-xl">
                Applied
              </div>
            ) : applicationDetails?.data?.application_status ===
              "interviewing" ? (
              <div className="w-fit h-fit text-white text-xs bg-[#FF7714] px-2 py-1 rounded-xl">
                Interviewing
              </div>
            ) : applicationDetails?.data?.application_status === "offer" ? (
              <div className="w-fit h-fit text-white text-xs bg-green-500 px-2 py-1 rounded-xl">
                Offered
              </div>
            ) : (
              <div className="w-fit h-fit text-white text-xs bg-red-500 px-2 py-1 rounded-xl">
                Rejected
              </div>
            )}

            <p>
              {new Date(
                applicationDetails?.data?.application_date
              ).toDateString()}
            </p>
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex flex-col py-5 gap-5">
          <div>
            <p className="text-base text-black/60">Title</p>
            <h1 className="text-xl font-medium">
              {applicationDetails?.data?.job_title}
            </h1>
          </div>
          <div>
            <p className="text-base text-black/60">Experience</p>
            <h1 className="text-xl font-medium">
              {applicationDetails?.data?.experience}
            </h1>
          </div>
          <div>
            <p className="text-base text-black/60">Job type</p>
            <h1 className="text-xl font-medium">On-Site</h1>
          </div>
          {/* <div>
            <p className="text-base text-black/60">Job type</p>
            <h1 className="text-xl font-medium">On-Site</h1>
          </div> */}
          <div>
            <p className="text-base text-black/60">Location</p>
            <h1 className="text-xl font-medium">
              {applicationDetails?.data?.job_Location}
            </h1>
          </div>
          <div>
            <p className="text-base text-black/60">Salary</p>
            <h1 className="text-xl font-medium">
              {applicationDetails?.data?.currency}{" "}
              {applicationDetails?.data?.salary}
            </h1>
          </div>
        </div>
        {/* Section 3 */}
        <div className="flex flex-col py-5 gap-5">
          <div>
            <p className="text-base text-black/60">Additional Benefits</p>
            <ol className="text-lg font-medium space-y-2 pl-6 list-disc max-h-[210px] overflow-auto custom-scroll">
              {applicationDetails?.data?.additional_benefits?.map((item) => (
                <li>{item}</li>
              ))}
              {/* <li>Medical Insurance</li>
              <li>Paid Sick Leave</li>
              <li>Life Insurance</li>
              <li>Flexible Work Hours</li>
              <li>Remote Work Option</li>
              <li>Hybrid Work Schedule</li>
              <li>Internal Training Programs</li> */}
            </ol>
          </div>
          <div>
            <p className="text-base text-black/60">Description</p>
            <h1 className="text-lg font-medium max-h-[200px] overflow-auto">
              {applicationDetails?.data?.job_Description}
            </h1>
          </div>
        </div>
        {/* Section 4 */}
        <div className="mb-20 overflow-y-scroll custom-scroll">
          <p className="text-base text-black/60">Notes</p>
          <div className="flex relative overflow-hidden gap-2">
            {applicationDetails?.data?.notes.length > 0 ? (
              <>
                {applicationDetails?.data?.notes?.map((note) => (
                  <div className="w-[25%] h-[180px] bg-[#FFE380] px-1 py-1 flex flex-col justify-between rounded-xl">
                    <div className="max-h-[60%] overflow-hidden line-clamp-5">
                      {note.text}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-black/60">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                      {/* <div className="w-7 h-7 bg-[#2E72D8] hover:bg-[#2e8ed8] rounded-full flex items-center justify-center text-white cursor-pointer">
                        <EditFilled />
                      </div> */}
                    </div>
                  </div>
                ))}
                {applicationDetails?.data?.notes?.length > 4 && (
                  <div className="absolute right-0 text-white/50 bg-black/10 h-full w-[5%] flex flex-col items-center justify-center cursor-pointer hover:bg-black/80 hover:text-white">
                    more <ArrowRightOutlined />
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-[180px] text-[50px] text-gray-300 font-bold flex items-center justify-center">
                No Notes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
