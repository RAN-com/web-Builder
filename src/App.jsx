import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./elements/Navbar";
import UserCards from "./Cardinputform/inputform";
import UserDetail from "./Cardinputform/Usercard";
import Home from "./Navlink/Home";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar except for user detail page */}
      {!location.pathname.startsWith("/user/") && <Navbar />}
      
      <div className="p-10">
        <Routes>
          {/* Home Pages */}
          <Route
            path="/"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col justify-center overflow-y-auto">
                <Home />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col justify-center overflow-y-auto">
                <Home />
              </div>
            }
          />
          {/* Add User Page */}
          <Route
            path="/add"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col justify-center overflow-y-auto">
                <UserCards />
              </div>
            }
          />
          {/* User Detail Page (No Navbar) */}
          <Route path="/user/:pathName" element={<UserDetail />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
