import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./elements/Navbar";
import UserCards from "./Cardinputform/inputform";
import UserDetail from "./Cardoutput/Usercard";
import Home from "./Navlink/Home";
import Inputlayout from "./Layout/Inputlayout";
import OutputLayout from "./Layout/OutputLayout";
import History from "./History/History";
import EditUserPage from "./Edit/EditUser";

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
            <Route
            path="/history"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col  overflow-y-auto">
                <History />
              </div>
            }
          />
            <Route
            path="/edit/:id"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col  overflow-y-auto">
                <EditUserPage />
              </div>
            }
          />
          {/* Add User Page */}
          <Route
            path="/add"
            element={
              <div className="bg-[#f0f8ff] w-full rounded-[50px] h-screen flex flex-col justify-center overflow-y-auto">
                <Inputlayout />
              </div>
            }
          />
          {/* User Detail Page (No Navbar) */}
          <Route path="/user/:pathName" element={<OutputLayout />} />
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
