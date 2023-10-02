"use client";

import Loader from "@/components/Loader";
import { loginUser } from "@/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utility/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state?.user);
  const [data, setData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState<Boolean>(false);

  const handleLogin = () => {
    if (data?.password === "" || data?.userName === "")
      toast.warn("Please fill all the fields");
    else {
      setLoading(true);
      dispatch(loginUser(data));
    }
  };


  if (loading) return <Loader />;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex h-full flex-col justify-center items-center lg:w-1/4 md:w-2/5 w-4/5 space-y-6 py-4 px-6 rounded-md ">
        <h1 className="text-center text-2xl text-black mb-6 dark:text-white">
          LOGIN
        </h1>
        <div className="space-y-4 w-full flex flex-col">
          <input
            className="py-3 px-3 text-sm rounded-md outline-none bg-gray-300"
            placeholder="Enter your username"
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            type="text"
          />
          <input
            className="py-3 px-3 text-sm rounded-md outline-none bg-gray-300"
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
          />
        </div>
        <button
          className="bg-blue py-2 w-full font-medium rounded-md text-white"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
