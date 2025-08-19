import { Input, message, notification } from "antd";
import bg2 from "../assets/bg2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterHook } from "../api/hooks/authHook";

export const RegisterTab = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: sendRegister } = useRegisterHook();

  const [messageApi, contextHolder] = message.useMessage();

  const handleRegister = () => {
    sendRegister(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
          messageApi.open({
            type: "success",
            content: data?.message,
          });
          setTimeout(() => window.location.reload(), 1000);
        },
        onError: (err) => {
          // Cookies.remove("token");
          console.log("Login Failed:", err?.response?.data?.message);
          messageApi.error(err?.response?.data?.message);
        },
      }
    );
  };
  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <div className="flex flex-col py-2">
          <h1 className="text-base text-gray-400">
            Register with your email address
          </h1>
          <div className="w-full h-[0.5px] bg-gray-300" />
        </div>
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-base">Email</h1>
            <Input
              className="!py-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-base">Password</h1>
            <Input
              className="!py-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-base">Confirm Password</h1>
            <Input
              className="!py-2"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="py-5 flex items-center mt-5">
          <button
            className="bg-gradient-to-tr from-[#09c4e1] through-[#078ff8] to-[#0821e0] w-full text-white py-2 hover:bg-gradient-to-tr hover:from-[#208fe4] hover:through-[#299bf1] hover:to-[#0a21cd] rounded-2xl"
            onClick={() => handleRegister()}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};
