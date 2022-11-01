import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Feed from './Components/Feed/Feed';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Feed />
      <Profile />
    </div>
  );
}

export default App;
