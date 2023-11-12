import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import HomeAdmin from "./pages/home/HomeAdmin";
import HomeManager from "./pages/home/HomeManager";
import HomeEmployee from "./pages/home/HomeEmployee";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import RestaurantList from "./pages/restaurantList/RestaurantList";
import UserList from "./pages/userList/UserList";
import EmployeeList from "./pages/employeeList/EmployeeList";
import ManageMenu from "./pages/manageMenu/ManageMenu";
import ManageReceipts from "./pages/manageReceipts/ManageReceipts";
import ManageRestaurant from "./pages/manageRestaurant/ManageRestaurant";
import ComingSoon from "./components/ComingSoon/ComingSoon";

import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      {!user && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}

      {user && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "manager" ? (
                      <HomeManager />
                    ) : user.role === "admin" ? (
                      <HomeAdmin />
                    ) : (
                      <HomeEmployee />
                    )}
                  </div>
                </>
              }
            />
            <Route
              path="/restaurant-list"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "admin" && <RestaurantList />}
                  </div>
                </>
              }
            />
            <Route
              path="/user-list"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "admin" && <UserList />}
                  </div>
                </>
              }
            />
            <Route
              path="/reports"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "admin" && <ComingSoon />}
                  </div>
                </>
              }
            />
            <Route
              path="/employee-list"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "manager" && <EmployeeList />}
                  </div>
                </>
              }
            />
            <Route
              path="/menu"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "manager" && <ManageMenu />}
                  </div>
                </>
              }
            />
            <Route
              path="/receipts"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "manager" && <ManageReceipts />}
                  </div>
                </>
              }
            />
            <Route
              path="/my-restaurant"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "manager" && <ManageRestaurant />}
                  </div>
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
