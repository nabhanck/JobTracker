import companyLogo from "../assets/company.svg";
import locationLogo from "../assets/location.svg";
import seniorityLogo from "../assets/stats.svg";
import moneyLogo from "../assets/money.svg";
import { EditFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApplicationDetailsHook } from "../api/hooks/applicationsHook";

export const ViewNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: applicationData } = useGetApplicationDetailsHook(id);
  // console.log("applicationData", applicationData);
  return (
    <div className="w-full h-screen overflow-auto custom-scroll">
      <div className="flex justify-between px-10 pt-5">
        <div>
          <h1 className="text-2xl font-bold">View Notes</h1>
          <h2 className="text-lg font-medium">
            {applicationData?.data?.job_title}
          </h2>
          <div className="pt-1 flex gap-5 text-black/60">
            <div className="flex justify-center gap-2">
              <img src={companyLogo} className="w-5 h-5" />
              <p>{applicationData?.data?.company_name}</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={locationLogo} className="w-5 h-5" />
              <p>Mountain View, CA, USA</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={seniorityLogo} className="w-5 h-5" />
              <p>{applicationData?.data?.experience}</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={moneyLogo} className="w-5 h-5" />
              <p>
                {applicationData?.data?.currency}{" "}
                {applicationData?.data?.salary}
              </p>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-400 w-fit h-fit px-2 py-1 rounded-md text-white"
          onClick={() => navigate(`/create-note/${id}`)}
        >
          New Note +
        </button>
      </div>
      <div className="w-full min-h-[700px] space-y-10 pt-5 pb-10 pl-10 grid grid-cols-4">
        {applicationData?.data?.notes?.map((note) => (
          <div className="w-[20vw] h-[40vh] bg-[#FFE380] py-2 flex flex-col justify-between rounded-xl">
            <div className="max-h-[80%] overflow-y-scroll custom-scroll px-2">
              {note.text}
            </div>
            <div className="flex justify-between items-center px-2">
              <p className="text-xs text-black/60">
                {new Date(note.createdAt).toDateString()}
              </p>
              {/* <div className="w-7 h-7 bg-[#2E72D8] hover:bg-[#2e8ed8] rounded-full flex items-center justify-center text-white cursor-pointer">
                <EditFilled />
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
