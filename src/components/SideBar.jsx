import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dashboard,
  ViewList,
  Restaurant,
  PeopleAlt,
  ExitToApp,
  AssignmentTurnedIn,
  Receipt,
  DoneAll,
  Book,
  MenuBook,
  PlusOne,
} from "@material-ui/icons";
import { AuthContext } from "../context/authContext/AuthContext";
import { AppContext } from "../context/appContext/AppContext";

const SideBar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab("Dashboard");
  }, [setActiveTab]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <main className="w-80 h-96">
      <section className="flex flex-col pt-10">
        <h6 className="text-zinc-400 text-xs font-bold font-beVietnam uppercase leading-10 pl-12 tracking-tight">
          Navigations
        </h6>
        <Link
          to={"/"}
          className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
            activeTab === "Dashboard"
              ? "bg-violet-500 bg-opacity-10 text-violet-500"
              : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
          }`}
          onClick={() => setActiveTab("Dashboard")}
        >
          <Dashboard />
          Dashboard
        </Link>
        {user.role === "manager" && (
          <Link
            to={"/my-restaurant"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Restaurant"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Restaurant")}
          >
            <Restaurant />
            Restaurant
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to={"/restaurant-list"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Verify Restaurants"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Verify Restaurants")}
          >
            <ViewList />
            Verify Restaurants
          </Link>
        )}
        {user.role === "manager" && (
          <Link
            to={"/new-restaurant"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Add Restaurant"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Add Restaurant")}
          >
            <PlusOne />
            Add Restaurant
          </Link>
        )}
        {user.role === "manager" && (
          <Link
            to={"/menu"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Menu"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Menu")}
          >
            <MenuBook />
            Menu
          </Link>
        )}
        {(user.role === "manager" || user.role === "employee") && (
          <Link
            to={"/receipts"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Receipts"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Receipts")}
          >
            <Receipt />
            Receipts
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to={"/user-list"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Users"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Users")}
          >
            <PeopleAlt />
            Users
          </Link>
        )}
        {user.role === "manager" && (
          <Link
            to={"/employee-list"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Employees"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            <PeopleAlt />
            Employees
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to={"/reports"}
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Reports"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Reports")}
          >
            <AssignmentTurnedIn />
            List of Reports
          </Link>
        )}
        {user.role === "employee" && (
          <Link
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Guest Check-in"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Guest Check-in")}
          >
            <DoneAll />
            Guest Check-in
          </Link>
        )}
        {user.role === "employee" && (
          <Link
            className={`text-base text-gray-500 font-normal font-beVietnam leading-10 h-16 pl-12 inline-flex items-center gap-4 ${
              activeTab === "Table Booking"
                ? "bg-violet-500 bg-opacity-10 text-violet-500"
                : "hover:bg-violet-500 hover:bg-opacity-10 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("Table Booking")}
          >
            <Book />
            Table Booking
          </Link>
        )}
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
