import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import AuthPage from './Components/AuthPage'
import CreateTrip from './Components/CreateTrip';
function App() {
  return (
     <Router>
      <Routes>
        <Route path='/' element={<AuthPage/>}></Route>
        <Route path='/landingpage' element={<Landingpage/>}></Route>
        <Route path='/createtrip' element={<CreateTrip/>}></Route>
      </Routes>
     </Router>
  );
}

export default App;
