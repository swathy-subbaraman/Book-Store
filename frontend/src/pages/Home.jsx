import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    setIsAuthenticated(false);
    handleMenuClose();
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="bg-animation"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center gap-x-2">
          <FaBook className="text-sky-800 text-5xl" />
          <h1 className="text-5xl font-extrabold text-sky-800">
            Book<span className="text-amber-600">Bliss</span>
          </h1>
        </div>
        <div>
          <Button
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            className="text-lg text-blue-600 hover:text-blue-800"
          >
            My Account
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {isAuthenticated ? (
              <MenuItem onClick={handleSignout}>Signout</MenuItem>
            ) : (
              <>
                <MenuItem component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/signup">
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Best Selling Novels */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-amber-600 text-center mb-6">
            Best Selling Novels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-xl text-gray-600">Loading...</p>
            ) : (
              books.slice(0, 3).map((book) => (
                <div
                  key={book._id}
                  className="border rounded-lg shadow-lg bg-white p-4"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={book.ImageURL || "https://via.placeholder.com/150"}
                      alt={book.title}
                      className="w-40 h-60 object-cover mb-4 rounded-lg shadow-md"
                    />
                    <h3 className="text-2xl font-bold text-sky-800">
                      {book.title}
                    </h3>
                    <p className="text-lg text-gray-700">
                      Author: {book.author}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* About Us */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-sky-800 text-center mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            Welcome to <strong>BookBliss</strong>, your ultimate destination for
            exploring and experiencing the joy of reading. Our mission is to
            connect book lovers with their next favorite read, offering a
            curated selection of captivating novels and educational masterpieces.
            Dive into our world and let the stories inspire your imagination!
          </p>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    
   
    
  );
};

export default Home;

/* CSS for background animation */
const style = `
.bg-animation {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,215,0,0.2), rgba(255, 255, 255, 0.6), transparent);
  animation: moveBg 10s infinite;
}

@keyframes moveBg {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-25%, -25%);
  }
  100% {
    transform: translate(0, 0);
  }
}
`;

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${style}</style>`
);
