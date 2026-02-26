import { NavLink } from "react-router";

const Login = () => {
  const handleClick = () => {
    // Redirect browser to backend OAuth endpoint
    window.location.href = "/backend/auth/google";
  };
  return (
    <div>
      This is a login page...
      <div className="border rounded-2xl p-4">
        <h2>Login With</h2>
        <section className="flex flex-col items-center justify-between gap-5">
          <section className="flex flex-col gap-3">
            <div className="grid grid-cols-5 gap-2.5">
              <label htmlFor="email" className="col-span-1 text-start">
                Email
              </label>
              <input type="text" id="email" className="col-span-4" />
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              <label htmlFor="password" className=" col-span-1 text-start">
                Password
              </label>
              <input type="password" id="password" className="col-span-4" />
            </div>

            <button
              className="border w-full max-w-60 hover:scale-105 active:scale-95
           duration-75 ease-in-out cursor-pointer p-2"
            >
              Login with Email
            </button>
          </section>

          <div className="border-[0.5px] w-full"></div>

          <a href={"/backend/auth/google"}>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:border w-full max-w-60 hover:scale-105 active:scale-95
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
