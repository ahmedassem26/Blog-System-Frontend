import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";
import Home from "./pages/Home";
import AddEditPost from "./pages/AddEditPost";
import Register from "./pages/Register";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./utilities/ScrollToTop";
import { Toaster } from "react-hot-toast";
import toastOptions from "./utilities/toastOptions";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <div className="flex flex-col min-h-screen">
          <Toaster position="top-center" toastOptions={toastOptions} />
          <Navbar />
          <div className="flex-grow pt-16">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route
                path="/add"
                element={
                  <PrivateRoute>
                    <AddEditPost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <AddEditPost />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
