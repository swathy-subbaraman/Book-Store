import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import UserUI from "./pages/userUI"; 
import CartPage from "./components/CartPage";
import Signup from "./components/signup"; // Capitalized
import Login from "./components/login"; // Add a login component if not already there
import Admin from "./pages/Admin"

const App = () => {
  // Manage global authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route
        path="/userUI"
        element={
          <UserUI
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            userName={userName}
            setUserName={setUserName}
          />
        }
      />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/signup"
        element={
          <Signup
            setIsAuthenticated={setIsAuthenticated}
            setUserName={setUserName}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            setIsAuthenticated={setIsAuthenticated}
            setUserName={setUserName}
          />
        }
      />
    </Routes>
  );
};

export default App;
