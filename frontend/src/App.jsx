import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landingpage from "./Components/Landingpage.jsx";
import AuthPage from "./Components/AuthPage.jsx";
import CreateTrip from "./Components/CreateTrip.jsx";
import Itinerary from "./Components/Itinerary.jsx";
import Trips from "./Components/Trips.jsx";
import Profile from "./Components/Profile.jsx";
import Activities from "./Components/Activities.jsx";
import Community from "./Components/Community.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "./redux/UserSlice.js";
import { BACKEND_URL } from "./utils/constant.js";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/get-email`, {
          withCredentials: true,
        });

        // this specific route provide whole user object so nothing to worry

        console.log("in app.jsx user dispatched:", res.data.data);
        dispatch(setUser(res.data.data));
        navigate("/landingpage");
      } catch (err) {
        console.error("Auth check failed:", err.message);
      }
    };
    checkAuth();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/landingpage" element={<Landingpage />}></Route>
      <Route path="/createtrip" element={<CreateTrip />}></Route>
      <Route path="/itinerary" element={<Itinerary />}></Route>
      <Route path="/trips" element={<Trips />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/Activities" element={<Activities />}></Route>
      <Route path="/Community" element={<Community />}></Route>
    </Routes>
  );
}

export default App;
