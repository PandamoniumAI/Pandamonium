import HomePage from "./Components/HomePage/HomePage.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Components/Create/Create.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
