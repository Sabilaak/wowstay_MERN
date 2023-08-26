
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route ,Routes, Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Booking from './screens/Booking';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Admin from './screens/Admin';
import Mainpage from './screens/Mainpage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
      <Route exact path="/home" element={<Homescreen />}/>
      <Route path='book/:roomid/:fromdate/:todate' element={<Booking/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/profile' element={<Profile/>}/>
      <Route exact path='/admin' element={<Admin/>}/>
      <Route exact path='/' element={<Mainpage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
