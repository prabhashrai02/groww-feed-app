import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Feed from './Components/Feed/Feed';
import Profile from './Components/Profile/Profile';
import { Routes, Route, Navigate, HashRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>        
          <Route exact path='/feed' element={<Feed />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route path="*" element={<Navigate replace to="/Feed" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
