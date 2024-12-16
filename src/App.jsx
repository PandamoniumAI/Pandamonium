import HomePage from "./Components/HomePage/HomePage.jsx";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Chat from './Chat/Chat';
import Chats from './Chats/Chats';
import Create from './Create/Create';
import Guideline from './Guideline/Guideline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Chats" element={<Chats />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Guideline" element={<Guideline />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
