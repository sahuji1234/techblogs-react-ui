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
import UserProvider from "./context/UserProvider";
import PrivateCategory from "./pages/user-routes/PrivateCategory";
import UpdateBlog from "./pages/UpdateBlog";



function App() {
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:postId" element={<PostPage />} />
        
          <Route path="/user" element={<PrivateRoute/>} >
          <Route path ="new-feed" element={<NewFeed/>} />
          <Route path="dashboard" element={<Userdashboard/>} />
          <Route path="profile-info/:userId" element={<ProfileInfo />} />         
          <Route path="category/:categoryId" element={<PrivateCategory/>} />
          <Route path="update-blog/:blogId" element={<UpdateBlog/>} />
         </Route>

        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
