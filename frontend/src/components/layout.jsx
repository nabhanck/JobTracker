import {
  CrownFilled,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, Menu, Popover } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";
import AddIcon from "../assets/plus.svg";
import DashIcon1 from "../assets/1.svg";
import Cookies from "js-cookie";

export const MainLayout = () => {
  const navigate = useNavigate();
  const siderItems = [
    {
      key: "1",
      icon: <img src={DashIcon1} />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <img src={AddIcon} />,
      label: "Add Application",
      onClick: () => navigate("/new-application"),
    },
    ,
  ];

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate("/");
  };
  const popContent = () => {
    return (
      <div className="flex gap-2 items-center" onClick={() => handleLogout()}>
        <button className="cursor-pointer">Sign Out</button>
        <LogoutOutlined className="!text-red-500" />
      </div>
    );
  };
  return (
    <Layout className="h-screen w-screen">
      <Sider collapsed className="!bg-[#2E72D8]">
        <div
          className="text-white h-1/12 flex justify-center items-center text-xs cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          JobTracker
        </div>
        <div className="h-11/12 flex flex-col justify-between">
          <Menu
            theme=""
            mode="inline"
            items={siderItems}
            className="!text-white"
          />
          <div className="flex justify-center py-2">
            <Popover trigger={"click"} placement="right" content={popContent}>
              <div className="rounded-full w-10 h-10 bg-white flex justify-center">
                <UserOutlined className="text-xl"/>
              </div>
            </Popover>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
