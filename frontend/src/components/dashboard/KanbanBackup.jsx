import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Popover, Select } from "antd";

export const KanbanBoard = () => {
  const moveContent = (
    <div>
      <p>Interviewng</p>
      <p>Offered</p>
      <p>Rejected</p>
    </div>
  );
  const content = (
    <div>
      <Popover trigger={"click"} content={moveContent} placement="rightTop">
        <p>Move To</p>
      </Popover>
      <p>Update</p>
    </div>
  );
  return (
    <div className="w-full h-[650px] bg-orange-300 flex gap-10 mt-10">
      {/* Applied */}
      <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
        <div className=" h-[15%] flex flex-col pt-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-lg">Applied Applications</h1>
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <p className="text-base font-semibold text-[#4E84D2]">29</p>
          </div>
          <Input
            className="px-1 h-9 !rounded-2xl"
            placeholder="search"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="w-full h-[90%] bg-red-300  overflow-auto">
          {/* Card */}
          <div className="w-full bg-[#C6DDFF] flex border-2 border-[#0068FF] rounded-[20px]">
            <div className=" w-[95%] h-full flex justify-between px-4 py-2">
              <div>
                <h1 className="font-semibold text-lg">Google</h1>
                <div className="text-base text-black/80">
                  <p>Senior Software Engineer</p>
                  <p>2025-07-24</p>
                  <p>San Francisco, CA</p>
                  <p>$120,000</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white"></div>
            </div>
            <div className=" flex items-start py-3 pr-1">
              <Popover
                trigger={"click"}
                content={content}
                placement="bottomLeft"
              >
                <MoreOutlined className=" text-xl" />
              </Popover>
            </div>
          </div>
        </div>
      </div>
      {/* Interviewing */}
      <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
        <div className=" h-[15%] flex flex-col pt-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-lg">Interviewing Applications</h1>
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <p className="text-base font-semibold text-[#4E84D2]">29</p>
          </div>
          <Input
            className="px-1 h-9 !rounded-2xl"
            placeholder="search"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="w-full h-[90%] bg-red-300  overflow-auto">
          {/* Card */}
          <div className="w-full bg-[#FFD5B5] flex border-2 border-[#FF7714] rounded-[20px]">
            <div className=" w-[95%] h-full flex justify-between px-4 py-2">
              <div>
                <h1 className="font-semibold text-lg">Google</h1>
                <div className="text-base text-black/80">
                  <p>Senior Software Engineer</p>
                  <p>2025-07-24</p>
                  <p>San Francisco, CA</p>
                  <p>$120,000</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white"></div>
            </div>
            <div className=" flex items-start py-3 pr-1">
              <MoreOutlined className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* Offered */}
      <div className="w-1/3 h-full bg-white flex flex-col gap-5 px-5 py-2 rounded-[20px] border-1 border-[#757575]">
        <div className=" h-[15%] flex flex-col pt-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="font-medium text-lg flex gap-2">
              <Select className="w-[110px]" defaultValue={"1"}>
                <option value={"1"}>Offered</option>
                <option value={"2"}>Rejected</option>
              </Select>
              Applications
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <p className="text-base font-semibold text-[#4E84D2]">29</p>
          </div>
          <Input
            className="px-1 h-9 !rounded-2xl"
            placeholder="search"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="w-full h-[90%] bg-red-300  overflow-auto">
          {/* Card */}
          <div className="w-full bg-[#BEFFEE] flex border-2 border-[#05FFBE] rounded-[20px]">
            <div className=" w-[95%] h-full flex justify-between px-4 py-2">
              <div>
                <h1 className="font-semibold text-lg">Google</h1>
                <div className="text-base text-black/80">
                  <p>Senior Software Engineer</p>
                  <p>2025-07-24</p>
                  <p>San Francisco, CA</p>
                  <p>$120,000</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white"></div>
            </div>
            <div className=" flex items-start py-3 pr-1">
              <MoreOutlined className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
