import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./Components/Landingpage.jsx";
import AuthPage from "./Components/AuthPage.jsx";
import CreateTrip from "./Components/CreateTrip.jsx";
import Itinerary from "./Components/Itinerary.jsx";
import Trips from "./Components/Trips.jsx";
import Profile from "./Components/Profile.jsx";
import Activities from "./Components/Activities.jsx";
import Community from "./Components/Community.jsx";
function App() {
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
