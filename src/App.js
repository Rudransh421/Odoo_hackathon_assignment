import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import AuthPage from './Components/AuthPage'
import CreateTrip from './Components/CreateTrip';
import Itinerary from './Components/Itinerary';
import Trips from './Components/Trips';
import Profile from './Components/Profile';
import Activities from './Components/Activities';
import Community from './Components/Community';
function App() {
  return (
     <Router>
      <Routes>
        <Route path='/' element={<AuthPage/>}></Route>
        <Route path='/landingpage' element={<Landingpage/>}></Route>
        <Route path='/createtrip' element={<CreateTrip/>}></Route>
        <Route path='/itinerary' element={<Itinerary/>}></Route>
        <Route path='/trips' element={<Trips/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path='/Activities' element={<Activities/>}></Route>
        <Route path='/Community' element={<Community/>}></Route>
      </Routes>
     </Router>
  );
}

export default App;
