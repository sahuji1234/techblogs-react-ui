import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import PrivateRoute from "./components/PrivateRoute";
import Userdashboard from "./pages/user-routes/Userdashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import NewFeed from "./pages/user-routes/NewFeed";
import PostPage from "./pages/PostPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/about" element={<About />} />
          
        
          <Route path="/user" element={<PrivateRoute/>} >
          <Route path ="new-feed" element={<NewFeed/>} />
          <Route path="dashboard" element={<Userdashboard/>} />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="post/:postId" element={<PostPage />} />
         </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
