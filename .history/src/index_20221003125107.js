import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup/Signup.js";
import Login from "./pages/Login/Login.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import App from "./App.js";
import { AuthProvider } from "./AuthContext";
import { firebase} from "./firebase/firebase"

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login"  element={<Login />} /> 
        <Route path="/*" element={<PrivateRoute><App /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
