import { Tabs } from "antd";
import bgPic1 from "../assets/Frame 1.png";
import bgPic2 from "../assets/Frame 2.png";
import bgPic3 from "../assets/Frame 3.png";
import bgPic4 from "../assets/Frame 4.png";
import bgPic5 from "../assets/Frame 5.png";
import bgPic6 from "../assets/Frame 6.png";
import bgPic7 from "../assets/Group 54.png";
import bgPic8 from "../assets/Group 55.png";
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import { LoginTab } from "../components/loginTab";
import { RegisterTab } from "../components/registerTab";

const items = [
  {
    key: "1",
    label: "Login",
    children: <LoginTab />,
  },
  {
    key: "2",
    label: "Register",
    children: <RegisterTab />,
  },
];

const AuthPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-[40%] flex flex-col justify-center">
        <div className="flex flex-col px-10">
          <h1 className="w-fit text-2xl font-bold">Welcome to JobTracker</h1>
          <h1 className=" text-lg text-black/60">
            " Track every application, stay organized, and gain insights into
            your job search journey—all in one place."
          </h1>
        </div>
        <div className="flex p-10">
          <div className="bg-gray-100 border-1 border-[#757575]/50 w-full pb-5 px-5 rounded-lg">
            <Tabs items={items} />
          </div>
        </div>
      </div>
      <div
        className="w-[60%] flex items-center bg-cover bg-center bg-no-repeat bg-blue-500 p-10"
        style={{
          backgroundImage: `url(${bg1})`,
        }}
      >
        <img src={bgPic8} className="" />
      </div>
    </div>
  );
};

export default AuthPage;
