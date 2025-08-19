import { Input, message } from "antd";
import bg2 from "../assets/bg2.png";
import { useState } from "react";
import { useLoginHook } from "../api/hooks/authHook";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginTab = () => {
  const navigate = useNavigate();

  const [messageApi, buttonContext] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: sendLogin } = useLoginHook();

  const handleLogin = () => {
    sendLogin(
      { email, password },
      {
        onSuccess: (data) => {
          // console.log("Login success:", data);
          messageApi.open({
            type: "success",
            content: data?.message,
          });
          Cookies.set("auth_token", data?.data?.token, { expires: 7 }); // expires in 7 days
          setTimeout(() => navigate("/dashboard"), 1000);
        },
        onError: (response) => {
          Cookies.remove("auth_token");
          messageApi.open({
            type: "error",
            content: response?.response?.data?.message,
          });
          console.log("Login Failed:", response);
        },
      }
    );
  };

  return (
    <>
      {buttonContext}
      <div className="flex flex-col">
        <div className="flex flex-col py-2">
          <h1 className="text-base text-gray-400">Log in to get started</h1>
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
            <Input.Password
              className="!py-2"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>
        </div>
        <div className="py-5 flex items-center mt-5">
          <button
            className="bg-gradient-to-tr from-[#09afe1] through-[#118AE9] to-[#0c24dc] w-full text-white py-2 hover:bg-gradient-to-tr hover:from-[#208fe4] hover:through-[#299bf1] hover:to-[#0a21cd] rounded-2xl"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
