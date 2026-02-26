import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <nav className="flex items-center justify-between ">
        <NavLink to={"/user-info"}>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
            {` Logged In User info. (test)`}
          </button>
        </NavLink>
        <NavLink to={"/login"}>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
            Login
          </button>
        </NavLink>
      </nav>
      This is a homepage
    </div>
  );
};

export default Home;
