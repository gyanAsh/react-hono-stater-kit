import { Input, Tabs } from "@base-ui/react";
import { NavLink } from "react-router";

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="">
        <section className="flex flex-col items-center justify-between gap-5">
          <EmailAuthTabs />

          <div className="border-[0.5px] border-dashed border-slate-500 w-full"></div>

          <a href={"/backend/auth/google"}>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:border w-full hover:scale-105 active:scale-95
              duration-75 ease-in-out cursor-pointer "
            >
              Login with Google
            </button>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Login;

const EmailAuthTabs = () => {
  return (
    <Tabs.Root
      className="rounded-md border border-slate-200 "
      defaultValue="login"
    >
      <Tabs.List className="relative z-0 grid grid-cols-2 gap-1 px-1 shadow-[inset_0_-1px] shadow-gray-200">
        <Tabs.Tab
          className="col-span-1 flex h-8 items-center justify-center border-0 px-2 text-base font-medium break-keep whitespace-nowrap text-gray-200 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-100 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2 data-[active]:text-gray-900"
          value="login"
        >
          Login
        </Tabs.Tab>
        <Tabs.Tab
          className=" col-span-1 flex h-8 items-center justify-center border-0 px-2 text-base font-medium break-keep whitespace-nowrap text-gray-200 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-100 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2 data-[active]:text-gray-900"
          value="register"
        >
          Register
        </Tabs.Tab>

        <Tabs.Indicator className="absolute top-1/2 left-0 z-[-1] h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-sm bg-gray-100 transition-all duration-200 ease-in-out" />
      </Tabs.List>
      <Tabs.Panel
        className="relative py-5 px-7 flex flex-col gap-3.5 h-fit items-center justify-center -outline-offset-1 outline-blue-800 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2"
        value="login"
      >
        <label className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium text-gray-200">Email</span>
          <Input
            type="text"
            placeholder="Enter your@email..."
            className="h-10 w-64 rounded-md border border-blue-400 px-2.5 text-base text-gray-200 bg-slate-800 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium text-gray-200">Password</span>
          <Input
            type="password"
            placeholder="*** Your Password ***"
            className="h-10 w-64 rounded-md border border-blue-400 px-2.5 text-base text-gray-200 bg-slate-800 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
          />
        </label>
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:border w-full hover:scale-105 active:scale-95
              duration-75 ease-in-out cursor-pointer "
        >
          Login
        </button>
      </Tabs.Panel>
      <Tabs.Panel
        className="relative flex  py-5 px-7 flex-col gap-3.5 h-fit items-center justify-center -outline-offset-1 outline-blue-800 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2"
        value="register"
      >
        <label className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium text-gray-200">Name</span>
          <Input
            type="text"
            placeholder="Enter your name"
            className="h-10 w-64 rounded-md border border-blue-400 px-2.5 text-base text-gray-200 bg-slate-800 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium text-gray-200">Email</span>
          <Input
            type="text"
            placeholder="Enter your@email..."
            className="h-10 w-64 rounded-md border border-blue-400 px-2.5 text-base text-gray-200 bg-slate-800 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          <span className="text-sm font-medium text-gray-200">Password</span>
          <Input
            type="password"
            placeholder="*** Your Password ***"
            className="h-10 w-64 rounded-md border border-blue-400 px-2.5 text-base text-gray-200 bg-slate-800 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
          />
        </label>{" "}
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:border w-full hover:scale-105 active:scale-95
              duration-75 ease-in-out cursor-pointer "
        >
          Register
        </button>
      </Tabs.Panel>
    </Tabs.Root>
  );
};
