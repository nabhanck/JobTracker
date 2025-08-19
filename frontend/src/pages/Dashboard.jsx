import { useEffect, useState } from "react";
import { FirstContainer } from "../components/dashboard/firstContainer";
import { KanbanBoard } from "../components/dashboard/kanbanBoard";
import { Drawer, Timeline } from "antd";
import companyLogo from "../assets/company.svg";
import locationLogo from "../assets/location.svg";
import seniorityLogo from "../assets/stats.svg";
import moneyLogo from "../assets/money.svg";
import {
  ClockCircleFilled,
  ClockCircleOutlined,
  ClockCircleTwoTone,
  EditFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { useGetTimeLineHook } from "../api/hooks/timelineHook";
import { RejectionMessages } from "../components/dashboard/rejectionMessages";

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [drawerId, setDrawerId] = useState("");
  // console.log("drawerId", drawerId);
  const showDrawer = (id) => {
    setDrawerId(id);
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const { data: drawerData } = useGetTimeLineHook(drawerId);
  // console.log("drawerData", drawerData);

  const randomMessage =
    RejectionMessages[Math.floor(Math.random() * RejectionMessages.length)];

  return (
    <>
      <div className="w-full h-full px-5 overflow-auto pb-10">
        <div className="flex flex-col">
          <h1 className="text-[30px] font-bold pt-5">Dashboard</h1>
          <div className="flex justify-between pb-5">
            <h2 className="">welcome back, nabhan@gmail.com</h2>
            <h2 className="">24 Thursday, 2025</h2>
          </div>
        </div>
        <FirstContainer />
        <KanbanBoard showDrawer={showDrawer} />
        <Drawer
          title={
            <span>
              Timeline <ClockCircleOutlined className="text-sm" />
            </span>
          }
          open={open}
          onClose={closeDrawer}
          maskClosable={true}
          maskStyle={{
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div>
            <h2 className="text-2xl font-bold pb-2">
              {drawerData?.data?.application?.job_title}
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              <div className="flex gap-2 items-center">
                <img src={companyLogo} className="w-4 h-4" />
                <p>{drawerData?.data?.application?.company_name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={locationLogo} className="w-4 h-4" />
                <p>{drawerData?.data?.application?.job_Location}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={seniorityLogo} className="w-4 h-4" />
                <p>{drawerData?.data?.application?.experience}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={moneyLogo} className="w-4 h-4" />
                <p>
                  {drawerData?.data?.application?.currency}{" "}
                  {drawerData?.data?.application?.salary}
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-8" />
            <Timeline
              items={drawerData?.data?.timeline.map((item) => ({
                color:
                  item.status === "applied"
                    ? "blue"
                    : item.status === "interviewing"
                    ? "orange"
                    : item.status === "offer"
                    ? "green"
                    : item.status === "rejected" && "red",
                children: (
                  <>
                    {item.status === "applied" && (
                      <p>
                        Applied on{" "}
                        {new Date(item?.changedAt).toLocaleDateString()}
                      </p>
                    )}
                    {item.status === "interviewing" && (
                      <p>
                        Interview in progress (
                        {new Date(item?.changedAt).toLocaleDateString()})
                      </p>
                    )}
                    {item.status === "offer" && <p>Job Offered 🎊</p>}
                    {item.status === "rejected" && (
                      <>
                        <p>
                          Rejected on{" "}
                          {new Date(item?.changedAt).toLocaleDateString()}
                        </p>
                        <div className="bg-gray-200 px-2 py-1 max-h-[90px] line-clamp-4 rounded-xl">
                          {/* <p className="text-xs">20-03-2025</p> */}⭐
                          {randomMessage}
                        </div>
                      </>
                    )}
                    {item.notes.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <div className="bg-gray-200 px-2 py-1 max-h-[90px] line-clamp-4 rounded-xl">
                          <p className="text-xs">20-03-2025</p>
                          We are looking for a passionate and self-motivated
                          Junior Software Trainee to join our development team.
                          As a fresher, you will be trained in Golang (Go
                          Programming Language) and will be involved in building
                          scalable backend systems, APIs, and services. This is
                          an excellent opportunity to kickstart your career in
                          backend development with one of the fastest-growing
                          programming languages.
                        </div>
                        <div className="bg-gray-200 px-2 py-1 max-h-[90px] line-clamp-4 rounded-xl">
                          <p className="text-xs">20-03-2025</p>
                          We are looking for a passionate and self-motivated
                          Junior Software Trainee to join our development team.
                          As a fresher, you will be trained in Golang (Go
                          Programming Language) and will be involved in building
                          scalable backend systems, APIs, and services. This is
                          an excellent opportunity to kickstart your career in
                          backend development with one of the fastest-growing
                          programming languages.
                        </div>
                      </div>
                    )}
                  </>
                ),
              }))}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};
