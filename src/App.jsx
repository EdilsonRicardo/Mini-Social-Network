
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Main } from './pages/Main'
import { Login } from "./pages/Login"
import { Navbar } from "./components/Navbar"
import { CreatePost } from "./pages/CreatePost/CreatePost"
import "./css/App.css"

function App() {

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/createpost" element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
