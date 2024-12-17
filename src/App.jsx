import HomePage from "./Components/HomePage/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* // <Route path="/register" element={<Register />} />
        // <Route path="/login" element={<Login />} />
        // <Route path="/Chat" element={<Chat />} />
        // <Route path="/Chats" element={<Chats />} />
        // <Route path="/Create" element={<Create />} />
        // <Route path="/Guideline" element={<Guideline />} /> */}
      </Routes>
    </Router>
  );
}

export default App;