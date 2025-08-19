import {
  ArrowRightOutlined,
  ClockCircleFilled,
  CopyFilled,
  DeleteFilled,
  EditFilled,
  EyeFilled,
  EyeTwoTone,
  FileAddFilled,
  MoreOutlined,
  RestFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, message, notification, Popover, Select } from "antd";
import {
  useDeleteApplicationHook,
  useGetAllApplicationsHook,
  useUpdateApplicationHook,
} from "../../api/hooks/applicationsHook";
import { useEffect, useState } from "react";
import companyLogo from "../../assets/company.svg";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size";
import ReactConfetti from "react-confetti";
import { RejectionMessages } from "./rejectionMessages";

export const KanbanBoard = ({ showDrawer }) => {
  const navigate = useNavigate();
  const [api, buttonContext] = notification.useNotification();
  // For success and error
  const [messageApi, contextHolder] = message.useMessage();
  const [finalBoard, setFinalBoard] = useState("1");
  // console.log("finall", finalBoard);
  const [refreshAPI, setRefreshAPI] = useState(false);

  const [appliedSearch, setAppliedSearch] = useState("");
  const [interviewingSearch, setInterviewingSearch] = useState("");
  const [offeredSearch, setOfferedSearch] = useState("");
  const [rejectedSearch, setRejectedSearch] = useState("");

  const { data: allApplicationsData, refetch } =
    useGetAllApplicationsHook(refreshAPI);

  const { mutate: deleteApplication } = useDeleteApplicationHook({
    onSuccess: (data) => {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
      setTimeout(() => window.location.reload(), 1000);
    },
    onError: (data) => {
      messageApi.open({
        type: "error",
        content: data?.message,
      });
    },
  });

  useEffect(() => {
    if (refreshAPI) {
      refetch().then(() => setRefreshAPI(false));
    }
  }, [refreshAPI]);

  const randomMessage =
    RejectionMessages[Math.floor(Math.random() * RejectionMessages.length)];

  const { mutate: updateApplication } = useUpdateApplicationHook({
    onSuccess: (data, variables) => {
      console.log("resss", variables);
      if (variables.application_status === "offer") {
        setShow(true);
        setTimeout(() => setShow(false), 8000);
      }
      if (variables.application_status === "rejected") {
        api.open({
          message: "Keep your chin up ! 😊",
          description: randomMessage,
          showProgress: true,
          pauseOnHover: true,
        });
      }
      messageApi.open({
        type: "success",
        content: "Application Status Updated Successfully",
      });
      setRefreshAPI(true);
      // setTimeout(() => window.location.reload(), 1000);
    },
  });

  const handleApplicationDelete = (id) => {
    deleteApplication(id);
  };

  const handleStatusUpdate = (status, id) => {
    // console.log("thiss", status);
    const data = {
      applicationId: id,
      application_status: status.toLowerCase(),
    };
    updateApplication(data);
  };

  const allStatuses = ["Applied", "Interviewing", "Offer", "Rejected"];

  const getMoveToContent = (currentStatus, currentId) => {
    return (
      <div className="cursor-pointer">
        {allStatuses
          .filter((status) => status.toLowerCase() !== currentStatus)
          .map((status) => (
            <div>
              <p onClick={() => handleStatusUpdate(status, currentId)}>
                {status}
              </p>
            </div>
          ))}
      </div>
    );
  };
  const getPopoverContent = (status, appId) => {
    return (
      <div className="cursor-pointer">
        <Popover
          trigger={"click"}
          content={getMoveToContent(status, appId)}
          placement="rightTop"
        >
          <div className="flex justify-between py-2">
            <p>Move To</p>
            <ArrowRightOutlined
              className={`${status === "applied" && "!text-[#4E84D2]"} ${
                status === "interviewing" && "!text-[#FF7714]"
              } ${status === "offer" && "!text-green-500"}`}
            />
          </div>
        </Popover>
        <div
          className="flex justify-between py-2"
          onClick={() => navigate(`/view-application/${appId}`)}
        >
          <p>View Application</p>
          <EyeFilled
            className={`${status === "applied" && "!text-[#4E84D2]"} ${
              status === "interviewing" && "!text-[#FF7714]"
            } ${status === "offer" && "!text-green-500"}`}
          />
        </div>
        <div
          className="flex justify-between py-2"
          onClick={() => navigate(`/edit-application/${appId}`)}
        >
          <p>Edit Application</p>
          <EditFilled
            className={`${status === "applied" && "!text-[#4E84D2]"} ${
              status === "interviewing" && "!text-[#FF7714]"
            } ${status === "offer" && "!text-green-500"}`}
          />
        </div>
        <div
          className="flex justify-between py-2"
          onClick={() => navigate(`/view-notes/${appId}`)}
        >
          <p>View Notes</p>
          <CopyFilled
            className={`${status === "applied" && "!text-[#4E84D2]"} ${
              status === "interviewing" && "!text-[#FF7714]"
            } ${status === "offer" && "!text-green-500"}`}
          />
        </div>
        <div
          className="flex justify-between py-2"
          onClick={() => navigate(`/create-note/${appId}`)}
        >
          <p>Create Note</p>
          <FileAddFilled
            className={`${status === "applied" && "!text-[#4E84D2]"} ${
              status === "interviewing" && "!text-[#FF7714]"
            } ${status === "offer" && "!text-green-500"}`}
          />
        </div>
        <div
          className="flex justify-between py-2"
          onClick={() => showDrawer(appId)}
        >
          <p>View Timeline</p>
          <ClockCircleFilled
            className={`${status === "applied" && "!text-[#4E84D2]"} ${
              status === "interviewing" && "!text-[#FF7714]"
            } ${status === "offer" && "!text-green-500"}`}
          />
        </div>
        <div
          className="flex justify-between py-2"
          onClick={() => handleApplicationDelete(appId)}
        >
          <p>Delete Application</p>
          <DeleteFilled className={`!text-red-500`} />
        </div>
      </div>
    );
  };

  const [show, setShow] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    setTimeout(() => setShow(false), 8000);
  }, []);

  // Search Filters

  const appliedFilter = allApplicationsData?.data?.applied?.items.filter(
    (item) => {
      const query = appliedSearch.toLowerCase();
      return (
        item?.company_name?.toLowerCase().includes(query) ||
        item?.title?.toLowerCase().includes(query) ||
        item?.location?.toLowerCase().includes(query)
      );
    }
  );

  const interviewFilter = allApplicationsData?.data?.interviewing?.items.filter(
    (item) => {
      const query = interviewingSearch.toLowerCase();
      return (
        item.company_name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }
  );

  const lastFilter =
    finalBoard === "1"
      ? allApplicationsData?.data?.offered?.items.filter((item) => {
          const query = offeredSearch.toLowerCase();
          return (
            item.company_name.toLowerCase().includes(query) ||
            item.title.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
          );
        })
      : allApplicationsData?.data?.rejected?.items.filter((item) => {
          const query = rejectedSearch.toLowerCase();
          return (
            item.company_name.toLowerCase().includes(query) ||
            item.title.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
          );
        });

  return (
    <>
      {buttonContext}
      {contextHolder}
      {show && <ReactConfetti width={width} height={height} />}
      <div className="w-full h-[650px] flex gap-10 mt-10">
        {/* Applied */}
        <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
          <div className=" h-[15%] flex flex-col pt-2 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-lg">Applied Applications</h1>
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <p className="text-base font-semibold text-[#4E84D2]">
                {allApplicationsData?.data?.applied?.count}
              </p>
            </div>
            <Input
              className="px-1 h-9 !rounded-2xl"
              placeholder="search"
              prefix={<SearchOutlined />}
              value={appliedSearch}
              onChange={(e) => setAppliedSearch(e.target.value)}
            />
          </div>
          <div className="w-full h-[90%] space-y-5 overflow-auto kanban-scroll">
            {/* Applied Card */}
            {appliedFilter?.map((item, index) => (
              <div
                className="w-full bg-[#C6DDFF] flex border-2 border-[#0068FF] rounded-[20px]"
                onDoubleClick={() => showDrawer(item.id)}
                key={index}
              >
                <div className=" w-[95%] h-full flex justify-between px-4 py-2">
                  <div>
                    <h1 className="font-semibold text-lg">
                      {item.company_name}
                    </h1>
                    <div className="text-base text-black/80">
                      <p>💼 {item.title}</p>
                      <p>🌟 {item.experience} level Experience</p>
                      <p>🕐 {item.date}</p>
                      <p>
                        💵 {item.currency} {item.salary}
                      </p>
                      <p>📍 {item.location}</p>
                    </div>
                  </div>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item?.company_logo ? item?.company_logo : companyLogo}
                  />
                </div>
                <div className=" flex items-start py-3 pr-1">
                  <Popover
                    trigger={"click"}
                    content={getPopoverContent(item.status, item.id)}
                    placement="bottomLeft"
                  >
                    <MoreOutlined className=" text-xl" />
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Interviewing */}
        <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
          <div className=" h-[15%] flex flex-col pt-2 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-lg">Interviewing Applications</h1>
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <p className="text-base font-semibold text-[#FF7714]">
                {allApplicationsData?.data?.interviewing?.count}
              </p>
            </div>
            <Input
              className="px-1 h-9 !rounded-2xl"
              placeholder="search"
              prefix={<SearchOutlined />}
              value={interviewingSearch}
              onChange={(e) => setInterviewingSearch(e.target.value)}
            />
          </div>
          <div className="w-full h-[90%] space-y-5 overflow-auto kanban-scroll">
            {/* Card */}
            {interviewFilter?.map((item, index) => (
              <div
                className="w-full bg-[#FFD5B5] flex border-2 border-[#FF7714] rounded-[20px] select-none"
                key={index}
                onDoubleClick={() => showDrawer(item.id)}
              >
                <div className=" w-[95%] h-full flex justify-between px-4 py-2">
                  <div>
                    <h1 className="font-semibold text-lg">
                      {item.company_name}
                    </h1>
                    <div className="text-base text-black/80">
                      <p>💼{item.title}</p>
                      <p>🌟 {item.experience} level Experience</p>
                      <p>🕐{item.date}</p>
                      <p>📍{item.location}</p>
                      <p>💰{item.salary}</p>
                    </div>
                  </div>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item?.company_logo ? item?.company_logo : companyLogo}
                  />
                </div>
                <div className=" flex items-start py-3 pr-1">
                  <Popover
                    trigger={"click"}
                    content={getPopoverContent(item.status, item.id)}
                    placement="bottomLeft"
                  >
                    <MoreOutlined className=" text-xl" />
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Offered & Rejected */}
        <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
          <div className=" h-[15%] flex flex-col pt-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg flex gap-2">
                <Select
                  className="w-[110px]"
                  // defaultValue={"1"}
                  value={finalBoard}
                  onChange={(value) => setFinalBoard(value)}
                >
                  <option value={"1"}>Offered</option>
                  <option value={"2"}>Rejected</option>
                </Select>
                Applications
              </div>
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <p
                className={`text-base font-semibold ${
                  finalBoard === "1" ? "text-green-400" : "text-red-400"
                }`}
              >
                {finalBoard === "1"
                  ? allApplicationsData?.data?.offered?.count
                  : allApplicationsData?.data?.rejected?.count}
              </p>
            </div>
            {finalBoard === "1" && (
              <Input
                className="px-1 h-9 !rounded-2xl"
                placeholder="search"
                prefix={<SearchOutlined />}
                value={offeredSearch}
                onChange={(e) => setOfferedSearch(e.target.value)}
              />
            )}
            {finalBoard === "2" && (
              <Input
                className="px-1 h-9 !rounded-2xl"
                placeholder="search"
                prefix={<SearchOutlined />}
                value={rejectedSearch}
                onChange={(e) => setRejectedSearch(e.target.value)}
              />
            )}
          </div>
          {finalBoard === "1" && (
            <div className="w-full h-[90%] space-y-5 overflow-auto kanban-scroll">
              {/* Card */}
              {lastFilter?.map((item, index) => (
                <div
                  className="w-full bg-[#BEFFEE] flex border-2 border-[#05FFBE] rounded-[20px] select-none"
                  key={index}
                  onDoubleClick={() => showDrawer(item.id)}
                >
                  <div className=" w-[95%] h-full flex justify-between px-4 py-2">
                    <div>
                      <h1 className="font-semibold text-lg">
                        {item.company_name}
                      </h1>
                      <div className="text-base text-black/80">
                        <p>💼{item.title}</p>
                        <p>🌟 {item.experience} level Experience</p>
                        <p>🕐{item.date}</p>
                        <p>📍{item.location}</p>
                        <p>💰{item.salary}</p>
                      </div>
                    </div>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        item?.company_logo ? item?.company_logo : companyLogo
                      }
                    />
                  </div>
                  <div className=" flex items-start py-3 pr-1">
                    <Popover
                      trigger={"click"}
                      content={getPopoverContent(item.status, item.id)}
                      placement="bottomLeft"
                    >
                      <MoreOutlined className=" text-xl" />
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          )}
          {finalBoard === "2" && (
            <div className="w-full h-[90%] space-y-5 overflow-auto">
              {/* Card */}
              {lastFilter?.map((item, index) => (
                <div
                  className="w-full bg-red-200 flex border-2 border-red-400 rounded-[20px] select-none"
                  key={index}
                  onDoubleClick={() => showDrawer(item.id)}
                >
                  <div className=" w-[95%] h-full flex justify-between px-4 py-2">
                    <div>
                      <h1 className="font-semibold text-lg">
                        {item.company_name}
                      </h1>
                      <div className="text-base text-black/80">
                        <p>💼{item.title}</p>
                        <p>🌟 {item.experience} level Experience</p>
                        <p>🕐{item.date}</p>
                        <p>📍{item.location}</p>
                        <p>💰{item.salary}</p>
                      </div>
                    </div>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        item?.company_logo ? item?.company_logo : companyLogo
                      }
                    />
                  </div>
                  <div className=" flex items-start py-3 pr-1">
                    <Popover
                      trigger={"click"}
                      content={getPopoverContent(item.status, item.id)}
                      placement="bottomLeft"
                    >
                      <MoreOutlined className=" text-xl" />
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
