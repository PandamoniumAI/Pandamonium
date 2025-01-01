import HomePage from "./Components/HomePage/HomePage.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Create from "./Components/Create/Create.jsx";
import Error from "./Components/Error/Error.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "../src/Preview/Preview.jsx";
import TOS from "../src/Components/TOS/TOS.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:characterId" element={<Chat />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Error />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
