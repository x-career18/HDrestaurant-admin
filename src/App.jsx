import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import HomeAdmin from "./pages/home/HomeAdmin";
import HomeManager from "./pages/home/HomeManager";
import HomeEmployee from "./pages/home/HomeEmployee";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import RestaurantList from "./pages/restaurantList/RestaurantList";
import NewRestaurant from "./pages/newRestaurant/NewRestaurant";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import UserList from "./pages/userList/UserList";

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
            ></Route>
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
            ></Route>
            <Route
              path="/new-restaurant"
              element={
                <>
                  <TopBar />
                  <div className="flex">
                    <SideBar />
                    {user.role === "admin" && <NewRestaurant />}
                  </div>
                </>
              }
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
