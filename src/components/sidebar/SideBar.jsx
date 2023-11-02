import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dashboard,
  ViewList,
  Restaurant,
  ShoppingCart,
  PeopleAlt,
  ExitToApp,
  AssignmentTurnedIn,
  Receipt,
  DoneAll,
  Book,
} from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";

const SideBar = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch({type: "LOGOUT"})
  };
  return (
    <main className="w-80 h-96">
      <section className="flex flex-col pt-10">
        <h6 className="text-zinc-400 text-xs font-bold font-beVietnam uppercase leading-10 pl-12 tracking-tight">
          Navigations
        </h6>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <Dashboard />
          Dashboard
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <Restaurant />
          Restaurants
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <ViewList />
          Verify restaurant
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <ShoppingCart />
          Menu Orders
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <Receipt />
          Receipts
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <PeopleAlt />
          Manage users
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <AssignmentTurnedIn />
          List of reports
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <DoneAll />
          Guest check-in
        </Link>
        <Link className="text-base text-gray-500 hover:text-violet-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 hover:bg-violet-500 hover:bg-opacity-10">
          <Book />
          Table booking
        </Link>
      </section>

      <hr className="border border-solid border-gray-300 h-px mt-10 mb-2" />

      <button
        className="text-gray-500 text-base font-bold font-beVietnam leading-10 gap-3 inline-flex h-14 pl-12 justify-center items-center hover:text-violet-500"
        onClick={handleLogout}
      >
        <ExitToApp />
        Logout
      </button>
    </main>
  );
};

export default SideBar;
