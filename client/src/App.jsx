
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPage from "./components/MainPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import TopBar from "./components/TopBar.jsx";
import HighScoresPage from "./components/HighScoresPage.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import SignUp from "./components/SignUp.jsx";
import GamePage from "./components/GamePage.jsx";

//TODO: Add private route for MainPage after Login is implemented?
function App() {

  return (
    <Router>
        <TopBar />
        <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/highscores" element={<HighScoresPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </Router>
  )
}

export default App
