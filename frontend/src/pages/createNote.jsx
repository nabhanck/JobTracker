import companyLogo from "../assets/company.svg";
import locationLogo from "../assets/location.svg";
import seniorityLogo from "../assets/stats.svg";
import moneyLogo from "../assets/money.svg";
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetApplicationDetailsHook,
  useUpdateApplicationHook,
} from "../api/hooks/applicationsHook";
import { message } from "antd";
import { useCreateNewNoteHook } from "../api/hooks/notesHook";

export const CreateNote = () => {
  const { id } = useParams();
  // console.log("thissId", id);
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState("");
  const { data: applicationDetails } = useGetApplicationDetailsHook(id);
  console.log("text", applicationDetails);

  const [messageAPi, buttonContext] = message.useMessage();

  const { mutate: createNote } = useCreateNewNoteHook({
    onSuccess: () => {
      messageAPi.open({
        type: "success",
        content: "Note added successfully",
      });
      setTimeout(() => navigate(`/view-notes/${id}`), 1000);
    },
    onError: () => {
      messageAPi.open({
        type: "error",
        content: "Error creating note",
      });
    },
  });

  const handleCreateNote = () => {
    // const data = {
    //   // applicationId: id,
    //   text: noteContent,
    // };
    createNote({ id, text: noteContent });
  };
  return (
    <>
      {buttonContext}
      <div className="w-fit h-screen overflow-auto custom-scroll">
        <div className="px-10 pt-5">
          <h1 className="text-2xl font-bold py-2">Create Note</h1>
          <h2 className="text-lg font-medium">
            {applicationDetails?.data?.job_title}
          </h2>
          <div className="pt-1 flex gap-5 text-black/60">
            <div className="flex justify-center gap-2">
              <img src={companyLogo} className="w-5 h-5" />
              <p>{applicationDetails?.data?.company_name}</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={locationLogo} className="w-5 h-5" />
              <p>{applicationDetails?.data?.job_Location}</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={seniorityLogo} className="w-5 h-5" />
              <p>{applicationDetails?.data?.experience}</p>
            </div>
            <div className="flex justify-center gap-2">
              <img src={moneyLogo} className="w-5 h-5" />
              <p>
                {applicationDetails?.data?.currency}{" "}
                {applicationDetails?.data?.salary}
              </p>
            </div>
          </div>
          <div className="w-full pt-5 pb-10 ">
            <div className="w-[20vw] h-[18vw] bg-[#FFE380] px-2 py-2 flex flex-col justify-between rounded-xl">
              <textarea
                className="h-[200px] resize-none overflow-y-scroll custom-scroll px-2"
                placeholder="Enter here....."
                onChange={(e) => setNoteContent(e.target.value)}
              />
              {/* <div className="flex justify-between items-center px-2"> */}
              <p className="text-xs text-black/60">
                {new Date().toDateString()}
              </p>
              {/* </div> */}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="border-1 border-blue-400 text-blue-400 hover:text-white hover:bg-gray-300 hover:border-gray-300 px-5 py-1 rounded-xl"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className={`bg-blue-400 hover:bg-blue-300 px-5 py-1 rounded-xl text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
              disabled={noteContent.length < 1}
              onClick={handleCreateNote}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
