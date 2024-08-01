import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './screens/Home';
import UserInfo from './screens/UserInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
